import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addActiveTag, deleteActiveTag } from "../../../redux/slices/noteSlice";
import classes from "./AllTagsItem.module.scss";

export const AllTagsItem: React.FC<{ item: string }> = (props) => {
  const dispatch = useAppDispatch();
  const activeTags = useAppSelector((state) => state.data.activeTags);

  let active = activeTags.some((i) => i === props.item);

  const onAddActiveTag = () => {
    if (active) {
      dispatch(deleteActiveTag(props.item));
    } else {
      dispatch(addActiveTag(props.item));
    }
  };

  return (
    <div
      className={
        active ? `${classes.tag} ${classes.tag_active}` : `${classes.tag} ${classes.tag_notActive}`
      }
      onClick={onAddActiveTag}>
      {props.item}
    </div>
  );
};
