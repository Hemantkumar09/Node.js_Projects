import express, { urlencoded } from 'express'


const app = express();

app.use(express.urlencoded({extended: true}))

app.get('/', (req,res)=> {
    res.render('index.ejs')
})

app.post('/form-data',(req,res)=> {
    res.json({
        message:"your form has been submitted successfully",
        success:true
    })
})

const port = 1001
app.listen(port, ()=>console.log(`Server is successfully running on ${port}`))