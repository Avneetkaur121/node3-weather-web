const request=require('postman-request')
    const geocode=(address,callback)=>{
      
  const url = 'https://api.opencagedata.com/geocode/v1/json?q='+encodeURIComponent(address)+'&key=f03e8c0e23844c449b17a2eec57c894f&limit=1'

      
    request({url,json:true},(error,{body})=>{
      if(error){
         callback('unable to connect to location services',undefined)
      }
   else if 


(body.results.length===0){
callback('unable to find location.Try another search',undefined)
   }
   else{
      callback(undefined,{
         latitude:body.results[0].geometry.lat,
         longitude:body.results[0].geometry.lng,
         location:body.results[0].components.town
      })
   }
})
}
module.exports=geocode


