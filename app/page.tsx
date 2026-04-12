import "../components/styles/home.css";
import HeroCarousel from "../components/home/HeroCarousel";
import Collection from "../components/home/Collection";
import TrendingJewellerys from "../components/home/TrendingJewellerys";
import Categories from "../components/home/Categories";
import ImageCard from "../components/common/ImageCard";
import TitleSection from "../components/common/TitleSection";
import TanishqWorld from "../components/home/TanishqWorld";
import NewArrival from "../components/home/NewArrival";

const Home = () => {
  return (
    <>
      <HeroCarousel />
      <Collection />
      <Categories />
      <TrendingJewellerys />
      <TanishqWorld />
      <NewArrival />
    </>
  );
};

export default Home;
