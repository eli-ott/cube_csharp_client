import { FC, ReactNode } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

interface DefaultLayoutProps {
    children:ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
    <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </>
  );
};

export default DefaultLayout;
