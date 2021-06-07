const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=78312ab609faec03a11a425b5e08497c&query='+latitude+','+longitude+'&units=f'
    request({url,json:true},(error,{body})=>{
      if(error){
        callback('unable to connect to weather service!',undefined)
      }else if(body.error){
        callback('unable to find location')
      }else{
        callback(undefined,
          body.current.weather_descriptions[0] +
      '. It is currently ' +
      body.current.temperature +
      ' Farrenheit out. It feels like ' +
      body.current.feelslike +
      ' Farrenheit.'
          // weather_description:response.body.current.weather_descriptions[0],
          // current_temperature:response.body.current.temperature,
          // feelslike:response.body.current.feelslike
        )
      }
    })
  }

  module.exports=forecast