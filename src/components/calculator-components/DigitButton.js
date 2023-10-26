import React, { Component } from 'react'

class DigitButton extends Component {
    displayDigit = () => {
        this.props.onClick(this.props.digit);
      };

    render() {
        return (
        <div>
            <button onClick={this.displayDigit}>{this.props.digit}</button>
        </div>
        )
    }
}

export default DigitButton


