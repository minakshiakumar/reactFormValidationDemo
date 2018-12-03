import React, { Component } from 'react';
import ToolTip from '../../tooltip/tooltipComponent';

class RadioButton extends Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <label className="label" htmlFor={this.props.id}>{this.props.labelName} {this.props.required === true ? <span className="text-danger">*</span> : ''}</label>
                    <ToolTip content={this.props.displayValidationErrors(this.props.id)} show={this.props.showError} />
                    <div className="row" onChange={event => this.props.handleInputChange(event, this.props.required)} >
                        {(this.props.items && this.props.items.length > 0) ?
                            (this.props.items).map((value, key) => <div className="ml-3" key={key} >
                                <input className="pointerCursor" type="radio" name={this.props.id} id={this.props.id} value={value} />
                                <label className="radio-inline ml-1">{value}</label>
                            </div>
                            ) : ''
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default RadioButton;
