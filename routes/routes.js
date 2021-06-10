const homeController = require('../app/controllers/homeController');
const postController = require('../app/controllers/postController');
const authController =require('../app/controllers/authController');
const subsController = require('../app/controllers/subsController')
const routes = (app)=>{

  
 app.get('/',homeController().index);
 app.get('/post/:id',postController().index)
 app.post('/updatepost',postController().update)
 //auth routes...
 app.get('/login',authController().loginindex)
 app.get('/register',authController().registerindex)
 app.post('/register',authController().addruser)
  app.post('/login',authController().chklogin)
  app.post('/logout',authController().logout)
  //subs
  app.post('/subs',subsController().postsub)
};

module.exports=routes;