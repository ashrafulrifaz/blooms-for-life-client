import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({children}) => {
    const {user, loading, LogOutUser} = useContext(AuthContext)
    const {isAdmin, isAdminPending} = useAdmin()
    console.log(isAdmin);

    if(loading || isAdminPending) {
        return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>
    }

    if(user && isAdmin){
        return children
    } else {
        LogOutUser()
        return <Navigate to="/login"></Navigate>
    }
};

export default AdminRoute;