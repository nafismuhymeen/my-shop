import React from 'react';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51IlxBsFrckEOPF17G0qwIYmeyiERr1kfHulxp0XQdaRs5C7H5sqM4khoQhkALdJL1gXBgihXBrCywAyBzUQaFXiR00zTBzPeb9');

const Payments = ({checkOutId, checkOut, customerData, handleCaptureCheckout, setCheckOutPage}) => {
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();
    
        if (!stripe || !elements) return;
    
        const cardElement =  elements.getElement(CardElement);
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    
        if (error) {
          console.log(error);
        } else {
          const orderData = {
            line_items: checkOut.live.line_items,
            customer: { firstname: customerData.firstname, lastname: customerData.lastname, email: customerData.email },
            shipping: { name: customerData.firstname+''+customerData.lastname, street: customerData.street, town_city: customerData.town_city, county_state: customerData.subdivision, postal_zip_code: customerData.postal_zip_code, country: customerData.country },
            fulfillment: { shipping_method: customerData.shipping },
            payment: {
              gateway: 'stripe',
              stripe: {
                payment_method_id: paymentMethod.id,
              },
            },
          };
    
          handleCaptureCheckout(checkOutId, orderData);

        }
      };
    return (
        <section className='payments'>
            <h1>Payments</h1><br/><br/>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>{({ elements, stripe }) => (
                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                        <CardElement />
                        <br /> <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={()=>setCheckOutPage(prevCheckOutPage=>prevCheckOutPage-1)}>Back</button>
                            <button type="submit" disabled={!stripe}>
                            Pay {checkOut.live.subtotal.formatted_with_symbol}
                            </button>
                        </div>
                    </form>
                )}
                </ElementsConsumer>
            </Elements>
        </section>
    );
};

export default Payments;