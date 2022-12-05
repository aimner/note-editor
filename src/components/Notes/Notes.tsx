import React from "react";
import { useAppSelector } from "../../redux/hooks";
import classes from "./Notes.module.scss";
import { Note } from "./Note/Note";
import { activeNotes } from "../../redux/selectors";

export const Notes: React.FC = () => {
  const notes = useAppSelector((state) => state.data.notes);
  const state = useAppSelector((state) => state);
  const activeTags = useAppSelector((state) => state.data.activeTags);

  return (
    <div className={classes.container}>
      {activeTags.length === 0
        ? notes.map((item, index) => <Note {...item} id={index} key={index + item.value}></Note>)
        : activeNotes(state).map((item, index) => (
            <Note {...item} id={index} key={index + item.value}></Note>
          ))}
    </div>
  );
};
