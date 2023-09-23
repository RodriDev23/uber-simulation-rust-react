import React from 'react'

export const Drive= () => {
  return (
       <div className='relative flex flex-col justify-center items-center gap-5'>
       <div className='bg-white h-[300px] w-[300px] flex flex-col gap-3 shadow-2xl rounded-md justify-center items-center font-bold text-xl text-left'>
        <h2>You Are Driving with Clark!</h2>
        <h3>Driver Information</h3>
        <div>
          <img src="./driver.png" alt="driver" className='w-[100px] rounded-full flex justify-center items-center' />
        </div>
        <p>Name: Clark Kent</p>
        <p>License Plates: ABC 123</p>
        <p>Vehicle: Metropolis Mobile</p>
      </div>
    </div>
  )
}
