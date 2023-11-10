import React, { useContext, useState } from 'react';

import styles from '../styles/components/CadastroForm.module.css';
import { AuthContext } from '@/contexts/AuthContext';
import { LoadingBox } from './LoadingBox';
import Router from "next/router";


const CadastroForm: React.FC = () => {
    const { signUp } = useContext(AuthContext);

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        cpf: '',
        nome_empresa: '',
        cnpj_empresa: '',
        password: '',
        repeatPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    function cpfMask(value: string): string {
        return value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

    function cnpjMask(value: string): string {
        return value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 2 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

    const [passwordStrength, setPasswordStrength] = useState('');

    const [errorMessages, setErrorMessages] = useState({
        errorMessage: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;

        let { value } = e.target;

        if (name === 'cpf') {
            value = cpfMask(value);
        }

        if (name === 'cnpj_empresa') {
            value = cnpjMask(value);
        }

        setUserData({
            ...userData,
            [name]: value,
        });

        if (name === 'password' || name === 'repeatPassword') {
            checkPasswordStrength(value);
        }
    };

    const checkPasswordStrength = (password: string) => {
        // Verificar comprimento mínimo
        if (password.length < 8) {
            setPasswordStrength('Fraca');
            return;
        }
        // Verificar se a senha corresponde à expressão regular do backend
        const regex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/;
        if (regex.test(password)) {
            setPasswordStrength('Forte');
        } else {
            setPasswordStrength('Fraca');
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (userData.password !== userData.repeatPassword) {
            setErrorMessages({
                ...errorMessages,
                errorMessage: 'As senhas não correspondem.',
            });
            return;
        } else {
            setErrorMessages({
                ...errorMessages,
                errorMessage: '',
            });
        }

        for (const key in userData) {
            if (userData[key as keyof typeof userData] === '') {
                setErrorMessages({
                    ...errorMessages,
                    errorMessage: 'Todos os campos devem ser preenchidos.',
                });
                return;
            }
        }

        if (passwordStrength === 'Fraca') {
            setErrorMessages({
                ...errorMessages,
                errorMessage: 'A senha deve ter pelo menos 8 caracteres e conter letras maiúsculas, minúsculas, números e símbolos.',
            });
            return;
        }

        setIsLoading(true);

        const signUpResponse = await signUp(userData);

        setIsLoading(false);

        if (signUpResponse) {
            setErrorMessages({
                ...errorMessages,
                errorMessage: signUpResponse.data.message,
            });
        } else {
            setErrorMessages({
                ...errorMessages,
                errorMessage: 'Cadastro realizado com sucesso!',
            });
            setTimeout(() => {
                Router.push("/");
            }, 1000);
        }



    };

    if (isLoading) return (<LoadingBox />);

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div>
                <label>Primeiro Nome:</label>
                <input
                    type="text"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Sobrenome:</label>
                <input
                    type="text"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>CPF:</label>
                <input
                    type="text"
                    name="cpf"
                    value={userData.cpf}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Nome da Empresa:</label>
                <input
                    type="text"
                    name="nome_empresa"
                    value={userData.nome_empresa}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>CNPJ da Empresa:</label>
                <input
                    type="text"
                    name="cnpj_empresa"
                    value={userData.cnpj_empresa}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Senha:</label>
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Repita a Senha:</label>
                <input
                    type="password"
                    name="repeatPassword"
                    value={userData.repeatPassword}
                    onChange={handleChange}
                />
                <p className={styles.forcaSenha}>
                    Força da Senha: <b>{passwordStrength}</b>
                </p>
            </div>

            <div className={styles.buttonContainer}>
                <button type="submit">Cadastrar</button>
                <div className={styles.errorMessage}>{errorMessages.errorMessage}</div>
            </div>
        </form>
    );
};

export default CadastroForm;
