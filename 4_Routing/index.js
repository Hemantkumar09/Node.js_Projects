import http from 'http'

const server = http.createServer((req,res) => {
    if(req.url === '/red'){
        res.end('I am inside red');
    }else if(req.url === '/yut'){
        res.end('I am inside yut');
    }
})

const port = 1002
server.listen(port, () => console.log('Successfully running on port 1002'));