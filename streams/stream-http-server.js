//cria um servidor http de stream
import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        console.log(transformed)

        callback(null, Buffer.from(String(transformed))) //o primeiro parametro é se houve erro, o segundo é o valor transformado
    }
}

// res => ReadableStreem
// req => WriteableStream

const server = http.createServer(async (req, res) => {

    const buffers = []

    //ler o buffer inteiro ate o final
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)
    return res.end(fullStreamContent)

//    return req
//    .pipe(new InverseNumberStream())
//    .pipe(res)
})

server.listen(3334)