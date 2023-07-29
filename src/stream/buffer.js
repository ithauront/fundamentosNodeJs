import http from 'node:http'


const serverHttp = http.createServer(async (req, res) => {
    const buffers = []
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)

    res.end(fullStreamContent)
})

serverHttp.listen(3334)