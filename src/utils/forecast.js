const request = require("request")

const forecast = (longitude, latitude , callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/onecall?lon='+ longitude +'&lat='+ latitude +'&appid=1872c8a052829a329df0ba6c3cd71767&&units=metric'

    request({
        url,
        json: true
    } , (error , {body})=> {

        if(error) {
            callback('Unable to connect to weather app!' , undefined)
        } else if (body.cod) {
            calllback('Location not found! Try another location.' , undefined)
        } else {
            callback(undefined, body.current.weather[0].main + '. Temperature is currently '+ body.current.temp+ ' degree celcius')
        }
    })
}

module.exports = forecast