// @flow 

import * as React from 'react';

import '../index.css'

type Props = {|
    color: string,
    larger: boolean
|}

class CodeAnswerHole extends React.Component<Props> {
    
    render() {

        let css: string = this.props.larger === false 
            ? "codeInBox"
            : "codeHole"
        let color: string = this.props.color || "#2B150C"

        return (
            <div 
                className={css}
                style={{backgroundColor: color}}
            />
        )
    }
}

export default CodeAnswerHole;