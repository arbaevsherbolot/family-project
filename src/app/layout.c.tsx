import Header from "../components/header/Header.component";
import Footer from "../components/footer/Footer.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface props {
  children: React.ReactNode;
  session: string;
}

export default function RootLayoutClient({ children, session }: props) {
  return (
    <>
      <Header session={session} />

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
