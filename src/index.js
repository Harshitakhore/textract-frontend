import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';

// Replace ReactDOM.render with createRoot
const root = createRoot(document.getElementById('root'));

// Render your app within the root
root.render(<App />);
