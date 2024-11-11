import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import image from '../assets/computerCard.png';
import image2 from '../assets/network.png';
import image3 from '../assets/printerimage.png';

export default function NewTest() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with desired duration
  }, []);

  return (
    <div className='grid md:grid-cols-3 gap-4'>
      <div className='p-1 rounded-xl overflow-hidden' data-aos="fade-up">
        <img src={image} alt="" className='w-full rounded-xl hover:scale-105 transition-transform duration-300' />
      </div>
      <div className='p-1 rounded-xl overflow-hidden' data-aos="fade-up">
        <img src={image2} alt="" className='w-full rounded-xl hover:scale-105 transition-transform duration-300' />
      </div>
      <div className='p-1 rounded-xl overflow-hidden' data-aos="fade-up">
        <img src={image3} alt="" className='w-full rounded-xl hover:scale-105 transition-transform duration-300' />
      </div>
    </div>
  );
}
