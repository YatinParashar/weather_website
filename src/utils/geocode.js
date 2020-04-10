const request = require('request')

const geoCode = (address , callback) => {

    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoieWF0aW5wIiwiYSI6ImNrOHBuNXpzMTEzdnQzZXJ4ZjU3bmtqMWgifQ.T4LeN7_NIIG6MDfCCnmTtA&limit=1' 

    request({ 
        url:geoCodeUrl ,
        json:true }, 
        
        (error, {body}) => {

        if(error) {
            callback('Unable to connect to geocoding app!' , undefined)

        } else if (body.features.length===0) {
            callback('Location not found. Please try another location search!' , undefined)
        } else {

            data = {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            }
            callback(undefined , data)
        }
    })
}

module.exports = geoCode