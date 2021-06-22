import React from "react";
import s from '../Counter.module.css'
import {Button} from "@material-ui/core";

type DisplayTypeProps = {
    state: number
    hint: string
    error: boolean
}

export function Display(props: DisplayTypeProps) {

    return (
        <>
            {/*{showDisplay}*/}
            {props.hint === '' && <div className={!props.error ? s.dispText : s.dispError}>{props.state}</div>}
            {props.hint !== '' && <div className={s.dispHint}>{props.hint}</div>}
        </>
    )
}