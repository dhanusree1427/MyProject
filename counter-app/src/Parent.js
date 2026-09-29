import React from 'react';
function Child({ message}) {
    return <p>Message from parent: {message}</p>;
}
function Parent() {
    return <Child message="Hello from Parent!" />;
}
export default Parent;