import { Outlet } from "react-router-dom";
import Header from "../components/Header"; // or keep inside same file

export default function Layout() {
  return (
    <>
      <Header />
      <main className="page-container">
        <Outlet />
      </main>
    </>
  );
}