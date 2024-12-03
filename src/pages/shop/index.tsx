import { AppBar, GNB } from "../../components";
import Carousel from "../../components/carousel/Carousel";
import Temp from "../../assets/images/temp.png";
import ShopOverview from "./components/ShopOverview";
import ShopNav from "./components/ShopNav";
import ShopDetail from "./components/ShopDetail";
import { GNBLayout } from "../../components/layout/GNBLayout";
import ShopReview from "./components/ShopReview";
export default function Shop() {
  const images = [Temp, Temp, Temp];
  return (
    <>
      <AppBar prefix="backButton" />
      <Carousel images={images} height={300} rounded={false} />
      <ShopOverview />
      <ShopNav />
      <ShopDetail />
      <ShopReview />
    </>
  );
}
