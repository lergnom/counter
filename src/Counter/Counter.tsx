import React, {useEffect, useState} from "react";
import {Display} from "./Display/Display";
import {ButtonComp} from "./Button/Button";
import {InputComp} from "./InputComp/InputComp";
import s from "./Counter.module.css"

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
    const [error, setError] = useState(false)
    const [hint, setHint] = useState<string>("")


    useEffect(() => {
        if (state === maxValue) {
            setButtonValues({...buttonValues, btnInc: {...buttonValues.btnInc, isDisabled: true}})
            setError(true)
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
        setError(false)
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
            btnReset: {...buttonValues.btnReset, isDisabled: true}
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
        setOnValue(num)
        if (num < offValue) {
            setButtonValues({...buttonValues, btnSet: {...buttonValues.btnSet, isDisabled: false}})
            setHint("")

        } else {
            setButtonValues({...buttonValues, btnSet: {...buttonValues.btnSet, isDisabled: true}})
            setHint("стартовое значение не может быть больше и равно счетчику")
            console.log("стартовое значение не может быть больше счетчика")
        }
    }

    const onChangeOffValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let num = Number(e.currentTarget.value)
        setOffValue(num)
        if (num > onValue) {
            setButtonValues({...buttonValues, btnSet: {...buttonValues.btnSet, isDisabled: false}})
            setHint("")
        } else {
            setButtonValues({...buttonValues, btnSet: {...buttonValues.btnSet, isDisabled: true}})
            console.log("Максимальное значение не может быть меньше стартового")
            setHint("Максимальное значение не может быть меньше или равен стартовому")
        }
    }

    return (
        <div className={s.counter}>
            <div className={s.setContainer}>
                <div className={s.setContainerWrapper}>
                    <div className={s.setInputValue}>
                        <span>max value:</span>
                        <InputComp name={"off"} value={offValue} onChange={onChangeOffValue}
                                   onClick={disabledForm} hint={hint}/>
                    </div>
                    <div className={s.setInputValue}>
                        <span>start value:</span>
                        <InputComp name={"on"} value={onValue} onChange={onChangeOnValue} onClick={disabledForm}
                                   hint={hint}/>
                    </div>
                </div>
                <div className={s.setContainerWrapper}>
                    <div style={{padding: "10px"}}>
                        <ButtonComp key={buttonValues.btnSet.id} buttonClickOnHandler={buttonClickOnHandler}
                                    btnName={buttonValues.btnSet.name}
                                    isDisabled={buttonValues.btnSet.isDisabled}
                        />
                    </div>

                </div>
            </div>

            <div className={s.setContainer}>

                <div className={s.setContainerWrapper}>
                    <Display state={state} hint={hint} error={error}/>


                </div>
                <div className={s.setContainerWrapper} style={{flexDirection: "row", justifyContent: "space-around"}}>
                    <ButtonComp key={buttonValues.btnInc.id} buttonClickOnHandler={buttonClickOnHandler}
                                btnName={buttonValues.btnInc.name}
                                isDisabled={buttonValues.btnInc.isDisabled}/>
                    <ButtonComp key={buttonValues.btnReset.id} buttonClickOnHandler={buttonClickOnHandler}
                                btnName={buttonValues.btnReset.name}
                                isDisabled={buttonValues.btnReset.isDisabled}
                    />
                </div>

            </div>


        </div>
    )
}