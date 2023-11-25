import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)

    if(loading) {
        return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>
    }

    if(user){
        return children
    } else {
        return <Navigate to="/login"></Navigate>
    }
};

export default PrivateRoute;