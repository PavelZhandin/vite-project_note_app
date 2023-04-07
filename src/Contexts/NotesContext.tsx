import { useState, createContext, useContext, ReactNode } from "react";
import { INote } from "../models/INote";

type ContextType = {
  notes: INote[];
  setNotes: (newArr: INote[]) => void;
  selectedNoteId: string | null;
  setSelectedNoteId: (val: string) => void;
};

const NoteContext = createContext<ContextType>({
  notes: [],
  setNotes: () => {},
  selectedNoteId: null,
  setSelectedNoteId: () => {},
});

export const useNotes = () => {
  return useContext(NoteContext);
};

export const NotesContext = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<INote[]>(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        selectedNoteId,
        setSelectedNoteId,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
