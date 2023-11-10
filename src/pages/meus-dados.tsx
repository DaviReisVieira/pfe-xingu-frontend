import MenuBox from "@/components/MenuBox";
import { AuthContext } from "@/contexts/AuthContext";
import { getAPIClient } from "@/services/axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";

import styles from "../styles/pages/MeusDados.module.css";
import { LoadingBox } from "@/components/LoadingBox";

export default function MeusDados() {
  const { user, logOut } = useContext(AuthContext);

  function cpfMask(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  return (
    <>
      <Head>
        <title>Atualizar Precatório - Aldeia Kamaiurá</title>
      </Head>

      <MenuBox user={user} currentPage={"Meus Dados"} logOut={logOut} />
      <div className={styles.container}>
        <h1>Dados de Cadastro</h1>
        {user ? (
          <div>
            <h2>Informações Pessoais</h2>
            <div>
              <label>Nome: </label>
              <input type="text" value={user?.first_name} disabled />
            </div>
            <div>
              <label>Sobrenome: </label>
              <input type="text" value={user?.last_name} disabled />
            </div>
            <div>
              <label>CPF: </label>
              <input type="text" value={cpfMask(user?.cpf)} disabled />
            </div>
          </div>
        ) : (
          <LoadingBox />

        )}
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