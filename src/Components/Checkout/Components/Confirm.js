import React from 'react';

const Confirm = ({ customerData }) => {
    return (
        <section>
            <br/><br/><br/><br/><br/><br/><br/>
            <h1 style={{textAlign:'center'}}>Thank you {customerData.firstname+' '+customerData.lastname} your order is confirmed. You will receive an E-mail shortly.</h1>
        </section>
    );
};

export default Confirm;