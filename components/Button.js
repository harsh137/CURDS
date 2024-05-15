import { useState } from "react";

export default function Button({ onClick, children, className , loading }) {
  const [isLoading, setIsLoading] = useState(false);  
  // const handleClick = async (event) => {
  //   setIsLoading(true); // Set loading state to true when button is clicked
  //   await onClick(event); // Call the onClick function passed as props
  //   setIsLoading(false); // Set loading state back to false after onClick function execution
  // };
    return (

      
      <button
        onClick={onClick}
        className={`px-4 py-2 ${loading?'bg-gray-200' :'bg-blue-500'} text-white rounded ${className}`}
        disabled={ loading}
      >
        {children}
      </button>
    );
  }