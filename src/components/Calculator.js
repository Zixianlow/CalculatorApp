import React, { Component } from 'react'
import DigitButton from './calculator-components/DigitButton'
import OperationButton from './calculator-components/OperationButton'

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
           previousOperand: '',
           currentOperand: '',
           operator: '',
           overwrite: false,
        }
    }

    evaluate = ({previousOperand, currentOperand, operator, overwrite}) => {
        if (!previousOperand || !currentOperand || !operator)
            return null;
        const previous = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        let result = null;
        switch (operator) {
            case "+":
                result = previous + current;
                break;
            case "-":
                result = previous - current;
                break;
            case "*":
                result = previous * current;
                break;
            case "/":
                result = previous / current;
                break;
            default:
                result = null;
        }
        return result;
    }
    
    handleDigitClick = (digit) => {
        if (digit==="." && (this.state.currentOperand.includes(".")))
            return ;
        let newCurrentOperand;
        if (this.state.overwrite === true)
            newCurrentOperand = `${digit}`;
        else
            newCurrentOperand = `${this.state.currentOperand}${digit}`;
        this.setState({
            currentOperand: newCurrentOperand,
            overwrite: false,
        });
    };
    
    handleOperatorClick = (operator) => {
        if (!this.state.previousOperand && !this.state.currentOperand)
            return ;
        if (this.state.previousOperand && !this.state.currentOperand){
            this.setState({ operator: operator });
            return ;
        }
        if (!this.state.previousOperand){
            this.setState({
                previousOperand: this.state.currentOperand,
                currentOperand: '',
                operator: operator,
            });
            return ;
        }
        const result = this.evaluate(this.state);
        const previousOperand = result !== null ? result.toString() : this.state.previousOperand;
        this.setState({
            previousOperand,
            currentOperand: '',
            operator: operator,
        });
    };

    handleAC = () => {
        this.setState({
            previousOperand: '',
            currentOperand: '',
            operator: '',
        });
    }

    handleDEL = () => {
        if (!this.state.currentOperand)
            return ;
        if (this.state.overwrite === true) {
            this.setState({
                previousOperand: '',
                currentOperand: '',
                operator: '',
                overwrite: false,
            });
            return ;
        }
        let newCurrentOperand = this.state.currentOperand.slice(0, -1);
        this.setState({
            currentOperand: newCurrentOperand,

        });
    }

    handleEqual = () => {
        const result = this.evaluate(this.state);
        if (result === null)
            return ;
        this.setState({
            previousOperand: '',
            currentOperand: result.toString(),
            operator: '',
            overwrite: true,
        });
    }

  render() {
    return (
        <div className="calculator-background">
            <div className="calculator">
                <div className="calculator-display">
                    <div className="operand-previous">{this.state.previousOperand} {this.state.operator}</div>
                    <div className="operand-current" >{this.state.currentOperand}</div>
                </div>
                <div className="calculator-button">
                    <button className="span-two" onClick={this.handleAC}>AC</button>
                    <button onClick={this.handleDEL}>DEL</button>
                    <OperationButton onClick={this.handleOperatorClick} operator="/" />
                    <DigitButton onClick={this.handleDigitClick} digit="7" />
                    <DigitButton onClick={this.handleDigitClick} digit="8" />
                    <DigitButton onClick={this.handleDigitClick} digit="9" />
                    <OperationButton onClick={this.handleOperatorClick} operator="*" />
                    <DigitButton onClick={this.handleDigitClick} digit="4" />
                    <DigitButton onClick={this.handleDigitClick} digit="5" />
                    <DigitButton onClick={this.handleDigitClick} digit="6" />
                    <OperationButton onClick={this.handleOperatorClick} operator="+" />
                    <DigitButton onClick={this.handleDigitClick} digit="1" />
                    <DigitButton onClick={this.handleDigitClick} digit="2" />
                    <DigitButton onClick={this.handleDigitClick} digit="3" />
                    <OperationButton onClick={this.handleOperatorClick} operator="-" />
                    <DigitButton onClick={this.handleDigitClick} digit="." />
                    <DigitButton onClick={this.handleDigitClick} digit="0" />
                    <button className="span-two" onClick={this.handleEqual}>=</button>
                </div>
            </div>
        </div>
    )
  }
}

export default Calculator
