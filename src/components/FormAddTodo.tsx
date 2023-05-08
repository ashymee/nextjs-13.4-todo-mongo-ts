"use client";

import useStores from "@/lib/custom-hooks/useStores";
import { useRef } from "react";
import { create } from "./_actions";

const FormAddTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { todo } = useStores();

  const action = async (formData: FormData) => {
    await create(formData);
    formRef && formRef.current?.reset();
    inputRef && inputRef.current?.focus();
  };

  return (
    <aside className="flex-none w-72 h-full bg-slate-950 text-slate-100 py-7 px-5">
      <div className="text-center font-bold mb-5">Add Todo</div>

      <form
        ref={formRef}
        action={action}
        className="border rounded-md p-2 flex flex-col gap-y-2"
      >
        <input
          ref={inputRef}
          type="text"
          name="title"
          placeholder="type here.."
          className="border rounded-md px-4 py-2 bg-transparent focus:bg-slate-900/70"
        />

        <button type="submit" className="bg-blue-700 rounded-md px-4 py-2">
          add
        </button>
      </form>
    </aside>
  );
};

export default FormAddTodo;
