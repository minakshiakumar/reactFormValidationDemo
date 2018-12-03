import React, { Component } from 'react';
import ToolTip from '../../tooltip/tooltipComponent';
import $ from 'jquery';

$(function(){
    $(".dropdown-menu li ").click(function(){
      $(".dropdown-toggle:first-child").text($(this).text());
      $(".dropdown-toggle:first-child").val($(this).text())
   });
});
class DropDown extends Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <label className="label" htmlFor={this.props.id}>{this.props.labelName} {this.props.required === true ? <span className="text-danger">*</span> : ''}</label>
                    <ToolTip content={this.props.displayValidationErrors(this.props.id)} show={this.props.showError} />
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle col-5" type="button" data-toggle="dropdown" >Select {this.props.labelName} 
                        <span className="caret"></span></button>
                        <ul className="dropdown-menu col-4">
                            {(this.props.items && this.props.items.length > 0) ? (this.props.items).map((value, key) =>
                               <div key={key}>
                               <li className="ml-2 pointerCursor"  onClick={event => this.props.handleDropDownChange(event,this.props.id,this.props.required)} id={value} value={value}>{value}</li>
                               </div>
                            ) : <li>No data found</li>}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default DropDown;
