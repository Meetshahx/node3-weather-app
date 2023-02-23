const request = require('request');
const forecast = (latitude,longitude,callback) => {
    const url ='http://api.weatherstack.com/current?access_key=932994ad04120048feaca7e92dd48f32&query='+ longitude+','+latitude +'&units=m';
        request({ url, json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to Weather API',undefined);
        }else if(body.error){
            callback('Unable to find location. Try to find other term',undefined);

        }else{
            callback(undefined,
            body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out."
            )
            
        }

    })
}

module.exports= forecast;