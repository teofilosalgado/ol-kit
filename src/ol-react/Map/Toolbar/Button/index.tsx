import { ReactNode } from "react";
import "./index.css";

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
      className={active ? "ol-on" : "ol-off"}
    >
      {icon}
    </button>
  );
}

export default Button;
