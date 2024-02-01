import React from "react";
import {
  Avatar,
  Button,
  Navbar,
  TextInput,
  List,
  Dropdown,
} from "flowbite-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useAuth } from "../context/Auth.jsx";
import toast from "react-hot-toast";

const Header = () => {
  const path = useLocation().pathname;
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <Navbar classname="border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span
            className="px-2 py-1 bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 rounded-lg text-white"
          >
            Vimlesh's blog
          </span>
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />
        </form>
        
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>

        <div className="flex gap-2 md:order-2">
          <Button className="w-12  h-10 hidden sm:inline  " color="gray" pill>
            <FaMoon />
          </Button>
          {!auth?.user ? (
            <>
              <Link to="/sign-in">
                <Button gradientDuoTone="purpleToBlue" outline>
                  SignIn
                </Button>
              </Link>
            </>
          ) : (
            
            <>
             <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={auth?.user?.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{auth?.user?.name}</span>
              <Dropdown.Divider />
              <span className='block text-sm font-medium truncate'>
              {auth?.user?.email}
              </span>
            </Dropdown.Header>
            <Link  to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}>
              <Dropdown.Item>Dashboard</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item  onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
              
            </>
          )}

          <Navbar.Toggle />
        </div>
        {/* navbar */}
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>

          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
