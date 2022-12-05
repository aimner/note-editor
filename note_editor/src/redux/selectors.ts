import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const notes = (state: RootState) => state.data.notes;
const activeTags = (state: RootState) => state.data.activeTags;

export const activeNotes = createSelector([notes, activeTags], (notes, activeTags) => {
  return notes.filter((item) => {
    let isActive = false;
    if (item.tags.length > 0) {
      item.tags.forEach((tag) => {
        if (activeTags.includes(tag)) {
          isActive = true;
        }
      });
    }
    return isActive;
  });
});
