import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/features/auth/store/AuthContext';
import { router } from '@/shared/routes';
import '@/shared/global.css';
import { ThemeProvider } from '@/shared/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
