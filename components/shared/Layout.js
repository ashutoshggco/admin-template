import React from "react";
import SideBar from "./sideBar/SideBar";
import { useRouter } from "next/router";

export const Layout = ({ Component, pageProps }) => {
  const router = useRouter();
  const areLoginPages =
    router.asPath === "/login" || router.asPath.includes("/forgotPassword") || router.asPath.includes("/signUp");

  return (
    <div className={!areLoginPages ? "main-container" : ""}>
      {!areLoginPages && <SideBar />}
      <Component {...{ ...pageProps, className: "main-container" }} />
    </div>
  );
};
