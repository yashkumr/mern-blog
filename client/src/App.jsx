import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Projects from "./pages/Projects.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Header from "./components/Header.jsx";
import { Toaster } from "react-hot-toast";
import MainFooter from "./components/Footer.jsx";
import PrivateRoute from "./components/Routes/Private.jsx";
import AdminRoute from "./components/Routes/AdminRoute.jsx"

import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";


function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>

        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="user" element={<UserDashboard/>} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <MainFooter />
    </>
  );
}

export default App;
