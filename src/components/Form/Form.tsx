import React, { useState } from "react";
import classes from "./Form.module.scss";
import { useAppDispatch } from "./../../redux/hooks";
import { addNote } from "../../redux/slices/noteSlice";

export const Form: React.FC = () => {
  const dispatch = useAppDispatch();

  const [validate, setValidate] = useState(false);
  const [fomrText, setFormText] = useState('')

  const onAddNote = () => {
    if (validate) {
      dispatch(addNote(fomrText));
      setFormText('')
    }
  };

  const onChangeNote = (text: string) => {
    text.trim().length > 0 ? setValidate(true) : setValidate(false);
    setFormText(text)
  };

  return (
    <div className={classes.container}>
      <textarea
        className={classes.textArea}
        placeholder="Create a note..."
        value={fomrText}
        autoFocus
        onChange={(e) => onChangeNote(e.target.value)}></textarea>
      {validate ? null : (
        <div className={classes.validateText}>The note must have at least 1 symbol</div>
      )}
      <button className={classes.addNote} onClick={onAddNote}>
        Add note
      </button>
    </div>
  );
};
