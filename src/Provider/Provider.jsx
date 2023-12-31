import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import axios from "axios";

export const AuthContext = createContext(null)

const Provider = ({children}) => {
    const auth = getAuth(app)
    const [user, setUser] = useState(null)
    const [districts, setDistrict] = useState([])
    const [upazilas, setUpazilas] = useState([])
    const [loading, setLoading] = useState(true)
    const [fundingInfo, setFundingInfo] = useState(null)
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        axios.get('https://blood-donation-server-side.vercel.app/districts')
        .then(res => setDistrict(res.data))

        axios.get(`https://blood-donation-server-side.vercel.app/upazilas`)
        .then(res => setUpazilas(res.data))


        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)         
            setLoading(false)
            if(currentUser){
                const userInfo = {email: currentUser?.email}
                axiosPublic.post('/jwt', userInfo, {withCredentials: true})
                .then(res => {
                    console.log(res.data);
                })
            } else {     
                const userInfo = {email: user?.email}
                axiosPublic.post('/logout', userInfo, {withCredentials: true})
                .then(res => {
                    console.log(res.data);
                })
            }
        })

        return () => {
           unsubscribe()
        }
    }, [auth, axiosPublic, user])

    const RegisterUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const LoginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const LogOutUser = () => {
        return signOut(auth)
    }

    const info = {
        user, setUser, RegisterUser, LoginUser, LogOutUser, loading, auth, districts, upazilas, fundingInfo, setFundingInfo
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default Provider;