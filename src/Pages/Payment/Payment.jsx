import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./checkOutForm";


const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

    return (
        <div className="flex flex-col py-20 justify-center px-3 md:px-20 lg:px-28 payment">
            <h2 className="text-center uppercase text-3xl font-medium">make your payment</h2>
            <Elements stripe={stripePromise}>
                <CheckOutForm />
            </Elements>
        </div>
    );
};

export default Payment