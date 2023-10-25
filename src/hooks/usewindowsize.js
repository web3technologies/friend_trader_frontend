import { useState, useEffect } from 'react';

// Define a custom hook to handle window size
function useWindowSize() {
  // Initialize state with undefined width and height
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  // Use useEffect to handle the resize event
  useEffect(() => {
    // Define a handler function
    function handleResize() {
      // Update the state with the new window size
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add the event listener
    window.addEventListener('resize', handleResize);

    // Call the handler once to get the initial size
    handleResize();

    // Remove the event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  // Return the current window size
  return windowSize;
}

export default useWindowSize