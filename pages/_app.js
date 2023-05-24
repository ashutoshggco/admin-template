import "../styles/globals.scss";
import { Layout } from "../components/shared/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Dummy Admin</title>
      </Head>
      <Layout Component={Component} pageProps={pageProps} />
    </>
  );
}

export default MyApp;
