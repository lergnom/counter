import React from "react";

const ADD_INC = 'ADD_INC'
const RESET_VALUE = 'RESET_VALUE'
const SET_ON_VALUE = 'SET_ON_VALUE'
const SET_OFF_VALUE = 'SET_OFF_VALUE'
const SET_START_VALUE = 'SET_START_VALUE'
const SET_MAX_VALUE = 'SET_MAX_VALUE'

const localStorageMaxValue = () => {
    return localStorage.getItem('setMax') ? JSON.parse(localStorage.setMax) : 5
}

const localStorageStartValue = () => {
    return localStorage.getItem('setStart') ? JSON.parse(localStorage.setStart) : 0
}

type StateType = {
    startValue: number,
    maxValue: number,
    state: number,
    onValue: number,
    offValue: number
}
const initState: StateType = {
    startValue: localStorageStartValue(),
    maxValue: localStorageMaxValue(),
    state: localStorageStartValue(),
    onValue: localStorageStartValue(),
    offValue: localStorageMaxValue(),
}

type DispatchProps =
    DispatchAddIncType
    | DispatchresetValueType
    | DispatchSetOnValuetype
    | DispatchSetOffValuetype
    | DispatchSetMaxValueType
    | DispatchSetStartValueType

export const counterReducer = (state: StateType = initState, action: DispatchProps): StateType => {
    switch (action.type) {
        case ADD_INC:
            return {...state, state: action.count}
        case RESET_VALUE:
            return {...state, state: action.value}
        case SET_ON_VALUE:
            return {...state, onValue: action.value}
        case SET_OFF_VALUE:
            return {...state, offValue: action.value}
        case SET_START_VALUE:
            return {...state, startValue: action.value}
        case SET_MAX_VALUE:
            return {...state, maxValue: action.value}
        default:
            return state

    }
}

type DispatchAddIncType = {
    type: 'ADD_INC'
    count: number
}

export const addIncCounter = (count: number): DispatchAddIncType => {
    count = count + 1
    return {type: ADD_INC, count}
}

type DispatchresetValueType = {
    type: 'RESET_VALUE'
    value: number
}

export const resetValueCounter = (value: number): DispatchresetValueType => ({type: RESET_VALUE, value})


type DispatchSetOnValuetype = {
    type: 'SET_ON_VALUE'
    value: number
}

export const setOnValue = (value: number): DispatchSetOnValuetype => ({type: SET_ON_VALUE, value})

type DispatchSetOffValuetype = {
    type: 'SET_OFF_VALUE'
    value: number
}

export const setOffValue = (value: number): DispatchSetOffValuetype => ({type: SET_OFF_VALUE, value})

type DispatchSetStartValueType = {
    type: 'SET_START_VALUE'
    value: number
}
export const setStartValue = (value: number): DispatchSetStartValueType => ({type: SET_START_VALUE, value})

type DispatchSetMaxValueType = {
    type: 'SET_MAX_VALUE'
    value: number
}

export const setMaxValue = (value: number): DispatchSetMaxValueType => ({type: SET_MAX_VALUE, value})
