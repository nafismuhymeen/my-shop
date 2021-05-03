import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import ShippingInputs from './ShippingInputs';
import { useForm, FormProvider } from 'react-hook-form';
import commerce from '../../../commerce';
/* eslint-disable */
const Shipping = ({ checkOutId, setCustomerData, nextPage }) => {
// States and Variables    
    const methods = useForm();
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('');
    const [subdivisions, setSubdivisions] = useState([]);
    const [subdivision, setSubdivision] = useState('');
    const [temp_Subdivision, setTemp_Subdivision] = useState('');
    const [shippings, setShippings] = useState([]);
    const [shipping, setShipping] = useState('');

// Normal Functions
    const getCountries = () => {
        commerce.services.localeListShippingCountries(checkOutId)
            .then(res => {
                setCountries(Object.entries(res.countries))
                setCountry(Object.keys(res.countries)[0])
            });
    }

    const getStates = ()=>{
        commerce.services.localeListShippingSubdivisions(checkOutId, country)
        .then(res => {
            setSubdivisions(Object.entries(res.subdivisions))
            setTemp_Subdivision(Object.keys(res.subdivisions)[0])
            setSubdivision(Object.keys(res.subdivisions)[0])

        });
    }
//On Change Functions
    const getShipping = (regions=null)=>{
        commerce.checkout.getShippingOptions(checkOutId, {
            country: country,
            region: regions,
          }).then(res => {
              setShippings(res)
              setShipping(res[0].id)
            });
    }
// Calling Functions
    useEffect(() => {
        if (checkOutId) {
            getCountries()
        }
    }, [checkOutId])

    useEffect(()=>{
        if (country) {
            getStates()
        }
    },[country])

    useEffect(()=>{
        if (temp_Subdivision) {
                getShipping(temp_Subdivision)
        }
    },[temp_Subdivision]);
    return (
        <section style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
            <br/>
            <br/>
            <h2 style={{textAlign:'center'}}>Shipping Information</h2><br/>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data, e) => { e.preventDefault(); setCustomerData({...data, country, subdivision, shipping}); nextPage()})}>
                    <Grid container spacing={3}>
                        <ShippingInputs inputId='firstname' inputName='First Name' inputType='text' />
                        <ShippingInputs inputId='lastname' inputName='Last Name' inputType='text' />
                        <ShippingInputs inputId='email' inputName='E-mail' inputType='email' />
                        <ShippingInputs inputId='street' inputName='Shipping Address' inputType='text' />
                        <ShippingInputs inputId='postal_zip_code' inputName='Zip/Postal Code' inputType='text' />
                        <ShippingInputs inputId='town_city' inputName='Town/City' inputType='text' />
                        <Grid item xs={12} md={6}>
                            <div className="form-group">
                                <label htmlFor='country'>Country</label>
                                <select onChange={(e)=>setCountry(e.target.value)} style={{width: '100%'}} id='country' className=" form-control">
                                    {countries && countries.map(option=>{return(
                                    <option key={option[0]} value={option[0]}>{option[1]}</option>)})}
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="form-group">
                                <label htmlFor='county_state'>State/Province</label>
                                <select onChange={(e)=>setSubdivision(e.target.value)} style={{width: '100%'}} id='county_state' className=" form-control">
                                    {subdivisions && subdivisions.map(option=>{return(
                                    <option key={option[0]} value={option[0]}>{option[1]}</option>)})}
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="form-group">
                                <label htmlFor='shipping_method'>Shipping Methods</label>
                                <select onChange={(e)=>setShipping(e.target.value)} style={{width: '100%'}} id='shipping_method' className=" form-control">
                                    {shippings && shippings.map(option=>{return(
                                    <option key={option.id} value={option.id}>{option.description}: {option.price.formatted_with_symbol}</option>)})}
                                </select>
                            </div>
                        </Grid>
                    </Grid>
                    <button className="btn btn-primary" type='submit'>Next</button>
                </form>
            </FormProvider>
        </section>
    );
};

export default Shipping;