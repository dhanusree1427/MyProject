import React, { useState, useEffect } from 'react';
function FormExample() {
    const [name, setName] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        alert(`Form submitted with name: ${name}`);
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
export default FormExample;