import React, { Component } from 'react';
import Input from './input/inputComponent';
import RadioButton from './radioButton/radioButtonComponent';
import DropDown from './dropDown/dropDownComponent';
import CheckBox from './checkBox/checkBoxComponent';
import validators from '../../validator';
import './formComponent.css';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            // name:{value:'',errMsg:'',isValid:''},
            userInfo: {
                name: '',
                gender: '',
                country: '',
                language: []
            }
        };
        this.validators = validators;

    }
    resetValidators = () => {
        Object.keys(this.validators).forEach((fieldName) => {
            this.validators[fieldName].errors = [];
            this.validators[fieldName].state = (fieldName !== 'language') ? '' : [];
            this.validators[fieldName].valid = true;
            this.validators[fieldName].required = true;
            let userInfo={
                name: '',
                gender: '',
                country: '',
                language: []
            }
            this.setState(userInfo);

        });
    }
    displayValidationErrors = (fieldName) => {
        const validator = this.validators[fieldName];
        const result = '';
        if (validator && !validator.valid) {
            const errors = validator.errors.map((info, index) => {
                return <span key={index} className="ml-2 text-left">* {info}</span>;
            });
            return (
                <div className="col s12 row">
                    {errors}
                </div>
            );
        }
        return result;
    }

    handleDropDownChange = (event, inputPropName, isRequired) => {
        const newState = Object.assign({}, this.state);
        newState.userInfo[inputPropName] = event.target.id;
        this.setState(newState);

        if (event.target.id && event.target.id !== '') {
            this.updateValidators(inputPropName, event.target.id, isRequired);
        } else if (isRequired) {
            this.validators[inputPropName].errors = ['This field is required'];
            this.validators[inputPropName].state = event.target.id;
            this.validators[inputPropName].valid = false;
            this.validators[inputPropName].required = true;

        }
    }

    handleInputChange = (event, isRequired) => {
        const newState = Object.assign({}, this.state);
        newState.userInfo[event.target.id] = event.target.value;
        this.setState(newState);
        if (event.target.value && event.target.value !== '') {
            this.updateValidators(event.target.id, event.target.value, isRequired);
        } else if (isRequired) {
            this.validators[event.target.id].errors = ['This field is required'];
            this.validators[event.target.id].state = event.target.value;
            this.validators[event.target.id].valid = false;
            this.validators[event.target.id].required = true;

        }
    }

    handleCheckBoxChange = (event, isRequired) => {
        const newState = Object.assign({}, this.state);
        newState.userInfo[event.target.id].push(event.target.value);
        this.setState(newState);
        if (event.target.value && event.target.value !== '') {
            this.updateValidators(event.target.id, newState.userInfo[event.target.id], isRequired);
        } else if (isRequired) {
            this.validators[event.target.id].errors = ['This field is required'];
            this.validators[event.target.id].state.push(event.target.value);
            this.validators[event.target.id].valid = false;
            this.validators[event.target.id].required = true;

        }
    }

    updateValidators = (fieldName, value, isRequired) => {
        this.validators[fieldName].errors = [];
        this.validators[fieldName].state = value;
        this.validators[fieldName].valid = true;
        this.validators[fieldName].required = isRequired;

        if (this.validators[fieldName].rules && this.validators[fieldName].rules.length > 0) {
            this.validators[fieldName].rules.forEach((rule) => {
                if (rule.test instanceof RegExp) {
                    if (!rule.test.test(value)) {
                        this.validators[fieldName].errors.push(rule.message);
                        this.validators[fieldName].valid = false;
                    }
                } else if (typeof rule.test === 'function') {
                    if (!rule.test(value)) {
                        this.validators[fieldName].errors.push(rule.message);
                        this.validators[fieldName].valid = false;
                    }
                }
            });
        }
    }
    handleSubmit = (e) => {
        let isValid = this.isFormValid();
        // console.log(isValid, "isValid");
        // if (isValid) {
        //     this.resetValidators();
        // }
        e.preventDefault();
    }

    isFormValid = () => {
        let status = true;
        Object.keys(this.validators).forEach((field) => {
            var state = this.state;
            state.userInfo.field = this.validators[field].state;
            this.setState(state);
            this.validators[field].errors = [];
            if ((this.validators[field].state === "" || this.validators[field].state.length == 0) && this.validators[field].required) {
                this.validators[field].errors.push("This field is required");
                this.validators[field].valid = false;
                status = false;
            } else if (this.validators[field].state && this.validators[field].state.length !== 0 && this.validators[field].rules && this.validators[field].rules.length > 0) {
                this.validators[field].rules.forEach((rule) => {
                    if (rule.test instanceof RegExp) {
                        if (!rule.test.test(this.validators[field].state)) {
                            this.validators[field].errors.push(rule.message);
                            this.validators[field].valid = false;
                        }
                    } else if (typeof rule.test === 'function') {
                        if (!rule.test(this.validators[field].state)) {
                            this.validators[field].errors.push(rule.message);
                            this.validators[field].valid = false;
                            status = false;
                        }
                    }
                });
            }
        });
        return status;
    }
    render() {
        return (
            <div className="container col-4 mt-5">
                <form onSubmit={this.handleSubmit}>
                    <h3><center>Form Validation</center></h3>
                    <div className="mt-5">
                    {/* <Input labelName={'First Name'} id={'first'} name={this.state.userInfo.name} required={this.validators.name.required} showError={this.validators.name.errors.length > 0 && !this.validators.name.valid} handleInputChange={this.handleInputChange} displayValidationErrors={this.displayValidationErrors} /> */}

                        <Input labelName={'Name'} id={'name'} name={this.state.userInfo.name} required={this.validators.name.required} showError={this.validators.name.errors.length > 0 && !this.validators.name.valid} handleInputChange={this.handleInputChange} displayValidationErrors={this.displayValidationErrors} />
                        <RadioButton labelName={'Gender'} id={'gender'} items={['Male', 'Female']} showError={this.validators.gender.errors.length > 0 && !this.validators.gender.valid} required={this.validators.gender.required} handleInputChange={this.handleInputChange} displayValidationErrors={this.displayValidationErrors} />
                        <DropDown labelName={'Country'} id="country" items={['India', 'Nepal', 'America', 'Pakistan']} required={this.validators.country.required} showError={this.validators.country.errors.length > 0 && !this.validators.country.valid} handleDropDownChange={this.handleDropDownChange} displayValidationErrors={this.displayValidationErrors} />
                        <CheckBox labelName={'Know language'} id="language" items={['React', 'Javascript', 'Java']} required={this.validators.language.required} showError={this.validators.language.errors.length > 0 && !this.validators.language.valid} handleCheckBoxChange={this.handleCheckBoxChange} displayValidationErrors={this.displayValidationErrors} />
                        <div className="text-center">
                            <button className="btn col-4 btn-warning"><span className="text-white">Submit</span></button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;
