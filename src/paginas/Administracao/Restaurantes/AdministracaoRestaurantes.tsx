import {useEffect, useState} from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link} from "react-router-dom";
import http from "../../../http";

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => {
                setRestaurantes(resposta.data)
            }).catch(erro => {
                console.log(erro)
            })
    }, [])

    const excluir = (restauranteASerExcluido: IRestaurante) => {
        http.delete(`restaurantes/${restauranteASerExcluido.id}/`)
            .then(resposta => {
                const listaRestaurantes = restaurantes.filter(r => r.id !== restauranteASerExcluido.id)
                setRestaurantes([...listaRestaurantes])
                alert('Restaurante excluido com sucesso.')
            })
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Deletar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>{restaurante.nome}</TableCell>
                        <TableCell>[ <Link to={`/admin/restaurantes/${restaurante.id}`} >editar</Link> ]</TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default AdministracaoRestaurantes