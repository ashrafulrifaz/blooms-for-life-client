// import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import UserDonationCard from "./UserDonationCard";

const UserHomePage = () => {
    const {user} = useAuth()
    // const { isPending, error, data } = useQuery({
    //     queryKey: ['repoData'],
    //     queryFn: () =>
    //       fetch('https://api.github.com/repos/TanStack/query').then(
    //         (res) => res.json(),
    //       ),
    // })

    return (
        <div>
            <h1 className="capitalize text-2xl font-second">Welcome {user?.displayName}. Thank you for joining BloomsForLife</h1>
            <div className="mt-8 bg-white rounded-xl px-10 py-5">
                <h3 className="text-lg">Your recent donation</h3>
                <div className="overflow-x-auto mt-8">
                    <table className="table">
                        <thead className="bg-[#D1A054] text-white uppercase">
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>email</th>
                                <th>role</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                users && users.map((item, idx) => <UserDonationCard key={idx} item={item} id={idx} refetch={refetch}></UserDonationCard>)
                            } */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserHomePage;