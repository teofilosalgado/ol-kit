import Button from "./Button";
import "./index.css";

function Toolbar({ children }) {
  return (
    <div id="toolbar">
      <div className="ol-selectable ol-control">{children}</div>
    </div>
  );
}

Toolbar.Button = Button;

export default Toolbar;
