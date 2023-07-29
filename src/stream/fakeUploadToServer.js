import { Readable } from "stream"

class OneToHundredStream extends Readable {
    index = 1
      _read() {
          const i = this.index++
  
    setTimeout(()=>{
      if (i > 10) {
          this.push(null)
      } else {
          const buff = Buffer.from(String(i))
          this.push(buff)
      }
    }, 500)
      }
  }

  fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half',
  }).then(response =>{
    response.text().then(data => {
        console.log(data)
    })
})