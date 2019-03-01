// @flow 

import * as React from 'react';
import CodeAnswerHole from './codeAnswerHole';

import '../index.css'

import { Color } from '../myTypes'

type Props = {
    possibleColors: Array<Color>
}

class ChosenColors extends React.Component<Props> {

    render() {
        return (
            <div className="codeLine">
                {this.props.possibleColors.map<React.Node>((c, idx) => <CodeAnswerHole color={c} key={idx} larger={true} />)}
            </div>
        )
    }
}

export default ChosenColors;