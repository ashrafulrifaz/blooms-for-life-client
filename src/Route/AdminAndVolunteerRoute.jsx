import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import { Navigate } from "react-router-dom";
import useAdminOrVolunteer from "../Hooks/useAdminOrVolunteer";


const AdminOrVolunteerRoute = ({children}) => {
    const {user, loading, LogOutUser} = useContext(AuthContext)
    const {isAdminOrVolunteer, isAdminOrVolunteerPending} = useAdminOrVolunteer()
    console.log(isAdminOrVolunteer);

    if(loading || isAdminOrVolunteerPending) {
        return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>
    }

    if(user && isAdminOrVolunteer){
        return children
    } else {
        LogOutUser()
        return <Navigate to="/login"></Navigate>
    }
};

export default AdminOrVolunteerRoute;