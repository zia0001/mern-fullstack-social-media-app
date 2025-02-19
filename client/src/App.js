import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './scenes/homePage';
import ProfilePage from 'scenes/profilePage';
import LoginPage from 'scenes/loginPage';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import MyPostWidget from 'scenes/Widgets/MyPostWidget';


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/userId" element={<ProfilePage />} />
            <Route path="/create-post" element={<MyPostWidget />} />


          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
