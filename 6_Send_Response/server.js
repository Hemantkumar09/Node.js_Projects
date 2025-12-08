import express from 'express'
import path from 'path'

const app = express()




//send a html file
app.get('/', (req,res) => {
    const dir = path.resolve();
    console.log('my dir- ',dir);
    const url = path.join(dir, './index.html');
    console.log(url);
    res.sendFile(url);
})

const port = 4000;
app.listen(port, ()=>console.log(`Server is running on ${port}`))