import { createContext } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase.config";

export const AuthContext = createContext(null)

const Provider = ({children}) => {
    const auth = getAuth(app)

    const RegisterUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const LoginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const info = {
        RegisterUser, LoginUser
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default Provider;