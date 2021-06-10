const Cosmic = require('cosmicjs')
const api = Cosmic()
const bucket = api.bucket({
  slug:'sketch-blog-testing',
  read_key: 'xaoV8FMjx4gliJCscdvbsEC8Lv8O1ZfkUzt7oE7lMADYCcD5Dc'
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