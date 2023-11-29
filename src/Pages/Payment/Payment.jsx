import { useContext } from "react";
import { AuthContext } from "../../Provider/Provider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./checkOutForm";


const Payment = () => {
    const {fundingInfo} = useContext(AuthContext)
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

    return (
        <div className="flex flex-col py-20 justify-center px-28">
            <h2 className="text-center uppercase text-3xl font-medium">make your payment</h2>
            <Elements stripe={stripePromise}>
                <CheckOutForm />
            </Elements>
        </div>
    );
};

export default Payment