import "./index.css";

function Button({ tooltip, onClick, active, icon }) {
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
