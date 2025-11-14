import { Star } from 'lucide-react';
import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

const Testimonials = ({
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);
  
  const [start, setStart] = useState(false);

  const items = [
    {
        quote: "qwertyuiop",
        name: "Karandeep Singh",
        title: "AI Engineer",
        img: "/people/karan.png"
    },
    {
        quote: "qwertyuiop",
        name: "Arnav Anand",
        title: "Product Designer",
        img: "/people/arnav.png"
    },
    {
        quote: "qwertyuiop",
        name: "Ekaspreet Singh Atwal",
        title: "System Architect",
        img: '/people/ekas.jpg'
    },
    {
        quote: "qwertyuiop",
        name: "Saurabh Sahu",
        title: "Frontend Engineer",
        img: '/people/saurabh.png'
    }
  ];

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-gray-50 text-center py-20">
      <h2 className="text-4xl font-bold text-charcoal mb-12">Don't listen to us, see what others think</h2>
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 max-w-7xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          className
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-6 py-6 w-max flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-lg max-w-xs transition-transform transform hover:scale-105"
            >
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-5 text-left">
                "Aurea helped me identify my skin condition quickly and accurately. The recommendations were spot-on!"
                { item.quote }
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3">
                  <img className='rounded-full' src={item.img} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-left">{ item.name }</p>
                  <p className="text-sm text-gray-500 text-left">{ item.title }</p>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Testimonials;
