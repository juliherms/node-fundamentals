import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
    
    index = 1
    
    //simula a leitura e escrita de 100 registros
    _read() {
        const i = this.index++

        setTimeout(() =>{ //simula um tempo de processamento
            if (i > 100) {
                this.push(null) //simula que nao tenho mais informacoes para enviar para esta stream
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }    
        },1000)
    }
}

//simula uma chamada via stream estabelecendo conexao com o servidor - utiliza fetch api que é nativa do node 18
fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
}).then(response => { //captura o retorno da leitura 
    response.text().then(data => {
        console.log(data)
    })
})