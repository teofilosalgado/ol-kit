import React, { ReactNode } from "react";
import Button from "./Button";
import style from "./index.module.css";

type Props = {
  children: ReactNode;
};

function Toolbar({ children }: Props) {
  return (
    <div className={style.toolbar}>
      <div className="ol-selectable ol-control">{children}</div>
    </div>
  );
}

Toolbar.Button = Button;

export default Toolbar;
