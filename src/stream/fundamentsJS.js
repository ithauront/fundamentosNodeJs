
import {Readable, Writable, Transform} from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
    _read() {
        const i = this.index++

  setTimeout(()=>{
    if (i > 100) {
        this.push(null)
    } else {
        const buff = Buffer.from(String(i))
        this.push(buff)
    }
  }, 500)
    }
}

class InverseNumbersStream extends Transform {
    _transform(chunk, encoding, callback) {
    const transformedNumber = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformedNumber)))
}
}

class multiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback() 
    }
}


new OneToHundredStream()
.pipe(new InverseNumbersStream())
.pipe(new multiplyByTenStream())