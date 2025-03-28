import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useAllPostData from "./utils/useAllPostData";
import { useNavigate } from "react-router-dom";
import Loader from "./GlobalLoader";

const Home = () => {
  const navigate = useNavigate();
  const allPostData = useAllPostData();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (allPostData) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [allPostData]);

  const slides = [];

  const handleCardClick = (project_id) => {
    // console.log("I got clicked.");
    // console.log(project_id);
    navigate(`/all-posts/${project_id}`);
  };

  if (allPostData?.length > 1) {
    for (let i = 0; i < 3; i++) {
      slides.push(allPostData[i]);
    }
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  
   // NOTE: {slides?.length} is 0 for the very first time. And division by "0" is undefined. So there only the code breaks!!...
  // ... After the given time delay (3sec), when the timer function runs, then it encountered this ((prev + 1) % slides?.length) which was an invalid operation as division by 0 is undefined. Hence the error!
  // Ok, means as useEffect used stale value of "slides" (0), so, after 1 second time interval, when the division process ran,
  // it set the "currentSlides" to "NaN" and hence slides[undefined] resulted to null.

  const [toFro, setToFro] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(timer);
  }, [toFro]);

  const nextSlide = () => {
    setToFro((prev) => prev+1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setToFro((prev) => prev-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  };

  return (
    <div className="">
      <div
        className={
          isLoading
            ? "h-[80vh] w-screen flex justify-center items-center"
            : "hidden"
        }
      >
        <Loader />
      </div>
      <div
        className={isLoading ? "hidden" : "flex justify-center w-full h-[80vh]"}
      >
        <div className="relative w-full overflow-hidden rounded-md min-h-[80vh]">
          {/* Image Slider */}
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide]?.posterUrl}
              alt="Home"
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center p-4 sm:p-5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-blue-100 bg-blue-600/80 rounded-full">
                  Featured
                </span>
                <div
                  className="overflow-y-scroll h-[350px] md:h-[450px] custom-scrollbar"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                    {slides[currentSlide]?.title}
                  </h1>
                  <p className="text-xl text-blue-100 mb-4">
                    {slides[currentSlide]?.description}
                  </p>
                  <p className="text-lg text-gray-200 mb-8 line-clamp-3 sm:line-clamp-none">
                    {slides[currentSlide]?.summary}
                  </p>
                </div>
                <button
                  onClick={() => handleCardClick(slides[currentSlide]?._id)}
                  className="px-6 py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition ${
                  currentSlide === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;