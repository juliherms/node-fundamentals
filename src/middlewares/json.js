export async function json(req, res) {
    //cria um buffer
    const buffers = []

    //concatena o buffer
     for await (const chunk of req) {
        buffers.push(chunk)
    }
    
    //converte em json
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }

    res.setHeader('Content-type','application/json')
}