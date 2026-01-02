import VideosData from "../components/VideosData";
import SideNav from "../components/SideNav";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="home flex gap-3">
      <Link to={`ChannelDetail/${12}`}></Link>
      <SideNav />
      <VideosData />
    </div>
  );
};

export default Home;
