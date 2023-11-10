import Link from "next/link";

const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Meus Dados", href: "/meus-dados" },
    { name: "Gerenciamento", href: "/gerenciamento", role: 'ADMIN' },
];

import styles from "../styles/components/MenuBox.module.css";
import { useRouter } from "next/router";
import SVGIconComponent from "./SVGIconComponent";

export default function MenuBox({ user, currentPage, logOut }: MenuBoxProps) {
    const router = useRouter();

    if (user == null) {
        return (
            <div className={styles.container}>
                <Link href="/">
                    <SVGIconComponent width={254} height={250} scale={50} />
                </Link>
                <div>
                    <ul className={styles.links}>
                        <li>
                            <Link href="/">
                                <p className={currentPage === "Home" ? styles.activeLi : styles.inactiveLi}>
                                    Home
                                </p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Link href="/dashboard">
                <SVGIconComponent width={'100'} />
            </Link>
            <div>
                <ul className={styles.links}>
                    {navigation.map((item) => {
                        if (item.role) {
                            if (user.role.name === item.role) {
                                return (
                                    <li key={item.name}>
                                        <Link href={item.href}>
                                            <p className={currentPage === item.name ? styles.activeLi : styles.inactiveLi}>
                                                {item.name}
                                            </p>
                                        </Link>
                                    </li>
                                )
                            }
                        } else {
                            return (
                                <li key={item.name}>
                                    <Link href={item.href}>
                                        <p className={currentPage === item.name ? styles.activeLi : styles.inactiveLi}>
                                            {item.name}
                                        </p>
                                    </Link>
                                </li>
                            )
                        }
                    })}

                    <li key={'logout-li'} >
                        <Link href={'/'}>
                            <p className={styles.inactiveLi} onClick={logOut}>
                                Sair
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )

}