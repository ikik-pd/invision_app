import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail/Detail";
import Mypage from "../pages/Mypage";
import Post from "../pages/Post/Post";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showdetail/:id" element={<Detail />} />
        <Route path="/post" element={<Post />} />
        <Route path="/mypage/:id" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
