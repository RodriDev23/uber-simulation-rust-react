import React, { useState } from 'react';
import RandomCreditCards from './RandomCreditCards';
import axios from 'axios';

interface CreditCardProps {
  img: string;
}

const CreditCard: React.FC<CreditCardProps> = ({ img }) => {
  const [cardPassed, setCardPassed] = useState<boolean | null>(null);
  const paymentTravel = Math.floor(Math.random() * 500);

  const sendCard = async () => {
    const apiUrl = 'http://127.0.0.1:9999/credit-card';
    const randomIndex = Math.floor(Math.random() * RandomCreditCards.length);
    const randomCreditCard = RandomCreditCards[randomIndex];
    const creditCardNumber = randomCreditCard.number.replace(/\s/g, '');
    const creditCardData = {
      credit_card: parseInt(creditCardNumber, 10), // Convert to integer
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creditCardData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Card accepted:', responseData);
        setCardPassed(true);
      } else {
        const errorData = await response.text();
        console.log('Card not accepted:', errorData);
        setCardPassed(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setCardPassed(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-10 w-[500px] h-[500px] relative">
      <div className="w-[60%] h-[60%] relative">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
        <div className="w-[50%] h-full mt-1 absolute top-0 right-1 backdrop-blur-sm rounded-md" />
      </div>
      <div className='flex flex-col justify-center items-center gap-10'>
        <button onClick={sendCard} className="text-lg font-semibold hover:cursor-pointer px-7 py-3 bg-black text-white rounded-xl">Pay with this card</button>
        {
          cardPassed === null ? null :
          cardPassed ? 
          <p className='text-green-400 text-left text-xl'>Card Passed! please check your email!</p>
          : <p className='text-green-400 text-center text-3xl font-bold '>Card Passed! please check your email!</p>
        }
      </div>   
    </div>
  );
};

export default CreditCard;
