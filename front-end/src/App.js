import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Blogs from "./components/Blogs/Blogs";
import CreateBlog from "./components/CreateBlog/CreateBlog";
import Header from "./layout/header/Header";
import NoMatch from "./components/no-match/NoMatch";
import Register from "./layout/register/Register";
import SignIn from "./layout/Sign in/SignIn";
import UserHeader from "./layout/userHeader/UserHeader";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<SignIn />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/user" element={<UserHeader />}>
            <Route index element={< Blogs/>} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="create" element={<CreateBlog />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
