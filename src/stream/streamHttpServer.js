import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumbersStream extends Transform {
    _transform(chunk, encoding, callback) {
    const transformedNumber = Number(chunk.toString()) * -1
    console.log(transformedNumber)
        callback(null, Buffer.from(String(transformedNumber)))
}
}

const server = http.createServer((req, res) => {
return req
.pipe(new InverseNumbersStream())
.pipe(res)
})
server.listen(3334)