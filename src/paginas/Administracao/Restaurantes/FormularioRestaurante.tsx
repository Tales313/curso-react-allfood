import {Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if(parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(resposta => {
                    setNomeRestaurante(resposta.data.nome)
                })
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if(parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {nome: nomeRestaurante})
                .then(resposta => {
                    alert("Restaurante atualizado com sucesso!")
                })
        } else {
            http.post('restaurantes/', {nome: nomeRestaurante})
                .then(resposta => {
                    alert("Restaurante cadastrado com sucesso!")
                })
        }

    }

    return (
        <form onSubmit={aoSubmeterForm}>
            <TextField value={nomeRestaurante}
                       onChange={evento => setNomeRestaurante(evento.target.value)}
                       label="Nome do Restaurante" variant="standard" />
            <Button type="submit" variant="outlined">Salvar</Button>
        </form>
    )
}

export default FormularioRestaurante