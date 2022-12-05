import React from "react";
import classes from "./Tags.module.scss";
import { Tag } from "./Tag/Tag";

type PropsType = {
  tags: string[];
  id: number;
  tagsInEditNote: string[] | undefined;
  editMode: boolean;
};

const Tags: React.FC<PropsType> = ({ tags, id, editMode, tagsInEditNote }) => {
  return (
    <div className={classes.tags}>
      {editMode
        ? tagsInEditNote!.map((item, index) => (
            <Tag key={item + id + index} item={item} id={id} editMode={editMode} />
          ))
        : tags.map((item, index) => (
            <Tag key={item + id + index} item={item} id={id} editMode={editMode} />
          ))}
    </div>
  );
};

export default Tags;
