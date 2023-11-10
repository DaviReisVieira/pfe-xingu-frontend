import MenuBox from "@/components/MenuBox";
import { AuthContext } from "@/contexts/AuthContext";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";

import styles from "../styles/pages/Gerenciamento.module.css";
import { LoadingBox } from "@/components/LoadingBox";
import TabContent from "@/components/TabContent";


export default function Gerenciamento() {
  const { user, logOut } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("usuarios");


  useEffect(() => {
  }, []);

  if (!user) {
    <LoadingBox />
  }

  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <>
      <Head>
        <title>Gerenciamento - Aldeia Kamaiurá</title>
      </Head>

      <MenuBox user={user} currentPage={"Gerenciamento"} logOut={logOut} />



      <div className={styles.container}>
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${selectedTab === "usuarios" ? styles.active : ""}`}
            onClick={() => handleTabChange("usuarios")}
          >
            Usuários
          </div>
        </div>

        <TabContent
          tabName="usuarios"
          isActive={selectedTab === "usuarios"}
        >
          <h2>Usuários</h2>
          <LoadingBox text="Construindo..." />
        </TabContent>
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