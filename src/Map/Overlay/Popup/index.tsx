import React, { ReactNode } from "react";
import style from "./index.module.css";

type Props = {
  children: ReactNode;
  onCloseClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  visible: boolean;
};

function Popup({ children, onCloseClick, visible }: Props) {
  return visible ? (
    <div id="popup" className={style.popup}>
      <a onClick={onCloseClick} className={style.popupCloser}>
        ✖
      </a>
      <div>{children}</div>
    </div>
  ) : null;
}

export default Popup;
