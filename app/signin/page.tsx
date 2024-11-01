'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStationContext } from '../../context/StationContext'; // Import the context

function SignIn() {
  const router = useRouter();
  const { loadStations } = useStationContext();  // Now loadStations is accessible
  
  // Create refs to track the username and password fields
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Error state for login

  // Handle login when the button is clicked
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const enteredEmail = emailRef.current ? emailRef.current.value : '';
    const enteredPassword = passwordRef.current ? passwordRef.current.value : '';

    // Simple check for username and password
    if (enteredEmail === 'guy' && enteredPassword === '123') {
      try {
        setLoading(true); // Start loading
        setError(null);   // Clear previous errors

        // Load stations (wait for the API call to complete)
        await loadStations();

        // Redirect to the dashboard after stations are loaded
        router.push("/dashboard");
      } catch (error) {
        setError(error); // Show an error message if stations can't be loaded
      } finally {
        setLoading(false); // Stop loading after the process is finished
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };
  //Signin box design
  return (
    <div className="bg-base-200 flex items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl rounded-2xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-6">Login</h2>
          {error && <p className="text-red-500">{error}</p>} {/* Display error if there is one */}
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input ref={emailRef} type="text" className="grow" placeholder="Username" />
              </label>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                  <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                </svg>
                <input ref={passwordRef} type="password" className="grow" placeholder="Enter password" />
              </label>
            </div>
            <div className="form-control mt-6">
              {/* Add onClick event to handle login */}
              <button className="btn btn-primary" onClick={handleClick} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'} {/* Show a loading state */}
              </button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="text-center">
            <p>Don&apos;t have an account?</p>
            <a href="#" className="link link-primary">Sign up now</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
