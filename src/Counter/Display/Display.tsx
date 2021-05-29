import React from "react";

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