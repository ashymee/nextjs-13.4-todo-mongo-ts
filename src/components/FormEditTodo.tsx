"use client";

import useStores from "@/lib/custom-hooks/useStores";
import { useRef } from "react";
import { update } from "./_actions";

const FormAddTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { todo, setTodo } = useStores();

  const action = async () => {
    todo && (await update(todo));
    formRef && formRef.current?.reset();
    inputRef && inputRef.current?.focus();
    setTodo(null);
  };

  return (
    <aside className="flex-none w-72 h-full bg-slate-950 text-slate-100 py-7 px-5">
      <div className="text-center font-bold mb-5">Edit Todo</div>

      <form
        ref={formRef}
        action={action}
        className="border rounded-md p-2 flex flex-col gap-y-2"
      >
        <input
          ref={inputRef}
          type="text"
          name="title"
          value={todo?.title}
          placeholder="type here.."
          className="border rounded-md px-4 py-2 bg-transparent focus:bg-slate-900/70"
          onChange={(e) =>
            todo &&
            setTodo({
              ...todo,
              title: e.target.value,
            })
          }
        />

        <div className="flex items-center gap-x-2">
          <button
            type="submit"
            className="flex-1 hover:bg-blue-700 rounded-md px-4 py-2"
          >
            edit
          </button>

          <button
            type="button"
            className="flex-1 bg-green-700 rounded-md px-4 py-2"
            onClick={() => setTodo(null)}
          >
            cancel
          </button>
        </div>
      </form>
    </aside>
  );
};

export default FormAddTodo;
