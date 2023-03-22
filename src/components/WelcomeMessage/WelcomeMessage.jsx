import React from 'react';
/* create a function component called WelcomeMessage  in order to display the firstname*/
function WelcomeMessage({ firstName }) {
    return (
        <div>
        <h1>Bonjour  {firstName}</h1>
        </div>
    );
    }
    export default WelcomeMessage;