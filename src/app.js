const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req , res) => {
    res.render('index' , {
        title: 'Weather',
        name : 'Yatin Parashar'
    })
})

app.get('/about' , (req, res) => {
    res.render('about' , {
        title: 'About Me',
        name : 'Yatin Parashar'
    })
})

app.get('/help' , (req , res) => {
    res.render('help' , {
        title: 'Help Page',
        name : 'Yatin Parashar',
        message : 'Contact on 9650330078 for any query.'
    })

})

app.get('/weather', (req , res) => {

    if(!req.query.address)
    {
        return res.send({
            error : 'Pleasse provide address...'
        })
    }

    geoCode(req.query.address, (error, {longitude , latitude , location} = {}) => {
    
        if(error) {
            return res.send({ error })
        }
    
        forecast (longitude, latitude, (error, forecastData) => {
    
            if(error) {
                return res.send({ error })
            }
           
            res.send({
                address : req.query.address,
                location : location,
                forecastData: forecastData
            })
        })
    })
    
})


app.get('/help/*' , (req , res) => {
    res.render('error' , {
        title: 'Error 404',
        errorMessage : 'Help article not found!',
        name : 'Yatin Parashar'
    })

})  

app.get('*', (req , res) => {
    res.render('error' , {
        title: 'Error 404',
        errorMessage : 'Page not found!',
        name : 'Yatin Parashar'
    })
})


app.listen(port , () => {
    console.log('Server is up on port ' + port)
})