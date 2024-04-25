import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import { useCallback, useState, useEffect } from "react";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET=66
const Navbar = () => {
    const [mobilemenu, setmobilemenu] = useState(false);
    const [accountmenu, setaccountmenu] = useState(false);
    const [showbackground, setshowbackground] = useState(false);
    const togglemobilemenu = useCallback(
        () => {
            setmobilemenu((current) => !current)
        },
        [],
    );
    const toggleaccountmenu = useCallback(
        () => {
            setaccountmenu((current) => !current)
        },
        [],
    );
    useEffect(() => {
      const handlescroll = () => {
        if (window.scrollY >= TOP_OFFSET) {
            setshowbackground(true);
        }else{
            setshowbackground(false);
        }
      };
      window.addEventListener('scroll', handlescroll)
      return () =>{
        window.removeEventListener('scroll',handlescroll)
      }
    }, []);
    return (
        <nav className="w-full z-40 fixed">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duraiton-500 ${showbackground?'bg-zinc-900 bg-opacity-90': ' '}`}>
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="" />
                <div className="flex ml-8 gap-7 hidden lg:flex ">
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="Browse by Language" />
                </div>
                <div onClick={togglemobilemenu} className="flex flex-row items-center gap-2 ml-8 lg:hidden cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${mobilemenu?'rotate-180':'rotate-0'}`} />
                    <MobileMenu visible = {mobilemenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch/>
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell/>
                    </div>
                    <div onClick={toggleaccountmenu} className="flex flex-row gap-2 cursor-pointer items-center relative">
                        <div className="w-5 h-5 overflow-hidden lg:w-9 lg:h-9 rounded-md">
                            <img src="/images/default-blue.png" alt="" />
                        </div>
                        <BsChevronDown className={`text-white transition ${accountmenu?'rotate-180':'rotate-0'}`} />
                        <AccountMenu visible={accountmenu}/>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;