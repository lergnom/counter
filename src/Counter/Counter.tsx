import React, {useState} from "react";

export const Counter = () => {
    const MaxValue = 5;

    const [state, setState] = useState(0)

    function addInc() {
        return setState(state + 1)
    }


    return (
        <>
            Counter
        </>
    )
}