import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteType } from "../../types/types";

type InitialState = {
  notes: NoteType[];
  dataJson: string;
  activeTags: string[];
  allTags: string[];
  editNote: NoteType | null;
  editNoteId: number | null;
};

const initialState: InitialState = {
  notes: [],
  dataJson: "",
  activeTags: [],
  allTags: [],
  editNote: null,
  editNoteId: null,
};

export function findTags(text: string): string[] {
  return text.split(" ").filter((item) => item.startsWith("#") && item.length > 1);
}

function deleteSimilarTags(arr: string[]): string[] {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
}

function findLastValueInArray(arr: NoteType[], text: string): boolean {
  return !arr.some((item) => item.tags.some((i) => i === text));
}

const notesSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    addNote: (state, action: PayloadAction<string>) => {
      let tags = findTags(action.payload.split("\n").join(" "));
      state.notes.push({ value: action.payload, tags });
      let similarTags = [...state.allTags, ...deleteSimilarTags(tags)];
      state.allTags = deleteSimilarTags(similarTags);
      state.dataJson = "";
      state.dataJson = JSON.stringify(state);
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      let tags = state.notes[action.payload].tags;
      state.notes = state.notes.filter((_, index) => index !== action.payload);

      tags.forEach((item) => {
        if (findLastValueInArray(state.notes, item)) {
          state.allTags = state.allTags.filter((_) => _ !== item);
          state.activeTags = state.activeTags.filter((_) => _ !== item);
        }
      });
      state.dataJson = "";
      state.dataJson = JSON.stringify(state);
    },
    deleteTag: (state, action: PayloadAction<{ tag: string; id: number }>) => {
      let note = state.notes[action.payload.id];
      let tagIndex = note.tags.indexOf(action.payload.tag);
      note.tags.splice(tagIndex, 1);

      note.value = note.value
        .split(" ")
        .filter((item) => item !== action.payload.tag)
        .join(" ");

      if (note.value.length === 0) state.notes = state.notes.filter((item) => item !== note);

      if (findLastValueInArray(state.notes, action.payload.tag)) {
        state.allTags = state.allTags.filter((item) => item !== action.payload.tag);
        state.activeTags = state.activeTags.filter((item) => item !== action.payload.tag);
      }
      state.dataJson = "";
      state.dataJson = JSON.stringify(state);
    },
    editNote: (state, action: PayloadAction<{ id: number; note: NoteType }>) => {
      let note = state.notes[action.payload.id];

      let deleteTags = note.tags.filter((a) => action.payload.note.tags.indexOf(a) === -1);
      let addedTags = action.payload.note.tags.filter((a) => note.tags.indexOf(a) === -1);

      state.notes[action.payload.id] = state.editNote!;

      deleteTags.forEach((item) => {
        if (findLastValueInArray(state.notes, item)) {
          state.activeTags = state.activeTags.filter((i) => i !== item);
          state.allTags = state.allTags.filter((i) => i !== item);
        }
      });

      addedTags.forEach((item) => {
        if (!state.allTags.includes(item)) {
          state.allTags = [...state.allTags, item];
        }
      });
      state.dataJson = "";
      state.dataJson = JSON.stringify(state);
    },
    addActiveTag: (state, action: PayloadAction<string>) => {
      if (!state.activeTags.some((item) => item === action.payload))
        state.activeTags.push(action.payload);
      state.dataJson = JSON.stringify(state);
    },
    deleteActiveTag: (state, action: PayloadAction<string>) => {
      state.activeTags = state.activeTags.filter((item) => item !== action.payload);
      state.dataJson = "";
      state.dataJson = JSON.stringify(state);
    },
    changeEditNote: (state, action: PayloadAction<NoteType>) => {
      state.editNote = action.payload;
    },
    changeEditNoteId: (state, action: PayloadAction<number | null>) => {
      state.editNoteId = action.payload;
    },
  },
});

export const {
  addNote,
  deleteNote,
  editNote,
  deleteTag,
  addActiveTag,
  deleteActiveTag,
  changeEditNote,
  changeEditNoteId,
} = notesSlice.actions;

export default notesSlice.reducer;
