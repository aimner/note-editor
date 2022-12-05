import React, { useState } from "react";
import classes from "./Note.module.scss";
import { NoteType } from "../../../types/types";
import { useAppDispatch, useAppSelector } from "./../../../redux/hooks";
import {
  deleteNote,
  editNote,
  findTags,
  changeEditNote,
  changeEditNoteId,
} from "../../../redux/slices/noteSlice";
import Tags from "./Tags/Tags";

type PropsTypes = NoteType & {
  id: number;
};

export const Note: React.FC<PropsTypes> = ({ tags, value, id }) => {
  const dispatch = useAppDispatch();
  const editNoteItem = useAppSelector((state) => state.data.editNote);
  const editNoteId = useAppSelector((state) => state.data.editNoteId);

  let editMode = editNoteId === id;

  const [validate, setValidate] = useState(true);

  const activateEditMode = () => {
    dispatch(changeEditNote({ tags, value }));
    dispatch(changeEditNoteId(id));
  };

  const notSaveNote = () => {
    dispatch(changeEditNoteId(null));
  };

  const saveNote = () => {
    if (validate) {
      dispatch(editNote({ id, note: editNoteItem! }));
      dispatch(changeEditNoteId(null));
    }
  };

  const findWordsEqualTags = (word: string): boolean => {
    let tagsArr = editNoteItem!.tags;
    let text = editNoteItem!.value.split(" ");
    let wordsEqualTagsArr = tagsArr!
      .filter((el) => text.indexOf(el) > -1)
      .map((item) => item.slice(1));
    return wordsEqualTagsArr.includes(word);
  };

  const changeTextAreaValue = (text: string) => {
    dispatch(changeEditNote({ tags: findTags(text), value: text.split("\n").join(" ") }));
    if (text.trim().length === 0) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  };

  return (
    <div className={classes.noteBlock}>
      {editMode ? (
        <div className={classes.note}>
          <div className={classes.noteText}>
            {editNoteItem!.value.split(" ").map((item, index) =>
              findWordsEqualTags(item) ? (
                <span className={classes.specialWord} key={item + index}>
                  {item}
                </span>
              ) : (
                <span key={item + index}>{item} </span>
              )
            )}
          </div>
          <textarea
            className={classes.editInput}
            value={editNoteItem!.value}
            onChange={(e) => {
              changeTextAreaValue(e.target.value);
            }}></textarea>
          {validate ? null : (
            <div className={classes.validateBlock}>The note must have at least 1 symbol</div>
          )}
          <div className={classes.buttonBlock}>
            <button onClick={saveNote} className={`${classes.editButton} ${classes.saveButton}`}>
              Save
            </button>
            <button
              onClick={notSaveNote}
              className={`${classes.editButton} ${classes.dontSaveButton}`}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className={classes.note}>
          <div className={classes.noteText}>{value}</div>
          <div className={classes.buttonBlock}>
            <button className={classes.editButton} onClick={activateEditMode}>
              Edit
            </button>
            <button className={classes.deleteButton} onClick={() => dispatch(deleteNote(id))}>
              Delete
            </button>
          </div>
        </div>
      )}
      <Tags tags={tags} tagsInEditNote={editNoteItem?.tags} editMode={editMode} id={id} />
    </div>
  );
};
