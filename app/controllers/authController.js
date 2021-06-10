const Rusers = require('../db/register.js');
const bcrypt = require('bcrypt');
const passport = require('passport');
function authController (){
return{
     registerindex(req,res){
     	res.render('auth/register')
     },
     loginindex(req,res){
     	res.render('auth/login')
     },

     async addruser(req,res){
     	try{
     let name = `${req.body.name}`
     let password =`${req.body.password}`
     let email = `${req.body.email}`
     if(!name||!password||!email){
     	req.flash('err','All feilds required')
     	req.flash('name',`${name}`)
     	req.flash('email',`${email}`)
     	res.redirect('/register')
     }

     //check if email already exists
          Rusers.exists({email:email},(err,result)=>{
          if (result) {
            req.flash('err','Email already exists');
            
              req.flash('name',name)
               req.flash('email',email)
                return res.redirect('/register')

          }
            
          });
     password = await bcrypt.hash(password, 10);
     const data = await new Rusers({
     	name:name,
     	password:password,
     	email:email
     })
     const vyn = await data.save();
     if(!vyn){
     	req.flash('err','Something Went wrong')
        res.redirect('/register')
 
     }
     res.redirect('/login')

}
catch(err){
	console.log(err)
}
   },

   async chklogin(req,res,next){

   	var email= `${req.body.email}`
          var  password= `${req.body.password}`
           // Validate request 
            if(!email || !password) {
                req.flash('err', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('err', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('err', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('err', info.message ) 
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req, res, next)
   },

   logout(req,res){
 req.logout()
  return res.redirect('/login')

   }

	

	}
}
module.exports = authController