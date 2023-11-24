import Banner from "../../Components/HomeComponents/Banner/Banner";
import Contact from "../../Components/HomeComponents/Contact/Contact";
import Featured from "../../Components/HomeComponents/Featued/Featured";

const Home = () => {

    return (
        <div id="home">
            <Banner></Banner>
            <Featured></Featured>
            <Contact></Contact>
        </div>
    );
};

export default Home;