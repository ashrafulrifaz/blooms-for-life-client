import totalUser from '../../../../assets/users-alt.png'
import totalRequest from '../../../../assets/user-add.png'
import totalFunding from '../../../../assets/box-dollar.png'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure()
    const { data } = useQuery({
        queryKey: ['statistics'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/statistics`)
            return res.data
        }
    })

    return (
        <div>
            <h2 className="font-second text-2xl">Statistics</h2>
            <div className="py-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="bg-white p-5 rounded-lg drop-shadow-md text-center hover:drop-shadow-xl transition-all">
                        <img src={totalUser} className="w-10 mx-auto text-4xl"/>
                        <h3 className="text-5xl mt-4 mb-2">{data?.totalUser}</h3>
                        <h4>Total User</h4>
                    </div>
                    <div className="bg-white p-5 rounded-lg drop-shadow-md text-center hover:drop-shadow-xl transition-all">
                        <img src={totalRequest} className="w-10 mx-auto text-4xl"/>
                        <h3 className="text-5xl mt-4 mb-2">{100}</h3>
                        <h4>Total Funding</h4>
                    </div>
                    <div className="bg-white p-5 rounded-lg drop-shadow-md text-center hover:drop-shadow-xl transition-all">
                        <img src={totalFunding} className="w-10 mx-auto text-4xl"/>
                        <h3 className="text-5xl mt-4 mb-2">{data?.totalRequest}</h3>
                        <h4>Total Blood Donation Request</h4>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default AdminHome;