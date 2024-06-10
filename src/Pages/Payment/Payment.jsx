
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import ChackoutFrom from './ChackoutFrom';
import { Helmet } from 'react-helmet-async';
const Payment = () => {
    const {id} = useParams();
    console.log(id)
    const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway);
    return (
        <div className='container mx-auto'>
             <div>
      <Helmet>
        <title>PrimeFunds || Payment</title>
      </Helmet></div>
            <h1 className='flex justify-center items-center text-3xl text-green-400'>Pay First</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <ChackoutFrom  id={id}></ChackoutFrom>
                </Elements>
            </div>
          
        </div>
    );
};

export default Payment;