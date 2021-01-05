import React, { ReactNode } from "react";
import style from "./index.module.css";

type Props = {
  tooltip: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  active: boolean;
  icon: ReactNode;
};

function Button({ tooltip, onClick, active, icon }: Props) {
  return (
    <button
      type="button"
      title={tooltip}
      onClick={onClick}
      className={active ? style.buttonOn : style.buttonOff}
    >
      {icon}
    </button>
  );
}

export default Button;
