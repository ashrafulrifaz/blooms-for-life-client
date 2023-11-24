import image1 from '../../../assets/hands-heart.png'
import image2 from '../../../assets/hand-holding-medical.png'
import image3 from '../../../assets/users-medical.png'

const Featured = () => {
    return (
        <div className="py-10">
            <h2 className="text-4xl">Be a Lifesaver - Donate Blood Today!</h2>
            <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="p-6 space-y-2">
                    <img src={image1} className='w-8' alt="" />
                    <h3 className="font-second text-xl">Blood Save Life</h3>
                    <p className="font-medium text-slate-600">The primary and most significant benefit of donating blood is that it saves lives. Blood transfusions are crucial in various medical treatments, surgeries, and emergencies.</p>
                </div>
                <div className="p-6 space-y-2">
                    <img src={image2} className='w-8' alt="" />
                    <h3 className="font-second text-xl">Health Benefits for Donors</h3>
                    <p className="font-medium text-slate-600">Regular blood donation has health benefits for the donors themselves. It helps in reducing the risk of certain illnesses and conditions.</p>
                </div>
                <div className="p-6 space-y-2">
                    <img src={image3} className='w-8' alt="" />
                    <h3 className="font-second text-xl">Social Responsibility</h3>
                    <p className="font-medium text-slate-600">Blood donation fosters a sense of community and social responsibility. It brings people together for a common cause — to help those in need within the community.</p>
                </div>
            </div>
        </div>
    );
};

export default Featured;