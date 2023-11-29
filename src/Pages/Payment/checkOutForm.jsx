import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './payment.css'
import { useState, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "../../Provider/Provider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [showError, setShowError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosSecure()
    const [loadingPayment, setLoadingPayment] = useState(false)
    const [paymentSuccessfull, setPaymentSuccessfull] = useState(null)
    const {user} = useAuth()
    const {fundingInfo} = useContext(AuthContext)
    const {amount, donation_id, donor_email, donor_name, donor_image} = fundingInfo
    const navigate = useNavigate()


    useEffect(() => {
        if(amount > 0) {
            axiosSecure.post('/create-payment-intent', {amount: amount})
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, amount])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingPayment(true)
        setPaymentSuccessfull(null)

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement);
        console.log('card', card);
        if(card == null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            console.log('payment method error', error);
            setShowError(error.message)
        } else {
            console.log(paymentMethod);
            setShowError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'unknown',
                    name: user?.name || 'unknown'
                }
            }
        })

        if(confirmError){
            console.log('payment intent error', confirmError);
            setShowError(confirmError.message)
        } else {
            console.log('payment intent', paymentIntent);
            if(paymentIntent.status === "succeeded"){
                setShowError('')

                const payment = {
                    donation_id: donation_id,
                    amount: amount,
                    donor_email: donor_email,
                    donor_name: donor_name,
                    donor_image: donor_image, 
                    TransictionId: paymentIntent.id                    
                }
                
                axiosSecure.post('/funding', payment)
                    .then(() => {
                        setLoadingPayment(false)
                        setPaymentSuccessfull(amount)
                        Swal.fire({
                            title: `Donated $${amount}`,
                            icon: "success"
                            })
                        navigate('/fundings')
                    })
            }
        }
        setLoadingPayment(false)
    }

    return (
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
            <p className="text-red-500 text-center">{showError}</p>
            {paymentSuccessfull && <p className="text-green-500 text-center">You have donated ${paymentSuccessfull} successfully</p>}
            <div className="text-center" id="payment-field">
                <button className="bg-[#39A7FF] w-1/6 flex gap-12 items-center" type="submit" disabled={!stripe || !clientSecret}>
                    <span>Pay</span>
                    {loadingPayment && <span className="loading loading-spinner loading-xs ml-3 mt-1"></span>}
                </button>
            </div>
        </form>
    );
};

export default CheckOutForm;