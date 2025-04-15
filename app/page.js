import Image from "next/image";
import TranSactionsPage from "./transactions/page";
import Navbar from "./components/Navbar";
import RootLayout from "./layout";
export default function Home() {
  return (
    <div>
     
     <Navbar/>
      
      <TranSactionsPage/>
    </div>
  );
}
