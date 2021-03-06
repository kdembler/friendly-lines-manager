import * as React from "react"
import {withLog} from "./debug"

export default withState = (initialState = {}, stateToProps = () => ({}), setStateToProps = () => ({})) => Component => (
    class StateWrapper extends React.Component {
        constructor() {
            super()
            this.state = initialState
        }

        render() {
            const stateProps = stateToProps(this.state, this.props)
            const handlersProps = setStateToProps(this.setState.bind(this), {...stateProps, ...this.props})
            return <Component {...stateProps} {...handlersProps} {...this.props}/>
        }

    }
)

export const withLink = (valueName, defaultValue) => withState(
    {
        [valueName]: defaultValue
    },
    state => ({
        [valueName]: state[valueName]
    }),
    setState => ({
        [valueName + "Change"]: newVal => setState(({[valueName]: newVal}))
    })
)