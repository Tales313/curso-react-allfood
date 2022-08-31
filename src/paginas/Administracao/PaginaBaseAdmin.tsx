import {AppBar, Box, Button, TextField, Typography, Container, Toolbar, Link, Paper} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
import {Outlet, useParams} from "react-router-dom";
import {Link as RouterLink} from 'react-router-dom'
import IRestaurante from "../../interfaces/IRestaurante";
import http from "../../http";

const PaginaBaseAdmin = () => {

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
        <Fragment>
            <AppBar position='static' >
                <Container maxWidth='xl' >
                    <Toolbar>
                        <Typography variant='h6'>
                            Administração
                        </Typography>
                        <Box sx={{display:'flex', flexGrow: 1}}>
                            <Link component={RouterLink} to='/admin/restaurantes' >
                                <Button sx={{my: 2, color: 'white'}}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to='/admin/restaurantes/novo' >
                                <Button sx={{my: 2, color: 'white'}}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                            <Link component={RouterLink} to='/admin/pratos' >
                                <Button sx={{my: 2, color: 'white'}}>
                                    Pratos
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth='lg' sx={{mt: 1}}>
                    <Paper sx={{p: 2}} >
                        <Outlet/>
                    </Paper>
                </Container>
            </Box>

        </Fragment>
    )
}

export default PaginaBaseAdmin