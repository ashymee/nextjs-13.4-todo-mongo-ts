import { ObjectId } from "mongodb";
import { create } from "zustand";

export type Todo = {
  _id?: ObjectId;
  title: string;
  isCompleted: boolean;
};

export type Stores = {
  todo: Todo | null;
  setTodo: (todo: Todo | null) => void;

  selected: Todo["_id"][];
  setSelected: (selected: Todo["_id"][]) => void;
};

const useStores = create<Stores>((set) => ({
  todo: null,
  setTodo: (todo) =>
    set((state) => ({
      ...state,
      todo,
    })),

  selected: [],
  setSelected: (selected) =>
    set((state) => ({
      ...state,
      selected,
    })),
}));

export default useStores;
