import React from "react";
import s from '../Counter.module.css'
import {Button} from "@material-ui/core";

type DisplayTypeProps = {
    state: number
    hint: string
}

export function Display(props: DisplayTypeProps) {
    return (
        <> {props.hint}
            <div className={s.dispText}>{props.state}</div>
        </>
    )
}