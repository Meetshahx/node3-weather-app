const path = require('path')
const express = require ('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

//Define path for Express confing

const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlerbars engine and views location

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve

app.use(express.static(publicDirectory))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather App',
        name: 'Meet Shah'
    });
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Meet Shah'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help page',
        name: 'Meet Shah'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
       return res.send({
            error:'You must provide a valid address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} ={}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
//     else{
//         res.send({
//             forecast : 'It is rainy',
//             location : 'India',
//             address: req.query.address
//         });
//     };
})

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    } else{

    }
    console.log(req.query.search);
    res.send({
        products:[] 
    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Meet Shah',
        errorMessage:'Cannot find this help page'
    });
})
app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name: 'Meet Shah',
        errorMessage:'Page not found'
    });
})



app.listen(3000,() => {
    console.log('Server is up on port 3000');
})