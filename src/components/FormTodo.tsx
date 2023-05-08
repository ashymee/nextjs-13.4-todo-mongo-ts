"use client";

import useStores from "@/lib/custom-hooks/useStores";
import FormAddTodo from "./FormAddTodo";
import FormEditTodo from "./FormEditTodo";

const FormTodo = () => {
  const { todo } = useStores();

  return !todo ? <FormAddTodo /> : <FormEditTodo />;
};

export default FormTodo;
