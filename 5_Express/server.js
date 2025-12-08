import express from 'express'

const app = express()

app.get('/', (req,res) => {
    res.send('Working Perfectly')
})

const port = 8000;

app.listen(port, () => console.log('Port is running successfully on 8000'));