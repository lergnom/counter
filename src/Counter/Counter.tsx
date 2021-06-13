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

    const [startValue, setStartValue] = useState(localStorageStartValue())
    const [maxValue, setMaxValue] = useState(localStorageMaxValue());
    const btnInc = '+'
    const btnReset = 'reset'
    const btnSet = 'set'

    function localStorageStartValue() {
        if (localStorage.getItem('setStart')) {
            return JSON.parse(localStorage.setStart)
        } else return 0
    }

    function localStorageMaxValue() {
        if (localStorage.getItem('setMax')) {
            return JSON.parse(localStorage.setMax)
        } else return 5
    }


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

    function setCounter() {
        setStartValue(onValue)
        setMaxValue(offValue)
        setState(onValue)
        localStorage.setItem('setStart', JSON.stringify(onValue));
        localStorage.setItem('setMax', JSON.stringify(offValue));
    }

    const buttonClickOnHandler = (btnName: string) => {
        if (btnName === btnInc) {
            addInc()
        }
        if (btnName === btnReset) {
            resetValue()
        }
        if (btnName === btnSet) {
            setCounter()
        }
    }

    const onChangeOnValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let num = Number(e.currentTarget.value)
        if (num < offValue) {
            setOnValue(num)
        } else {
            console.log("стартовое значение не может быть больше счетчика")
        }
    }

    const onChangeOffValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let num = Number(e.currentTarget.value)
        if (num > onValue) {
            setOffValue(num)
        } else {
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
                Start value: <input type={'number'} value={onValue} onChange={onChangeOnValue}
                                    style={{display: 'block'}}
            />
                MaxValue: <input value={offValue} onChange={onChangeOffValue} style={{display: 'block'}}
                                 type={'number'}/>
            </div>
            <Button buttonClickOnHandler={buttonClickOnHandler} btnName={buttonValues.btnSet.name}
                    isDisabled={buttonValues.btnSet.isDisabled}
            />
        </>
    )
}