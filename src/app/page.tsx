import PanelAction from "@/components/PanelAction";
import Todos from "@/components/Todos";
import { getTodos } from "@/lib/mongo/todos";
import Link from "next/link";
import { Fragment } from "react";

const Home = async () => {
  const { todos } = await getTodos();

  return (
    <Fragment>
      <PanelAction todos={todos} />

      <Todos todos={todos} />

      <div className="text-center py-2 bg-slate-500 text-white">
        <Link href="https://nextjs.org" passHref>
          NextJS
        </Link>
      </div>
    </Fragment>
  );
};

export default Home;
