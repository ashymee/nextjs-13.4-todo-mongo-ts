import FormTodo from "@/components/FormTodo";
import { Fragment, ReactNode } from "react";

const Template = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <FormTodo />

      <main className="flex-1 h-full bg-slate-300 overflow-hidden flex flex-col">
        {children}
      </main>
    </Fragment>
  );
};

export default Template;
