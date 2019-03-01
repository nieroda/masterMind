// @flow 

import * as React from 'react';
import CodeHole from './codeHole';
import CodeAnswerHole from './codeAnswerHole'

import { Color, HintColor } from '../myTypes'

import '../index.css'

type Props = {
    gameRow: Array<Color>,
    gameHint: Array<HintColor>,
    handlePegClick: (column: number) => void
}

class CodeLine extends React.Component<Props> {
    render() {

        let data =  this.props.gameRow.map<React.Node>((color, idx) => 
             <CodeHole 
                key={idx} 
                index={idx} 
                color={color} 
                handlePegClick={this.props.handlePegClick} 
            />
        )

        let hint = this.props.gameHint.map<React.Node>((color, idx) => {
            return <CodeAnswerHole 
                key={idx}
                color={color}
                larger={false}
            />
        })

        return (
            <div className="codeLine">
                { data }
                <div className="codeHint">
                    { hint }
                </div>
            </div>
        )
    }
}

export default CodeLine;