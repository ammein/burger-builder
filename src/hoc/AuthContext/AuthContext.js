import React from 'react';

const authContext = React.createContext({
    authenticated : false,
    logout : () => {}
})
export default authContext;