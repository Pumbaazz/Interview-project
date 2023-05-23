import Logo from "../assets/images/logo.svg";
import burger from "../assets/images/icon-menu.svg";
import closeNav from "../assets/images/icon-menu-close.svg";
import { React, useState } from "react";

export const Header = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <header className="my-8 flex justify-between lg:mb-12 relative">
            <img src={Logo} alt="Logo" />
            <button className="md:hidden z-50 pr-2"
                onClick={() => {
                    setIsExpanded(!isExpanded);
                }}>
                <img src={isExpanded ? closeNav : burger} alt="Burger open nav" />
            </button>
            <nav className={`${isExpanded ? 'dim-bg' : 'hidden'}
             dropdown md:no-dropdown md:flex items-center`}>
                <ul className="flex flex-col text-xl md:flex-row md:text-base gap-6 mt-[20vh] md:mt-0">
                    <li className="pl-8 py-2 font-medium text-gunMentalColor hover:text-lightVermillionColor focus:text-lightVermillionColor cursor-pointer">
                        Home
                    </li>
                    <li className="pl-8 py-2 font-medium text-gunMentalColor hover:text-lightVermillionColor focus:text-lightVermillionColor cursor-pointer">
                        New
                    </li>
                    <li className="pl-8 py-2 font-medium text-gunMentalColor hover:text-lightVermillionColor focus:text-lightVermillionColor cursor-pointer">
                        Popular
                    </li>
                    <li className="pl-8 py-2 font-medium text-gunMentalColor hover:text-lightVermillionColor focus:text-lightVermillionColor cursor-pointer">
                        Trending
                    </li>
                    <li className="pl-8 py-2 font-medium text-gunMentalColor hover:text-lightVermillionColor focus:text-lightVermillionColor cursor-pointer">
                        Categories
                    </li>
                </ul>
            </nav>
        </header>
    );
};
