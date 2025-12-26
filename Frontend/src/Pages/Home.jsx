import VideosData from "../components/VideosData";
import SideNav from "../components/SideNav";

const Home = () => {
  
  return (
    <div className="home flex gap-3">
      <SideNav/>
      <VideosData />
    </div>
  );
};

export default Home;
