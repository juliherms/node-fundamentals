//Exemplo de como ler dados via stream da console
//Tudo que recebo de entrada, estou caminhando para a saída

//process.stdin
//    .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

//node streams/fundamentals.js
//representa uma classe de leitura
class OneToHundredStream extends Readable {
    
    index = 1
    
    //simula a leitura e escrita de 100 registros
    _read() {
        const i = this.index++

        setTimeout(() =>{ //simula um tempo de processamento
            if (i > 100) { //simula 100 registros
                this.push(null) //simula que nao tenho mais informacoes para enviar para esta stream
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }    
        },1000)
    }
}

//representa uma stream de escrita
//Multiplica os numeros da lista sempre por 10
class MultiplyByTenStream extends Writable {
    //obriga a implementacao do _write
    //o chunk é o dsdo em si
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback() //chama o callback quando finaliza a escrita
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed))) //o primeiro parametro é se houve erro, o segundo é o valor transformado
    }
}

//new OneToHundredStream()
//    .pipe(process.stdout)

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())

