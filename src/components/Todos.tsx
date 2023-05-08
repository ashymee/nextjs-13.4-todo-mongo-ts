"use client";

import useStores, { Todo } from "@/lib/custom-hooks/useStores";
import { ObjectId } from "mongodb";
import { Fragment } from "react";
import { update } from "./_actions";

const Todos = ({ todos }: { todos: Todo[] | undefined }) => {
  const { selected, setSelected, todo, setTodo } = useStores();

  const handleSelected = (id: ObjectId | undefined) => {
    const selections = [...selected];

    if (selections.includes(id)) {
      const index = selections.indexOf(id);
      selections.splice(index, 1);
      setSelected(selections);
    } else {
      selections.push(id);
      setSelected(selections);
    }
  };

  const handleCompleted = async (todo: Todo) => {
    await update({
      ...todo,
      isCompleted: !todo.isCompleted,
    });
  };

  return (
    <div className="h-full px-5">
      <ul className="grid grid-cols-2 gap-4 overflow-y-scroll scrollbar-hide">
        {!todos ? (
          <div className="">No results</div>
        ) : (
          todos
            // sort by isCompleted & title
            .sort((a, b) => {
              if (a.isCompleted === b.isCompleted) {
                return a.title.localeCompare(b.title);
              }

              return a.isCompleted ? -1 : 1;
            })
            .map((item, index) => (
              <li
                key={index}
                className={`rounded-md flex items-center shadow-sm hover:shadow-lg h-min group ${
                  selected.includes(item._id) ? "bg-orange-300" : "bg-slate-100"
                } ${
                  !todo
                    ? "cursor-pointer opacity-100"
                    : todo._id === item._id
                    ? ""
                    : "opacity-30 cursor-not-allowed"
                }`}
              >
                <div
                  className="flex-1 p-2 overflow-hidden whitespace-nowrap text-ellipsis group-hover:font-bold"
                  onClick={() => !todo && handleSelected(item._id)}
                >
                  {index + 1}.{" "}
                  {item.isCompleted ? <s>{item.title}</s> : item.title}
                </div>

                {selected.length < 1 && (
                  <Fragment>
                    {!todo && (
                      <button
                        className={`flex-none text-slate-100 p-2 disabled:opacity-30 disabled:bg-gray-600 disabled:cursor-not-allowed ${
                          item.isCompleted
                            ? "bg-rose-500 hover:bg-rose-700"
                            : "bg-blue-500 hover:bg-blue-700"
                        }`}
                        onClick={() => handleCompleted(item)}
                      >
                        {item.isCompleted ? "mark as undone" : "mark as done"}
                      </button>
                    )}

                    <button
                      className="flex-none bg-green-500 hover:bg-green-700 text-slate-100 p-2 rounded-r-md disabled:opacity-30 disabled:bg-gray-600 disabled:cursor-not-allowed"
                      onClick={() => (!todo ? setTodo(item) : setTodo(null))}
                    >
                      edit
                    </button>
                  </Fragment>
                )}
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default Todos;
