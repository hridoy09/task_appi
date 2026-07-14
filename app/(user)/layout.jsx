"use client";

import { useState } from "react";

import Navbar from "@/components/layout/navbar";
import MobileMenu from "@/components/layout/mobileMenu";
import MobileMenuHeader from "@/components/layout/mobileMenuHeader";
import NavigationBottom from "@/components/layout/navigationBottom";
import LeftSide from "@/components/feed/LeftSide";
import RightSide from "@/components/feed/RightSide";
import DarkLightToggle from "@/components/layout/DarkLightToggle";

const FeedLayout = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <div className={`_layout _layout_main_wrapper${isDarkMode ? " _dark_wrapper" : ""}`}>

            <DarkLightToggle setIsDarkMode={setIsDarkMode} />

            <div className="_main_layout">
                <Navbar />
                <MobileMenu />
                <MobileMenuHeader />
                <NavigationBottom />

                <div className="container _custom_container">
                    <div className="_layout_inner_wrap">
                        <div className="row">
                            <LeftSide />
                            {children}
                            <RightSide />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedLayout
