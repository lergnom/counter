import React from "react";
import {Button} from "@material-ui/core";

type DisplayTypeProps = {
    state: number
}

export function Display(props: DisplayTypeProps) {
    return (
        <>
            <div>{props.state}</div>
        </>
    )
}