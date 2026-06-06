import { Outlet,useLocation } from "react-router-dom";
import Header from "../components/Header"; // or keep inside same file
import { useLayoutEffect } from "react";
;

export default function Layout() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <main className="page-container">
        <Outlet />
      </main>
    </>
  );
}