import useUserData from "../../../Hooks/useUserData";
import AdminHome from "../AdminDashboard/AdminHome/AdminHome";
import UserHomePage from "../UserDashboard/HomePage/UserHomePage";

const DashboardHome = () => {
    const {userRole, isPending} = useUserData()

    if (isPending) {
        return <span className="loading loading-spinner loading-sm"></span>
    }

    return (
        <div>
            {
                userRole !== 'donor' ? <AdminHome></AdminHome> : <UserHomePage></UserHomePage>
            }
        </div>
    );
};

export default DashboardHome;