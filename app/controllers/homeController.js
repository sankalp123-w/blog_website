const Cosmic = require('cosmicjs')
const api = Cosmic()
const bucket = api.bucket({
  slug:process.env.COSMIC_SLUG,
  read_key: process.env.COSMIC_READKEY
})
function homeController(){
	return{
	  async index(req,res){
	try{
   const data = await bucket.getObjects({
    query: {
      
    },
    Limit:6
    // Limit the API response data by props
  })
  const posts = data.objects
 	res.render('index.ejs',{posts:posts})

      }

      catch(err){

      	console.log(err)
      }

  }

  }

     }


module.exports= homeController