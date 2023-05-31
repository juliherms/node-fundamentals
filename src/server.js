import http from 'node:http' //nova forma de importacao no node
import { json } from './middlewares/json.js'
import { Database } from './database.js'

const database = new Database()

// GET => Buscsr um rrecurso do bsck-end
// POST => Crisr um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizsr uma informação especifica de um recurso no back-end
// DELETE => Deleter um recurso no back-end

//cria um sevidor e configurar um listener em um porta especifica
const server = http.createServer( async (req, res) => {

    //mostrou como extrair essas informacoes da requisicao
    const { method, url } = req

    //chama middleware para resolver o buffer - intercepta a requisicao
    await json(req, res)

    //Simula a resposta para um get users
    if (method === 'GET' && url === '/users'){
        const users = database.select('users')

        //Conceito de EARLY return, o fato de ter um return dentro do if e sair do codigo
        //Retorna as informacoes do array
        return res.end(JSON.stringify(users))
    }

    //Simula o recebimento de uma requisicao post
    if (method === 'POST' && url === '/users') {

        const { name, email } = req.body

        //Adiciona um usuario no array
        const user = {
            id: 1,
            mame: name,
            email: email
        }

        database.insert('users', user)

        //retorna o status code 201 - created
        return res.writeHead(201).end()
    }

    console.log(method, url)

    return res.writeRead(404).end()

})

server.listen(3333)