import React, {useState} from "react";
import {Display} from "./Display/Display";
import {Button} from "./Button/Button";

export const Counter = () => {
    const maxValue = 5;
    const btnInc = '+'
    const btnReset = 'reset'

    const [state, setState] = useState(0)

    function addInc() {
        if (state < maxValue) {
            return setState(state + 1)
        }
    }

    function resetValue() {
        setState(0)
    }


    const buttonClickOnHandler = (btnName: string) => {
        if (btnName === btnInc) {
            addInc()
        }
        if (btnName === btnReset) {
            resetValue()
        }
    }

    return (
        <>
            Display show
            <Display state={state}/>
            <Button buttonClickOnHandler={buttonClickOnHandler} btnName={btnInc}/>
            <Button buttonClickOnHandler={buttonClickOnHandler} btnName={btnReset}/>
        </>
    )
}