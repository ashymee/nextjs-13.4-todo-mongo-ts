import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import { Todo } from "../custom-hooks/useStores";
import clientPromise from "./client";

let client: MongoClient;
let db: Db;
let todos: Collection<Todo>;

const init = async () => {
  if (db) return;

  try {
    client = await clientPromise;
    db = client.db();
    todos = db.collection("todos");
  } catch (error) {
    // throw new Error("Failed to connect to the database.");
    console.error((error as Error).message);
  }
};

(async () => {
  await init();
})();

export const getTodos = async () => {
  try {
    if (!todos) await init();

    const result = await todos
      .find({})
      .map((todo) => ({ ...todo, _id: todo._id }))
      .toArray();
    return { todos: result };
  } catch (error) {
    return { error: "Failed to fetch todos!" };
  }
};

export const getTodo = async (id: string) => {
  try {
    if (!todos) await init();

    const todo = await todos.findOne({ _id: new ObjectId(id) });
    if (!todo) throw new Error();
    return { todo: { ...todo, _id: todo._id.toString() } };
  } catch (error) {
    return { error: "Failed to get todo!" };
  }
};

export const addTodo = async (title: string) => {
  try {
    if (!todos) await init();

    return await todos.insertOne({ title, isCompleted: false });
  } catch (error) {
    return { error: "Failed to create todo!" };
  }
};

export const updateTodo = async (todo: Partial<Todo>) => {
  try {
    if (!todos) await init();

    return await todos.updateOne(
      { _id: new ObjectId(todo._id) },
      {
        $set: {
          title: todo.title,
          isCompleted: todo.isCompleted,
        },
      }
    );
  } catch (error) {
    return { error: "Failed to complete todo!" };
  }
};

export const deleteTodo = async (id: ObjectId) => {
  try {
    if (!todos) await init();

    return await todos.deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    return { error: "Failed to delete todo!" };
  }
};
