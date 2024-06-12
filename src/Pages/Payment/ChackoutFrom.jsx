import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/Provider";
import Swal from "sweetalert2";
import axios from "axios";


const ChackoutFrom = ({ id }) => {
  const stripe = useStripe();
  const {user}=useContext(AuthContext);
  const elements = useElements();
  const navigate =useNavigate();
  const [transactionId ,setTransactionId] = useState('');
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const axiosSecure = useAxiosSecure()
  const { data: packages = [] } = useQuery({
    queryKey: ['package'],
    queryFn: async () => {
      const res = await axiosSecure.get('/package');
      return res.data;
    }
  })
  const paymentPackage = packages.find(p => p._id === id);
  // console.log(paymentPackage)
  const amount =paymentPackage?.price;
  // console.log(amount);
  useEffect(() => {
    if (amount) {
      if (amount > 0) {
        axios.post('https://assignment-12-server-flame-seven.vercel.app/create-payment-intend', {price:amount})
          .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
          })
      }
    }
  }, [amount])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })

    if (error) {
      console.log('payment error', error)
      setError(error.message)
    }
    else {
      console.log('payment Methode', paymentMethod)
      setError('')
    }

    // confirm payment
    const {paymentIntent,error:confirmError} =await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card: card,
        billing_details :{
          email:user?.email||'anonymous',
          name: user?.displayName||'anonymous'
        }

      }
    })
    if(confirmError){
      console.log('confirm error')
    }
  else{
    console.log('payment intend',paymentIntent)
    if(paymentIntent.status === 'succeeded'){
      Swal.fire({
        title: 'success',
        text: 'You Paid Successfully',
        icon: 'success',
        confirmButtonText: 'Success'
     
    })
   
      console.log('transactionid',paymentIntent.id);
      setTransactionId(paymentIntent.id);
      const payment ={
        email:user?.email,
        price:amount,
        // transactionId:paymentIntent.id,
        date: new Date(),
        members_count:paymentPackage.members_count,
        package_name:paymentPackage.package_name,
        role:'Hr'
      }
    axiosSecure.post('/payments',payment)
    .then(res=>{
      console.log('payment saved',res.data)
     navigate('/')
      
    })
      
    }
  }
  }
  return (
    <div className="container mx-auto my-24">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="btn btn-sm bg-green-400 text-white my-6 " type="submit" 
        // disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        <p className="text-green-500">Transaction-Id:  {transactionId}</p>
      </form>
    </div>
  );
};

export default ChackoutFrom;