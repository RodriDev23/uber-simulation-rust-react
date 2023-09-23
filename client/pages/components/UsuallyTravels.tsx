import React from 'react';
interface UsuallyTravelsProps {
  carImage: string;
  nameTravel: string;
  setStartTravel: React.Dispatch<React.SetStateAction<boolean>>;
}



const UsuallyTravels: React.FC<UsuallyTravelsProps> = ({ carImage, nameTravel, setStartTravel }) => {

  const handletravel = () => {
    setStartTravel(true)
   }

  return (
    <div 
    className='flex justify-between items-center gap-40 hover:cursor-pointer'>
      <img src={carImage} alt={nameTravel} className='w-20 m-3' />
      <div className='flex gap-4'>
      <p className=' text-lg text-black font-bold'>{nameTravel}</p>
      <button onClick={handletravel}>start travel</button>
    </div>
    </div>
  );
}

export default UsuallyTravels;
