import React, { useState, useEffect } from 'react';
function FetchWithEffect() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);
  return (
    <div>
        {data ? (
            <>
            <h4>{data.title}</h4>
            <p>{data.body}</p>
            </>
        ) : (
            <p>Loading...</p>
        )}
    </div>
  );
}
export default FetchWithEffect;