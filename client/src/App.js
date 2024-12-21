import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './scenes/homePage';
import ProfilePage from 'scenes/profilePage';
import LoginPage from 'scenes/loginPage';

function App() {
  const mode = use

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
