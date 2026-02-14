import {
  Button,
  Navbar,
  Dropdown,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
  Avatar,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";
//import { toggleTheme } from "../../redux/theme/themeSlice";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  //const dispatch = useDispatch();
  return (
    <Navbar className="border border-blue-500 border-b-5  !bg-inherit sticky top-0 z-50">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl dark:text-black font-semibold"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          GreatNess
        </span>
        Blog
      </Link>
      <form className="relative hidden lg:inline">
        <input
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="border dark:bg-gray-100 text-black dark:text-black px-4 py-2 rounded "
        />

        {/*<TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />*/}

        <AiOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer" />
      </form>

      <Button className="w-14 h-10 lg:hidden " color="black" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2 ">
        {/*<Button
          className="w-12 h-10 hidden sm:inline !bg-inherit"
          color="black"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          <FaMoon />
        </Button> */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </DropdownHeader>
            <Link to={"/dashboard?tab=profile"}>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem>Sign Out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button
              outline
              //gradientDuoTone="purpleToBlue"
              //className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800 "
            >
              Sign In
            </Button>
          </Link>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink active={path === "/"} as={"div"}>
          <Link to="/" className="hover:text-blue-700 dark:text-gray-700">
            Home
          </Link>
        </NavbarLink>
        <NavbarLink active={path === "/about"} as={"div"}>
          <Link to="/about" className="hover:text-blue-700 dark:text-gray-700">
            About
          </Link>
        </NavbarLink>
        <NavbarLink active={path === "/projects"} as={"div"}>
          <Link
            to="/projects"
            className="hover:text-blue-700 dark:text-gray-700"
          >
            Projects
          </Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
