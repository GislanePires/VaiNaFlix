import { useState } from "react";

export default function Contact(){
    const [numero, setNumero] = useState(0);
    const diminuir = () => {
        if (numero > 0) {
            setNumero (numero - 1);
        }
    };
    return(
        <>
        <h2>Seja bem vindo aos contatos</h2>
        <p>Adicione seu contato</p>
        <button onClick={diminuir}> - </button>
        <h2>{numero}</h2>
        <button onClick={() => {
            setNumero(numero + 1);
        }}> + </button>
        </>
    )
}