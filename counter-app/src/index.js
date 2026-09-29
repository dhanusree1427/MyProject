import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import CounterFunction from './CounterFunctional';
// import ButtonClick from './ButtonClick';
// import ConditionalRender from './ConditionalRender';
// import StringLiteral from './StringLiterals';
// import CounterUseState from './CounterUseState';
// import FetchWithEffect from './FetchWithEffect';
// import Parent from './Parent';
// import FormExample from './FormExample';
import ListExample from './ListExample';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <CounterFunction /> */}
    {/* <ButtonClick /> */}
    {/* <ConditionalRender /> */}
    {/* <StringLiteral /> */}
    {/* <CounterUseState /> */}
    {/* <FetchWithEffect /> */}
    {/* <Parent /> */}
    {/* <FormExample /> */}
    <ListExample />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
