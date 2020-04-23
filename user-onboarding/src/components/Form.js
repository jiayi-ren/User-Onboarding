import React from 'react';

const Form = props =>{

    const {values, onInputChange, onCheckboxChange, onSubmit, disabled, errors} = props

    return (
        <div>
            <form className="form">
                <h1>Registration</h1>
                <label >Name:
                    <input className="input" type="text" name='name' value={values.name} onChange={onInputChange} placeholder="Enter Full Name"></input>
                </label>
                <p>{errors.name}</p>
                <label>Email:
                    <input className="input"type="text" name='email' value={values.email} onChange={onInputChange} placeholder="Enter Email"></input>
                </label>
                <p>{errors.email}</p>
                <label>Password:
                    <input className="input" type="text" name='password' value={values.password} onChange={onInputChange} placeholder="Enter Password"></input>
                </label>
                <p>{errors.password}</p>
                <label>I agree to the terms of service and privacy policy
                    <input type="checkbox" name='term' checked={values.term} onChange={onCheckboxChange}></input>
                </label>
                <p>{errors.term}</p>
                <button name="submit" onClick={onSubmit} disabled={disabled}>REGISTER</button>
            </form>
        </div>
    )
};

export default Form;