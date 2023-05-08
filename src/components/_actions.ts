"use server";

import { Todo } from "@/lib/custom-hooks/useStores";
import { addTodo, deleteTodo, updateTodo } from "@/lib/mongo/todos";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function create(formData: FormData) {
  const title = formData.get("title");
  if (title) {
    await addTodo(title as string);
    revalidatePath("/");
  }
}

export async function update(todo: Todo) {
  await updateTodo(todo);
  revalidatePath("/");
}

export async function remove(id: ObjectId | undefined) {
  if (id) {
    await deleteTodo(id);
    revalidatePath("/");
  }
}
