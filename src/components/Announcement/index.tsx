import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from "./styles.module.scss";

const slideImages = [
  "images/slider/slider1.webp",
  "images/slider/slider2.webp",
];

export function Announcement() {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
      {slideImages.map((image) => (
        <div>
          <img src={image} />
        </div>
      ))}
    </Carousel>
  );
}
