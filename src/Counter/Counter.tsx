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

    function localStorageStartValue() {
        return localStorage.getItem('setStart') ? JSON.parse(localStorage.setStart) : 0
    }

    function localStorageMaxValue() {
        return localStorage.getItem('setMax') ? JSON.parse(localStorage.setMax) : 5
    }

    const [startValue, setStartValue] = useState(localStorageStartValue())
    const [maxValue, setMaxValue] = useState(localStorageMaxValue());
    const btnInc = '+'
    const btnReset = 'reset'
    const btnSet = 'set'

    const [buttonValues, setButtonValues] = useState<CounterTypeProps>({
        btnInc: {id: 1, name: btnInc, isDisabled: false},
        btnReset: {id: 2, name: btnReset, isDisabled: true},
        btnSet: {id: 3, name: btnSet, isDisabled: false}
    })

    const [state, setState] = useState(startValue)
    const [onValue, setOnValue] = useState(startValue)
    const [offValue, setOffValue] = useState(maxValue)

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

    const disabledForm = () => {
        setButtonValues({
            ...buttonValues,
            btnInc: {...buttonValues.btnInc, isDisabled: true},
            btnReset: {...buttonValues.btnReset, isDisabled: true}
        })
    }

    function setCounter() {
        setStartValue(onValue)
        setMaxValue(offValue)
        setState(onValue)
        localStorage.setItem('setStart', JSON.stringify(onValue));
        localStorage.setItem('setMax', JSON.stringify(offValue));
        setButtonValues({
            ...buttonValues,
            btnInc: {...buttonValues.btnInc, isDisabled: false},
            btnReset: {...buttonValues.btnReset, isDisabled: false}
        })
    }

    const buttonClickOnHandler = (btnName: string) => {
        switch (btnName) {
            case btnInc:
                addInc()
                break;
            case btnReset:
                resetValue()
                break;
            case btnSet:
                setCounter()
                break;
        }
    }

    const onChangeOnValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.name)
        let num = Number(e.currentTarget.value)
        if (num < offValue) {
            setOnValue(num)
            setButtonValues({...buttonValues, btnSet: {...buttonValues.btnSet, isDisabled: false}})
        } else {
            setButtonValues({...buttonValues, btnSet: {...buttonValues.btnSet, isDisabled: true}})
            console.log("стартовое значение не может быть больше счетчика")
        }
    }

    const onChangeOffValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let num = Number(e.currentTarget.value)
        if (num > onValue) {
            setOffValue(num)
            setButtonValues({...buttonValues, btnSet: {...buttonValues.btnSet, isDisabled: false}})
        } else {
            setButtonValues({...buttonValues, btnSet: {...buttonValues.btnSet, isDisabled: true}})
            console.log("Максимальное значение не может быть меньше стартового")
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
            <div>
                Start value: <input name={'on'} type={'number'} value={onValue} onChange={onChangeOnValue}
                                    onClick={disabledForm}
                                    style={{display: 'block'}}
            />
                MaxValue: <input name={"off"} value={offValue} onChange={onChangeOffValue} style={{display: 'block'}}
                                 type={'number'} onClick={disabledForm}/>
            </div>
            <Button buttonClickOnHandler={buttonClickOnHandler} btnName={buttonValues.btnSet.name}
                    isDisabled={buttonValues.btnSet.isDisabled}
            />
        </>
    )
}