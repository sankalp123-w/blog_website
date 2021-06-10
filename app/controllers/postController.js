const Cosmic = require('cosmicjs')
const api = Cosmic()
 const bucket = api.bucket({
  slug:'sketch-blog-testing',
  read_key: 'xaoV8FMjx4gliJCscdvbsEC8Lv8O1ZfkUzt7oE7lMADYCcD5Dc'
})
function postController(){
return{
 async index(req,res){
  try{
  var blogs = await bucket.getObjects({
     query: {
      
    },
    Limit:4
    })
bucket.getObject({
        id: req.params.id
    }).then(data => {
        console.log(data);
        res.render('post', { 'data': data.object,'blogs':blogs.objects});
    }).catch(err=>console.log(err))
  }catch(err){
    console.log(err)
  }
},

	update(req,res){
          let posts = req.body
         return res.json({'xx':'all ok'}) 
         res.redirects('/viewpost')
	}

}


}
module.exports=postController