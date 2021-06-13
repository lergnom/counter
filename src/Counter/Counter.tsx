import React, {useEffect, useState} from "react";
import {Display} from "./Display/Display";
import {Button} from "./Button/Button";

export const Counter = () => {
    type  ButtonValuesTypeProps = {
        id: number
        name: string
        isDisabled: boolean
    }
    type CounterTypeProps = {
        [buttons: string]: ButtonValuesTypeProps
    }

    const startValue = 3
    const maxValue = 8;
    const btnInc = '+'
    const btnReset = 'reset'

    const [buttonValues, setButtonValues] = useState<CounterTypeProps>({
        btnInc: {id: 1, name: btnInc, isDisabled: false},
        btnReset: {id: 1, name: btnReset, isDisabled: true}
    })


    const [state, setState] = useState(startValue)

    useEffect(() => {
        if (state === maxValue) {
            setButtonValues({...buttonValues, btnInc: {...buttonValues.btnInc, isDisabled: true}})
        }
        if (state === startValue) {
            setButtonValues({...buttonValues, btnReset: {...buttonValues.btnReset, isDisabled: true}})
        }
    }, [state])


    function addInc() {
        if (state < maxValue) {
            setState(state + 1)
            const copy = {...buttonValues, btnReset: {...buttonValues.btnReset, isDisabled: false}}
            setButtonValues(copy)

        }
    }


    function resetValue() {
        setState(startValue)
        setButtonValues({...buttonValues, btnInc: {...buttonValues.btnInc, isDisabled: false}})

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
            <Button buttonClickOnHandler={buttonClickOnHandler} btnName={buttonValues.btnInc.name}
                    isDisabled={buttonValues.btnInc.isDisabled}/>
            <Button buttonClickOnHandler={buttonClickOnHandler} btnName={buttonValues.btnReset.name}
                    isDisabled={buttonValues.btnReset.isDisabled}
            />
        </>
    )
}