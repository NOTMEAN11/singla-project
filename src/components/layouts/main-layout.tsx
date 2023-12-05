import React, { Children } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
