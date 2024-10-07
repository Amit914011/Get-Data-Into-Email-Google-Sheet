import React from 'react';
import { BiPhoneCall } from "react-icons/bi";

export default function Test() {
  return (
    <div className='w-full h-auto'>
      <div className='w-full md:w-[80%] h-auto md:h-[250px] border m-auto rounded-lg flex flex-col md:flex-row' 
           style={{
              backgroundImage: "url('https://dummy-tickets.com/public/theme/front/assets/images/call-to-pric-bg-1.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: 'cover',
              backgroundPosition: "center"
           }}>
        <div className='flex flex-col justify-center p-5 md:p-10'>
          <h1 className='text-xl md:text-4xl font-bold text-white pt-5 md:pt-16'>Get Your Flight Reservation Today</h1>
          <div className='flex items-center mt-4'>
            <BiPhoneCall className='w-12 h-12 bg-white text-[#31B57B] p-3 rounded-full'/>
            <div className='pl-4'>
              <p className='text-white text-lg font-bold'>Get In Touch</p>
              <p className='text-white'>Email: info@dummy-tickets.com & Phone: +917700006525</p>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:justify-end pt-5 md:pt-0 md:ml-52'>
          <img src="https://dummy-tickets.com/public/theme/front/assets/images/person-selling-dummy-ticket.webp" alt="Person" className='w-32 md:w-48'/>
        </div>
      </div>
    </div>
  );
}
