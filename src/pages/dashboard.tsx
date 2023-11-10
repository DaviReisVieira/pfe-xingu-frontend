import MenuBox from "@/components/MenuBox";
import { AuthContext } from "@/contexts/AuthContext";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";

import styles from "../styles/pages/Dashboard.module.css";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { user, logOut } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
  }, [])



  return (
    <>
      <Head>
        <title>Dashboard - Aldeia Kamaiurá</title>
      </Head>

      <MenuBox user={user} currentPage={"Dashboard"} logOut={logOut} />

      <div className={styles.container}>
        <h1>Seus Precatórios</h1>
        <ul className={styles.precatorioList}>

        </ul>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["PfeXinguInsper.accessToken"]: accessToken } = parseCookies(ctx);

  if (!accessToken) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return {
      props: {},
    };
  }

  return {
    props: {},
  };
};