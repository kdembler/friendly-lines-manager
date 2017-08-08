import {createReducer} from "../../libs/reducers"
import R from "ramda"
import configActions from "./actionTypes"

const defaultState = {
    all: [{
        name: "testowa",
        config: {}
    }],
    searchQuery: "",
    active: undefined
}

const changeAllList = R.over(R.lensProp('all'))
const removeConfigFromList = name => R.filter(config => config.name !== name)
const addConfigToList = (name, config) => R.append({
    name,
    config
})

const handlers = {
    [configActions.listQueryChange]: (state, action) => R.assoc('searchQuery', action.payload.toLowerCase(), state),
    [configActions.listActiveConfigChange]: (state, action) => R.assoc('active', action.payload, state),
    [configActions.saveConfig]: (state, action) => R.compose(
        changeAllList(addConfigToList(action.payload.name, action.payload.config)),
        changeAllList(removeConfigFromList(action.payload.name))
    )(state)
}

export const _handlers = handlers
export default createReducer(defaultState, handlers)