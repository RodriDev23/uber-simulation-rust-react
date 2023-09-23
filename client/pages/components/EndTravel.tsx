import React, { useState, useEffect } from 'react';
import CreditCard from './CreditCards';
import RandomCreditCards from './RandomCreditCards';
import axios from 'axios';

export const EndTravel = () => {
  const paymentTravel = Math.floor(Math.random() * 500);
 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white text-black">
      <div className="w-[600px] h-[600px] shadow-2xl rounded-lg flex flex-col justify-center items-center">
        <h2 className="text-black font-bold text-2xl text-center mt-10">
          Your Travel has ended, your payment is ${paymentTravel}
        </h2>
        <CreditCard img="https://t4.ftcdn.net/jpg/02/13/97/75/360_F_213977586_B23DBDMd1BMTjb405USK26GKBnXTOULQ.jpg" />
        <CreditCard img="https://t4.ftcdn.net/jpg/02/13/97/75/360_F_213977586_B23DBDMd1BMTjb405USK26GKBnXTOULQ.jpg" />
        <CreditCard img="https://t4.ftcdn.net/jpg/02/13/97/75/360_F_213977586_B23DBDMd1BMTjb405USK26GKBnXTOULQ.jpg" />
      </div>
    </div>
  );
};
