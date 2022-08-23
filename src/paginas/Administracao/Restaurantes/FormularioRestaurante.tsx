import {AppBar, Box, Button, TextField, Typography, Container, Toolbar, Link, Paper} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";
import {Link as RouterLink} from 'react-router-dom'

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
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

        <Box>
            <Container maxWidth='lg' sx={{mt: 1}}>
                <Paper sx={{p: 2}} >

                    {/*conteudo da pagina*/}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                        <Typography component='h1' variant='h6' >Formulário de Restaurantes</Typography>
                        <Box component='form' sx={{width: '100%'}} onSubmit={aoSubmeterForm}>
                            <TextField
                                value={nomeRestaurante}
                                onChange={evento => setNomeRestaurante(evento.target.value)}
                                label='Nome do Restaurante'
                                variant='standard'
                                fullWidth
                                required
                            />
                            <Button sx={{marginTop: 1}} type='submit' fullWidth variant='outlined'>Salvar</Button>
                        </Box>
                    </Box>

                </Paper>
            </Container>
        </Box>

</Fragment>
    )
}

export default FormularioRestaurante