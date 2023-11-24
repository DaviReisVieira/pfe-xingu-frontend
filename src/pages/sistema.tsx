import styles from "../styles/pages/Sistema.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

import Head from "next/head";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import { LoadingBox } from "@/components/LoadingBox";
import SVGIconComponent from "@/components/SVGIconComponent";
import MenuBox from "@/components/MenuBox";

export default function Sistema() {
  const { logOut, signIn } = useContext(AuthContext);
  const [error, setError] = useState<any | null>();
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const isAuthenticated = false;

  function cpfMask(value: string): string {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  async function handleClickLogin(e: any) {
    e.preventDefault();

    try {
      const user = {
        cpf: cpf,
        password: password
      };

      const response: any = await signIn({ user });

      if (response) {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
      <Head>
        <title>Aldeia Kamaiurá - Aldeia Kamaiurá</title>
      </Head>
      {/* <MenuBox user={null} currentPage="Home" logOut={logOut} /> */}
      <div className={styles.container}>
        <div className={styles.formsContainer}>
          <div className={styles.imgContainer}>
            <SVGIconComponent width={254} height={250} />
          </div>
          <h2>Seja bem-vindo(a)</h2>
          <div className={styles.divContainer}>
            <h1>{isAuthenticated}</h1>
            <input type="text" placeholder="CPF" maxLength={14} value={cpf} onChange={
              (e) => setCpf(cpfMask(e.target.value))

            } />
            <input type="password" placeholder="Senha" value={password} onChange={
              (e) => setPassword(e.target.value)
            } />
            {isAuthenticated ? (
              <button onClick={() => logOut()}>Sign out</button>
            ) : (
              <button onClick={(e) => handleClickLogin(e)}>Entrar</button>
            )}
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
      <div id="bg">
        <div className={
          [styles.ball, styles.top].join(' ')
        }></div>
        <div className={
          [styles.ball, styles.bottom].join(' ')
        }></div>
      </div>
      <div className={styles.area}>
        <ul className={styles.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["PfeXinguInsper.accessToken"]: accessToken } = parseCookies(ctx);

  if (accessToken) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
