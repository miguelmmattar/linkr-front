import GlobalStyle from "../styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import Header from "./Header.js";
import SignIn from "./SignInPage.js";
import Timeline from "./Timeline.js";
import SignUp from "./SignUpPage.js";
import UserPage from "./UserPage.js";
import HashtagPage from "../components/HashtagPage.js";

export default function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

function Root() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
        </Routes>
      </>
    </UserContext.Provider>
  );
}
