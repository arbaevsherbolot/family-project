import Header from "../components/layout/header/Header.component";
import Footer from "../components/layout/footer/Footer.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface props {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: props) {
  return (
    <>
      <Header />

      <main
        style={{
          width: "100%",
          minHeight: "100%",
          flex: "1 1 auto",
        }}>
        {children}
        <ToastContainer />
      </main>

      <Footer />
    </>
  );
}
