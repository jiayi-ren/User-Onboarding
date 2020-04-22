import React from 'react';

const Form = props =>{

    const {values, onInputChange, onCheckboxChange, onSubmit, disabled, errors} = props

    return (
        <div>
            <form>
                <div>
                    <pre>
                    {errors.name}
                    {errors.email}
                    {errors.password}
                    {errors.term}
                    </pre>
                </div>
                <label>Name: 
                    <input type="text" name='name' value={values.name} onChange={onInputChange}></input>
                </label>
                <label>Email:
                    <input type="text" name='email' value={values.email} onChange={onInputChange}></input>
                </label>
                <label>Password:
                    <input type="text" name='password' value={values.password} onChange={onInputChange}></input>
                </label>
                <label>I agree to the terms of service and privacy policy
                    <input type="checkbox" name='term' checked={values.term} onChange={onCheckboxChange}></input>
                </label>
                <button onClick={onSubmit} disabled={disabled}>Submit</button>
            </form>
        </div>
    )
};

export default Form;