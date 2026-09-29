import React from "react";
function ButtonClick() {
  const handleClick = () => {
    alert("Button clicked!");
  };
    return (
        <div>
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
}
export default ButtonClick;