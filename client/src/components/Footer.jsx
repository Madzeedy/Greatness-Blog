import {
  Footer,
  FooterLinkGroup,
  FooterLink,
  FooterTitle,
} from "flowbite-react";
import { Link } from "react-router-dom";

export default function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-teal-500 !bg-inherit">
      <div className="">
        <div className="w-full text-center  mb-4 ">
          <div className="">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl dark:text-black font-semibold"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                GreatNess
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm: mt-4 sm:grid-cols-3sm:gap-6 ">
            <FooterTitle
              className="dark:text-black font-semibold"
              title="About"
            />
            <FooterLinkGroup col>
              <FooterLink
                className="dark:text-black"
                href="https://www.100jsprojects.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                100 JS Projects
              </FooterLink>
            </FooterLinkGroup>
          </div>
        </div>
      </div>
    </Footer>
  );
}
