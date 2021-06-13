import React from "react";

type ButtonsTypeProps = {
    buttonClickOnHandler: (str: string) => void
    btnName: string
    isDisabled: boolean
}

export const Button = ({buttonClickOnHandler, btnName, isDisabled}: ButtonsTypeProps) => {
    return (
        <button disabled={isDisabled} onClick={() => {
            buttonClickOnHandler(btnName)
        }}>{btnName}</button>
    )
}