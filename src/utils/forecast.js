const request=require('postman-request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.weatherstack.com/current?access_key=3840b646b56c65cc018bc89301a356c6&query='+ latitude +','+ longitude +'&units=f'
request({url,json:true},(error,{body})=>{
  if(error){
    callback('unable to connect to wether service',undefined)
   } else if(body.error){
    callback('unable to find location',undefined)
   }
   else{
    
    callback(undefined,body.current.weather_descriptions + ". It is currently " + body.current.temperature + "degrees out.The humidity is"+ body.current.feelslike  + "%.")
   }
})
}
module.exports=forecast