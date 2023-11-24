import Head from "next/head";
import { useState } from "react";

import styles from "../../styles/pages/livro/Index.module.css";
import { api } from "@/services/api";
import { LoadingBox } from "@/components/LoadingBox";

export default function IndexLivro() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState({
        errorMessage: '',
    });

    const [bookData, setBookData] = useState({
        title: '',
        description: '',
        type: ''
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const sendFormHandler = async (e: any) => {
        e.preventDefault();

        if (!file) {
            setErrorMessages({
                ...errorMessages,
                errorMessage: 'O arquivo é obrigatório.',
            });
            return;
        }

        for (const key in bookData) {
            if (bookData[key as keyof typeof bookData] === '') {
                setErrorMessages({
                    ...errorMessages,
                    errorMessage: 'Todos os campos devem ser preenchidos.',
                });
                return;
            }
        }

        setIsLoading(true);

        const formData = new FormData();

        formData.append('book', file);
        formData.append('title', bookData.title);
        formData.append('description', bookData.description);
        formData.append('type', bookData.type);

        try {

            const response = await api.post('/files/livros', formData);
            console.log(response.data)
            setIsLoading(false);

            setBookData({
                title: '',
                description: '',
                type: ''
            });
        } catch (error: any) {
            setIsLoading(false);
            setErrorMessages({
                ...errorMessages,
                errorMessage: error.message,
            });
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;

        let { value } = e.target;

        setBookData({
            ...bookData,
            [name]: value,
        });
    };

    if (isLoading) return (<LoadingBox />);


    return (
        <>
            <Head>
                <title>Adicionar Livro - Aldeia Kamaiurá</title>
            </Head>

            <div className={styles.container}>
                <h1>Adicionar Livro</h1>
                <form onSubmit={(e) => sendFormHandler(e)} className={styles.formContainer}>
                    <label>Título do Livro:</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        name="title"
                        placeholder="Título do Livro"
                        value={bookData.title}
                        onChange={handleChange}
                    />
                    <label>Descrição:</label>
                    <textarea
                        className={styles.formInputTextArea}
                        name="description"
                        placeholder="Escreva um resumo sobre o livro ou documento adicionado."
                        value={bookData.description}
                        onChange={handleChange}
                    />
                    <label>Tipo:</label>
                    <input
                        className={styles.formInput}
                        type="text"
                        name="type"
                        placeholder="Manual, Livro"
                        value={bookData.type}
                        onChange={handleChange}
                    />
                    <input className={styles.inputFile} type='file' onChange={handleFileChange} />
                    <div className={styles.buttonContainer}>
                        <button className={styles.formInput}>Enviar</button>
                        {errorMessages.errorMessage && (
                            <div className={styles.errorMessage}>{errorMessages.errorMessage}</div>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}