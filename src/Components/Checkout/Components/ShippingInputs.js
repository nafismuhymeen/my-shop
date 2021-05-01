import { Grid } from '@material-ui/core';
import { useFormContext } from "react-hook-form";
import React from 'react';
import { ErrorMessage } from '@hookform/error-message';


const ShippingInputs = ({ inputType, inputId, inputName }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <Grid item xs={12} md={6}>
            <div className="form-group">
                <label htmlFor={inputId}>{inputName}</label>
                <input
                    style={{ width: '100%' }}
                    type={inputType}
                    className="form-control form-control-lg"
                    id={inputId}
                    placeholder={inputName}
                    {...register(inputId,{required: {value: true, message: <p style={{ color: 'red' }}>{inputName} is required</p>}})}
                />
                <ErrorMessage
                    errors={errors}
                    name={inputId}
                    message={errors?.inputId?.message}
                />
            </div>
        </Grid>
    );
};

export default ShippingInputs;