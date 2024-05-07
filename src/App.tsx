import React, { useEffect } from 'react';
import './App.css';
import { Router } from './Routers';
import { Connect } from './connect/Connect';
import { useUserStore } from './store/userStore';
import { useThemesUpdateStore } from './store/themeUpdateStore';

function App() {
  const {signIn} = useUserStore()
  const {themesUpdate, setThemesUpdate} = useThemesUpdateStore()
  function getCookie() {
    const value = document.cookie;
    const parts = value.split(";");
    if (parts.length == 1) {
        return parts.pop()?.split("=").pop();
    }
  }
  const getRespCookie = async () => {
    const response = await Connect.axiosPostToken(Number(getCookie()))
    signIn({...response.data})
    setThemesUpdate(!themesUpdate)
    //console.log(response)
  }

  useEffect(() => {
    (document.cookie !== '') && getRespCookie()
  },[])
  return (
    <Router />
  );
}

export default App;
