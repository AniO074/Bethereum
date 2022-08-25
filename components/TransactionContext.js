import React from "react";
import { createContext } from "react";
import App from "../App";
// import { useState } from "react";


const Context = createContext("Default Value")
function TransactionContext()
{
    
    let user = 'Anil'
    return(
        <Context.Provider value={user}>
            <App />
        </Context.Provider>
    )
}

export  {TransactionContext,Context}