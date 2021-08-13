import React, {useEffect, useState} from "react";
import {Display} from "./Display/Display";
import {ButtonComp} from "./Button/Button";
import {InputComp} from "./InputComp/InputComp";
import s from "./Counter.module.css"
import {useDispatch, useSelector} from "react-redux";
import {
    addIncCounter,
    resetValueCounter,
    setMaxValue,
    setOffValue,
    setOnValue,
    setStartValue
} from "../state/counter-reducer";
import {AppRootReducer} from "../state/store";

type  ButtonValuesTypeProps = {
    id: number
    name: string
    isDisabled: boolean
}
type CounterTypeProps = {
    [buttons: string]: ButtonValuesTypeProps
}

export const Counter = () => {
    //Названия кнопочек
    const btnInc = '+'
    const btnReset = 'reset'
    const btnSet = 'set'

    // Хук useState для включения выключения кнопок и отрисовок
    const [buttonValues, setButtonValues] = useState<CounterTypeProps>({
        btnInc: {id: 1, name: btnInc, isDisabled: false},
        btnReset: {id: 2, name: btnReset, isDisabled: true},
        btnSet: {id: 3, name: btnSet, isDisabled: false}
    })

    //Хук useState для показа  ошибок и всплывающих уведомлений
    const [error, setError] = useState(false)
    const [hint, setHint] = useState<string>("")

    //Перевод счетчика на Redux и использование хуков useSelector и useDispatch
    const state = useSelector<AppRootReducer, number>((state) => state.counter.state)
    const startValue = useSelector<AppRootReducer, number>((state) => state.counter.startValue)
    const maxValue = useSelector<AppRootReducer, number>((state) => state.counter.maxValue)
    const onValue = useSelector<AppRootReducer, number>((state) => state.counter.onValue)
    const offValue = useSelector<AppRootReducer, number>((state) => state.counter.offValue)
    const dispatch = useDispatch()

    //Использование хука UseEffect для корректной отрисовки состояния кнопок
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
            dispatch(addIncCounter(state))
            const copy = {...buttonValues, btnReset: {...buttonValues.btnReset, isDisabled: false}}
            setButtonValues(copy)
        }
    }

    function resetValue() {
        dispatch(resetValueCounter(startValue))
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
        dispatch(setStartValue(onValue))
        dispatch(setMaxValue(offValue))
        dispatch(resetValueCounter(onValue))
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
        dispatch(setOnValue(num))
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
        dispatch(setOffValue(num))
        if (num > onValue) {
            setButtonValues({...buttonValues, btnSet: {...buttonValues.btnSet, isDisabled: false}})
            setHint("")
        } else {
            setButtonValues({...buttonValues, btnSet: {...buttonValues.btnSet, isDisabled: true}})
            console.log("Максимальное значение не может быть меньше стартового")
            setHint("Максимальное значение не может быть меньше или равно стартовому")
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