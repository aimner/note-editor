import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { deleteTag } from "../../../../../redux/slices/noteSlice";
import classes from "./Tag.module.scss";

type PropsType = {
  item: string;
  id: number;
  editMode: boolean;
};

export const Tag: React.FC<PropsType> = ({ item, id, editMode }) => {
  const dispatch = useAppDispatch();
  const activeTags = useAppSelector((state) => state.data.activeTags);

  let active = activeTags.some((i) => i === item);

  return (
    <>
      <div
        className={
          active
            ? `${classes.tag} ${classes.tag_active}`
            : `${classes.tag} ${classes.tag_notActive}`
        }>
        <div>{item}</div>
        {editMode ? null : (
          <button
            className={classes.deleteButton}
            onClick={() => dispatch(deleteTag({ tag: item, id }))}>
            +
          </button>
        )}
      </div>
    </>
  );
};
