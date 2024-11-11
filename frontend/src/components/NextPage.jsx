import React from 'react'

export default function NextPage() {
  return (
    <>
      <h1 className='text-2xl uppercase font-bold underline mt-10 text-center text-white'>Booking Details</h1>
      <div className='w-full flex gap-5 px-20 mt-5'>
        <div className='w-[70%] flex gap-5'>
            <div className='w-full h-auto bg-white p-5 rounded-md '><span className='text-white text-xl bg-green-500 px-4  py-2 rounded-full'>1</span><span className='text-xl bg-white ml-2 font-semibold'>Route Details</span></div>
            <div className='w-full h-auto bg-white p-5 rounded-md '><span className='text-white text-xl bg-green-500 px-4  py-2 rounded-full'>2</span><span className='text-xl bg-white ml-2 font-semibold'>Passenger Details</span></div>
            <div className='w-full h-auto bg-white p-5 rounded-md '><span className='text-white text-xl bg-green-500 px-4  py-2 rounded-full'>3</span><span className='text-xl bg-white ml-2 font-semibold'>
            Additional Details</span></div>            
        </div>
        <div className='w-[25%]'>hello</div>
      </div>
    </>
  )
}
