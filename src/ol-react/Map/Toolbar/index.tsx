import { ReactNode } from "react";
import Button from "./Button";
import "./index.css";

type Props = {
  children: ReactNode;
};

function Toolbar({ children }: Props) {
  return (
    <div id="toolbar">
      <div className="ol-selectable ol-control">{children}</div>
    </div>
  );
}

Toolbar.Button = Button;

export default Toolbar;
