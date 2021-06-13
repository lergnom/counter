import React from "react";
import {Button} from "@material-ui/core";

type ButtonsTypeProps = {
    buttonClickOnHandler: (str: string) => void
    btnName: string
    isDisabled: boolean
}

export const ButtonComp = ({buttonClickOnHandler, btnName, isDisabled}: ButtonsTypeProps) => {
    return (
        <Button variant={"contained"} color={"primary"} disabled={isDisabled} onClick={() => {
            buttonClickOnHandler(btnName)
        }}>{btnName}</Button>
    )
}