import React from "react";
function ConditionalRender() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    return (
        <div>
            {isLoggedIn ? <h2>Welcome Back!</h2>:<h2>Please Login</h2>}
            <button onClick={()=>setIsLoggedIn(!isLoggedIn)}>
                {isLoggedIn ? 'Logout':'Login'}
            </button>
        </div>
    );
}
export default ConditionalRender;