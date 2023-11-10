import React, { useState, useEffect } from "react";

import styles from "../styles/components/AdicionarValores.module.css";
import { api } from "@/services/api";


const AdicionarValores: React.FC = () => {
    const [ano, setAno] = useState<number>();
    const [mes, setMes] = useState<number>();
    const [valor, setValor] = useState<number>();
    const [tabela, setTabela] = useState<string>('ec113'); // Valor padrão é ec113
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleAddValor = async () => {
        if (ano && mes && valor) {
            setPopupVisible(true);
        } else {
            // Lidar com erros ou validações aqui
        }
    };

    const confirmAddValor = async () => {

        try {
            setPopupVisible(false);

            const response = await api.post(`/tabelas-correcao/${tabela}`, { ano, mes, valor });

            if (response.status === 201) {
                setAno(0);
                setMes(0);
                setValor(0);
                setTabela('ec113');
            } else {
                alert('Erro ao adicionar valor');
            }
        } catch (error: any) {
            console.log(error);
            alert('Erro ao adicionar valor');
        };
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <label>
                    Ano:
                    <input type="number" value={ano} min={1900} max={9999} onChange={(e) => setAno(Number(e.target.value))} />
                </label>
                <label>
                    Mês:
                    <input type="number" value={mes} min={1} max={12} onChange={(e) => setMes(Number(e.target.value))} />
                </label>
            </div>
            <div className={styles.buttons}>

                <label>
                    Tabela:
                    <select value={tabela} onChange={(e) => setTabela(e.target.value)}>
                        <option value="ec113">EC-113</option>
                        <option value="ipcae">IPCA-E</option>
                    </select>
                </label>
                <label>
                    Valor:
                    <input type="number" value={valor} min={0.00} onChange={(e) => setValor(Number(e.target.value))} />
                </label>
            </div>
            <button onClick={handleAddValor}>Adicionar Valor</button>
            {isPopupVisible && (
                <div className={styles.popup}>
                    <p>Confirma adicionar o valor?</p>
                    <div className={styles.buttons}>
                        <button className={styles.confirmButton} onClick={confirmAddValor}>Sim</button>
                        <button className={styles.cancelButton} onClick={() => setPopupVisible(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdicionarValores;