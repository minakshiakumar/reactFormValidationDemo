import React, { Component } from 'react';
import ToolTip from '../../tooltip/tooltipComponent';

class Input extends Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <label className="label" htmlFor={this.props.id}>{this.props.labelName} {this.props.required === true ? <span className="text-danger">*</span> : ''}</label>
                    <ToolTip content={this.props.displayValidationErrors(this.props.id)} show={this.props.showError} />
                    <input type="text" className="form-control" id={this.props.id} value={this.props.name}
                        onChange={event => this.props.handleInputChange(event,this.props.id,this.props.required)} />
                </div>
            </div>
        );
    }
}

export default Input;
