import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { recoverUserInformation } from "../services/auth";
import { api } from "../services/api";
import { LoadingBox } from "@/components/LoadingBox";
//   import { LoadingBox } from "../components/LoadingBox";

export type User = {
  cpf: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  nome_empresa?: string;
  cnpj_empresa?: string;
};

export type SignInData = {
  user: User;
};

type AuthContextType = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  user: User;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  logOut: () => Promise<void>;
  signUp: (data: User) => Promise<any>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isAuthenticated = true;

  useEffect(() => {
    const { "PfeXinguInsper.accessToken": accessToken } = parseCookies();

    if (accessToken) {
      recoverUserInformation(accessToken).then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ user }: SignInData) {
    try {
      const response = await api.post("/auth/signin", user);
      const { accessToken } = response.data;

      api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
      setCookie(undefined, "PfeXinguInsper.accessToken", accessToken, {
        maxAge: 60 * 60 * 24, // 1 hour
      });

      recoverUserInformation(accessToken).then((response) => {
        setUser(response.user);
      });
      Router.push("/dashboard");
    } catch (error: Error | any) {
      return error.response;
    }
  }

  async function logOut() {
    setLoading(true);

    try {
      destroyCookie(undefined, "PfeXinguInsper.accessToken");
      Router.push("/");
    } catch (error) {
      console.error("Logout", error);
    }

    setLoading(false);
  }

  async function signUp(user: User) {
    try {
      const response = await api.post("/auth/signup", user);
    } catch (error: Error | any) {
      return error.response;
    }
  }

  if (loading) {
    return (<LoadingBox />)
  } else {
    return (
      <AuthContext.Provider
        value={
          {
            setLoading,
            user,
            isAuthenticated,
            signIn,
            signUp,
            logOut,
          } as AuthContextType
        }
      >
        {children}
      </AuthContext.Provider>
    );
  }
}