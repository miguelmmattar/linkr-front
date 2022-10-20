import GlobalStyle from "../styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import Header from "./Header.js";
import SignIn from "./SinIn.js";
import Timeline from "./Timeline.js";

export default function App() {
    return (
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    );
}

function Root() {
    const [user, setUser] = useState({});
  
    return (
      <UserContext.Provider
        value={{
          user,
          setUser
        }}
      >
        <>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/timeline" element={<Timeline />} />
            
          </Routes>
        </>
      </UserContext.Provider>
    );
  }
