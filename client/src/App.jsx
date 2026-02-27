import { RouterProvider } from 'react-router-dom';
import { appRouter } from './routes';

import './App.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <RouterProvider router={appRouter} />
      </div>
    </AuthProvider>
  )
};

export default App;