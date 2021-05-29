import React from "react";

type ButtonsTypeProps = {
    buttonClickOnHandler: (str: string) => void
    btnName: string
}

export const Button = ({buttonClickOnHandler, btnName}: ButtonsTypeProps) => {
    return (
        <button onClick={() => {
            buttonClickOnHandler(btnName)
        }}>{btnName}</button>
    )
}