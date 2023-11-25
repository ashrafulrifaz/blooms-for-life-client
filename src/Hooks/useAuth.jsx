import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";

const useAuth = () => {
    const {user} = useContext(AuthContext)
    
    return {user}
};

export default useAuth;