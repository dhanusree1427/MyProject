import React from "react";
function StringLiteral() {
    const name = "React Developer";
    const task = "Learning React";
    return (
        <div>
            <h2>{`Hello, ${name}!`}</h2>
            <p>{`You are currently ${task}.`}</p>
        </div>
    );
}
export default StringLiteral;