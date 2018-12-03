import React, { Component } from 'react';
import ToolTip from '../../tooltip/tooltipComponent';

class CheckBox extends Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <label className="label" htmlFor={this.props.id}>{this.props.labelName} {this.props.required === true ? <span className="text-danger">*</span> : ''}</label>
                    <ToolTip content={this.props.displayValidationErrors(this.props.id)} show={this.props.showError} />
                    {(this.props.items && this.props.items.length > 0) ?
                        (this.props.items).map((value, key) =>
                            <div key={key} htmlFor="custom-control custom-checkbox ">
                                <input type="checkbox" htmlFor="custom-control-input" id={this.props.id} value={value} onChange={event => this.props.handleCheckBoxChange(event,this.props.required)} />
                                <label className="ml-2" htmlFor="custom-control-label" htmlFor={this.props.id}>{value}</label>
                            </div>
                        ) : ''
                    }
                </div>
            </div>

        );
    }
}

export default CheckBox;
