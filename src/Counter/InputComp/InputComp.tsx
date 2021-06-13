import React from "react";
import {Input, TextField} from "@material-ui/core";

type InputCompTypeProps = {
    name: string
    value: number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClick: () => void
}

export const InputComp = (props: InputCompTypeProps) => {
    return (
        <TextField style={{width: "80px"}} value={props.value}
                   name={props.name}
                   variant={"outlined"}
                   size={"small"}
                   type={"number"}
                   onChange={props.onChange}
                   onClick={props.onClick}/>
    )
}