// @flow 

import * as React from 'react';
import CodeLine from './codeLine';
import ChosenColors from './chosenColors'

import '../App.css'

import {
    GamePeg, 
    Color, 
    colorNumbers, 
    colorMap,
    colorTransition,
    HintColor
} from '../myTypes';

type State = {|
    chosenColorsOrdered: Array<Color>,
    gameBoard: Array<Array<GamePeg>>,
    gameHint: Array<Array<HintColor>>,
    currentRow: number
|}


class CodeBreaker extends React.Component<{}, State> {

    state = {
        chosenColorsOrdered: this.chooseColors(),
        gameBoard: Array(6)
            .fill([])
            .map<Color>(() => Array(4).fill(null)),
        gameHint: Array(6)
            .fill([])
            .map<HintColor>(() => Array(4).fill(null)),
        currentRow: 5
    }

    handlePegClick = (column: number): void => {

        let { currentRow } = this.state
 
        let newBoard = this.state.gameBoard.map((item, idx) => {
            if (idx === currentRow) {
                return item.map((peg, index) => {
                    if (index === column) {
                        let currentColor = this.state.gameBoard[currentRow][column]
                        return colorTransition[currentColor]
                    }
                    return peg
                })
            }
            return item
        })
 
        this.setState({
            gameBoard: newBoard
        })
    }

    endTurn = () => {

        let { currentRow : currentRowState } = this.state

        for (let i = 0; i < 4; i++) {
            if (this.state.gameBoard[currentRowState][i] === null)
                return;
        }

        let secret_code_colors: Array<Color> = this.state.chosenColorsOrdered.slice();
        let guess_code_colors: Array<GamePeg> =this.state.gameBoard[currentRowState].slice();

        let numColorMatch = 0;
        let numExactMatch = 0;

        let guess_color_used = [false, false, false, false]
        let secret_color_used = [false, false, false, false]

        for (let i = 0; i < 4; i++) {
            if (secret_code_colors[i] === guess_code_colors[i]) {
                guess_color_used[i] = secret_color_used[i] = true
                numExactMatch += 1
            }
        }
        for (let i = 0; i < 4; i++) {
            if (!guess_color_used[i]) {
                for (let j = 0; j < 4; j++) {
                    if (!secret_color_used[j] && (secret_code_colors[j] === guess_code_colors[i])) {
                        secret_color_used[j] = true
                        numColorMatch += 1
                        break
                    }
                }
            }
        }
        
        let gameHintArray = []
        for (let i = 0; i < numColorMatch; i++) {
            gameHintArray.push("white")
        }

        for (let i = 0; i < numExactMatch; i++) {
            gameHintArray.push("red");
        }

        if (numExactMatch === 4) {
            alert("You Won!");
            window.location.reload();
        }

        for (let i = numExactMatch + numColorMatch; i < 4; i++) {
            gameHintArray.push(null)
        }

        for (let i = gameHintArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // $FlowFixMe
            [gameHintArray[i], gameHintArray[j]] = [gameHintArray[j], gameHintArray[i]];
        }

        let gameHintCopy = this.state.gameHint.map((item, idx) => {
            if (idx === currentRowState) 
                return gameHintArray 
            return item
        })

        if (currentRowState === 0) {
            alert("You Lost :(")
            window.location.reload();
        }

        currentRowState -= 1
        this.setState({
            gameHint: gameHintCopy,
            currentRow: currentRowState
        })
    }

    chooseColors() : Array<Color> {
        let chosenColors = Array(4).fill(null).map<Color>(() => colorMap[Math.floor(Math.random() * 4)])
        console.log(`Chosen Colors: ${chosenColors}`)
        return chosenColors;
    }

    render() {

        let data = this.state.gameBoard.map<React.Node>((peg, idx) =>
            <CodeLine
                key={idx}
                gameRow={peg}
                gameHint={this.state.gameHint[idx]}
                handlePegClick={this.handlePegClick}
            />
        )

        return (
            <div className="codeBreaker">
                <ChosenColors possibleColors={Object.keys(colorNumbers)}/>
                {data}
                <button className="btn" onClick={this.endTurn}>
                    End Turn
                </button>
            </div>
        );
    }
}

export default CodeBreaker;
