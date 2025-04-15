"use client"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import { ThemeToggle } from "./ThemeToggle";
import { PiggyBank } from "lucide-react";


export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function App() {
  return (
    <Navbar>
      <NavbarBrand>
        <div className="p-0.5   rounded-lg inline-flex items-center space-x-2">
          <PiggyBank className="w-10 h-10 p-2 border-1 border-solid amber-200 rounded-md" />
          <p className="font-bold text-yellow-400 italic text-sm">Personal Expense Tracker</p>
        </div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/transactions">
            Transactions
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="categories">
            Categories
          </Link>
        </NavbarItem>
        
      </NavbarContent>
      <NavbarContent justify="end">
        
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
