import React, { Component } from 'react'

class OperationButton extends Component {
    displayOperator = () => {
        this.props.onClick(this.props.operator);
      };

    render() {
        return (
            <div>
                <button onClick={this.displayOperator}>{this.props.operator}</button>
            </div>
        )
    }
}

export default OperationButton
