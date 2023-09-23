import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat: React.FC = () => {
  const [listMessages, setListMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() !== '') {
      try {
        const response = await axios.post('http://127.0.0.1:9999/send-message-user', {
          message: message,
        });
        console.log('Response status:', response.status);
        if (response.status === 200) {
          console.log('Message sent successfully');
          setMessage('');
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:9999/distribution-message');
        if (response.status === 200) {
          const msg = response.data;
          setListMessages(([msg]));
          setMessage('')
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const intervalId = setInterval(fetchMessages, 6000);

    return () => {
      clearInterval(intervalId);
      setMessage("")
    };
  }, []);

  return (
    <div className='relative flex flex-col justify-center items-center gap-5'>
      <div className='h-[300px] w-[300px] flex flex-col justify-center items-center bg-white text-black'>
        {listMessages.map((msg, index) => (
          <p className='text-black text-2xl flex flex-col' key={index}>
            {msg}
          </p>
        ))}
        <form onSubmit={handleSubmit} className='flex gap-3 justify-center items-center mt-[250px]'>
          <input
            type='text'
            value={message}
            onChange={handleChange}
            className='border border-black'
          />
          <button className='px-5 py-3 rounded-lg bg-black text-white' type='submit'>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
