import React from 'react'
import UsuallyTravels from './UsuallyTravels'

interface StartTravel {
  setStartTravel: React.Dispatch<React.SetStateAction<boolean>>;
}


const  TravelComponet : React.FC<StartTravel> = ({setStartTravel}) => {
  return (
  <div className='relative min-h-screen min-w-screen flex flex-col gap-10 justify-center items-center'>
  <div className='h-[400px] w-[400px] rounded-md bg-white text-black flex flex-col justify-center items-center gap-20 overflow-y-auto shadow-2xl'>
    <h2 className='text-4xl font-bold mt-[140px]'>Choose your travel</h2>
    <div className='flex flex-col justify-center items-center gap-4 hover:cursor-pointer'>

      <UsuallyTravels
        carImage='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1569015390/assets/fa/0e26a9-9d9d-4190-ad6d-a879ccef4266/original/Select.png'
        nameTravel='Job'
        setStartTravel={setStartTravel}
      />
      <UsuallyTravels
        carImage='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1569015390/assets/fa/0e26a9-9d9d-4190-ad6d-a879ccef4266/original/Select.png'
        nameTravel='Bar'
        setStartTravel={setStartTravel}

      />
      <UsuallyTravels
        nameTravel='Family'
        carImage='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1569015390/assets/fa/0e26a9-9d9d-4190-ad6d-a879ccef4266/original/Select.png'
        setStartTravel={setStartTravel}    
     />
       <UsuallyTravels
        nameTravel='Family'
        carImage='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1569015390/assets/fa/0e26a9-9d9d-4190-ad6d-a879ccef4266/original/Select.png'
        setStartTravel={setStartTravel}      
      />
       <UsuallyTravels
        nameTravel='Family'
        carImage='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1569015390/assets/fa/0e26a9-9d9d-4190-ad6d-a879ccef4266/original/Select.png'
        setStartTravel={setStartTravel}
      />


    </div>
  </div>
  </div>
  )
}

export default TravelComponet