import React, { ReactNode } from "react";
import style from "./index.module.css";

type Props = {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

function Popup({ children, onClick }: Props) {
  return (
    <div id="popup" className={style.popup}>
      <a onClick={onClick} className={style.popupCloser}>
        ✖
      </a>
      <div>{children}</div>
    </div>
  );
}

export default Popup;
