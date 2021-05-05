import React from 'react';
import { useHistory } from 'react-router';

const Confirm = ({ customerData }) => {
    const history = useHistory();
    return (
        <section>
            <br/><br/><br/><br/><br/><br/><br/>
            <h1 style={{textAlign:'center'}}>Thank you {customerData.firstname+' '+customerData.lastname} your order is confirmed. You will receive an E-mail shortly.</h1>
            <h2 OnClick={()=>history.push('/')}>Shop More</h2>
        </section>
    );
};

export default Confirm;