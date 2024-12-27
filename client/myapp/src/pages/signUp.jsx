import { useState } from 'react';

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: 'ali',
    username: 'ali',
    email: 'ali@gmail.com',
    password: '1234',
    confirmPassword: '1234',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for matching passwords
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Prepare form data to send
    const dataToSend = {
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      // Send the form data to PHP via POST request
      const response = await fetch('http://localhost/reactphp/server/signUpApi.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend), // Send form data as JSON
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);  // Success message from PHP
       
      } else {
        setError(result.message);  // Error message from PHP
      }
    } catch (error) {
      console.error('Error:', error);
      setError('There was an error with the submission');
    }
  };

  return (
    <fieldset className="w-1/2 m-auto mt-10">
      <legend className="text-2xl mb-3 font-bold">Sign Up</legend>
      <form className="flex flex-col gap-5 text-lg" onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            className="p-2 outline-none bg-slate-200 rounded-md w-full"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-semibold">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="p-2 outline-none bg-slate-200 rounded-md w-full"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="p-2 outline-none bg-slate-200 rounded-md w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="p-2 outline-none bg-slate-200 rounded-md w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="p-2 outline-none bg-slate-200 rounded-md w-full"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="bg-pink-500 text-white font-bold rounded-md p-3 mt-4">
          Sign Up
        </button>
      </form>
    </fieldset>
  );
}

export default SignUp;
