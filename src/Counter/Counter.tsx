import React, {useState} from "react";
import {Display} from "./Display/Display";

export const Counter = () => {
    const MaxValue = 5;

    const [state, setState] = useState(0)

    function addInc() {
        return setState(state + 1)
    }


    return (
        <>
            Display show
            <Display state={state}/>
        </>
    )
}