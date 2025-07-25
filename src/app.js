const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()
const port=process.env.PORT||3000

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//define path for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars and view locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Andrew'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'robot',
        name:'Andrew'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'I need help,',
        title:'help',
        name:'Andrew'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    }) 
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
     console.log(req.query.search)
     res.send({
        products:[]
     })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Andrew',
        errorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Andrew',
        errorMessage:'Page not found'
    })
})
app.listen(port,()=>{
console.log('Server is up on port'+ port)
})