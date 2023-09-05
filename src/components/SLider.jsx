import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const images = [
  {
    title: "Smartphones",
    description:
      "Discover cutting-edge smartphones with the latest features and technology, from flagship models to budget-friendly options, ensuring you stay connected and entertained on the go",
    image: "/ip14.jpg",
  },
  {
    title: "Laptops",
    description:
      "Elevate your productivity and entertainment with our selection of laptops, catering to professionals and tech enthusiasts alike, featuring powerful performance and sleek designs.",
    image: "/acer.jpg",
  },
  {
    title: "Cameras",
    description:
      "Capture life's precious moments with our range of digital cameras and accessories, designed to unleash your creativity and preserve memories in stunning detail.",
    image: "/camera.jpg",
  },
  {
    title: "Footwear",
    description:
      "Step up your style game with our diverse collection of footwear, offering comfort, fashion-forward designs, and durability to complement every occasion and outfit.",
    image: "/naj.jpg",
  },
];

const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      className="w-[97vw] mx-auto h-[90vh] px-6"
    >
      {images.map((category, index) => (
        <SwiperSlide key={index}>
          <div className="flex items-center h-full">
            <div className="w-2/3 sm:w-1/2 lg:w-2/5 mx-auto">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="w-2/3 sm:w-1/2 lg:w-3/5 p-4 text-center">
              <h2 className="text-3xl font-semibold">{category.title}</h2>
              <p className="mt-2 text-gray-600">{category.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
