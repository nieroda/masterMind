// @flow 

import * as React from 'react';

import '../index.css'

type Props = {|
    color: string,
    index: number,
    handlePegClick: (column: number) => void
|}

class CodeHole extends React.Component<Props> {
    
    render() {

        let color = this.props.color || "#2B150C"

        return (
            <div 
                onClick={() => this.props.handlePegClick(this.props.index)}
                className="codeHole" 
                style={{backgroundColor: color}}
            />
        )
    }
}

export default CodeHole;