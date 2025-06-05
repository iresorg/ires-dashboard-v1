import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/features/auth/store/AuthContext';
import { router } from '@/shared/routes';
import '@/shared/global.css';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
