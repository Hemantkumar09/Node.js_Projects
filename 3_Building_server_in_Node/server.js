import http from 'http'

const server = http.createServer((req,res) => {
    res.end('Ready');
})

const port = 1001
server.listen(port,() => console.log('Successfully running on port 1001'));