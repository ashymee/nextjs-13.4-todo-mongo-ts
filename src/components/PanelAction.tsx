"use client";

import useStores, { Todo } from "@/lib/custom-hooks/useStores";
import { remove } from "./_actions";

const PanelAction = ({ todos }: { todos?: Todo[] }) => {
  const { selected, setSelected } = useStores();

  const handleDelete = () => {
    selected.map(async (id) => {
      await remove(id);
    });
    setSelected([]);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-5 py-6 px-7">
        {selected.length > 0 ? (
          <div className="flex items-center justify-center gap-x-2">
            <div className="">
              {selected.length} <b>TODOS</b> selected
            </div>
            <button
              className="text-red-500 hover:bg-red-500 hover:text-white rounded-md px-2 py-1"
              onClick={handleDelete}
            >
              delete
            </button>
            <button
              className="bg-slate-500 text-white rounded-md px-2 py-1"
              onClick={() => setSelected([])}
            >
              cancel
            </button>
          </div>
        ) : (
          <div className="font-bold uppercase py-1">Todos</div>
        )}
      </div>

      {/* total todos & percentage isCompleted */}
      {todos && (
        <div className="flex-none flex items-center gap-x-2 text-xs py-6 px-7">
          <div className="flex items-center gap-1">
            <b>{todos.length}</b> Todos
          </div>

          <div className="flex items-center gap-1">
            <b>{todos.filter((todo) => todo.isCompleted).length}</b> completed
          </div>

          <div className="flex items-center gap-1">
            <b>{todos.filter((todo) => !todo.isCompleted).length}</b> pending
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelAction;
