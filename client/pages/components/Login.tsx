import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const Login: React.FC = () => {
  const [user, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {push} = useRouter()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trim the user and password values and assign them back
    const trimmedUser = user.trim();
    const trimmedPassword = password.trim();
    setUsername("");
    setPassword("");
  
    try {
      const response = await fetch('http://127.0.0.1:9999/response_to_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: trimmedUser, password: trimmedPassword }),
      });
  
      console.log('Response status:', response.status);
      const responseBody = await response.text();
      console.log('Response body:', responseBody);
  
      if (response.ok) {
        // Handle successful login
        console.log('Login successful');
        push("/FrontPage")
      } else {
        // Handle login failure
        console.error('Login failed');
        console.log("user and password", trimmedUser, trimmedPassword);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
  };
 

  return (
    <div className="flex min-h-screeen min-w-screen text-white">
      <div className="m-auto p-8 rounded-lg bg-white text-black shadow-black shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Uber Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded"
              value={user}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-black text-white rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
