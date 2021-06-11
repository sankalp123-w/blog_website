const Sub = require('../db/subs');
const nodemailer = require('nodemailer');


function subController (){
  return{
  async postsub(req,res){
try{
  	var subemail =`${req.body.email}`
  	if(!subemail){
  		req.flash('err','please fill email')
  		res.redirect('/')
  	}

    Sub.exists({email:subemail},(err,result)=>{
      if (result) {
        req.flash('err','Already subscribed');
      
     return res.redirect('/')

      }
        
      });
    var data = await new Sub({
    email:subemail
    })

    var check = await data.save();
if(!check){

	res.redirect('/')
}


var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
   port: 465,
   secure: true,  
   service: 'Gmail',
  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  },
 
});

var mailOptions = {
  from:process.env.EMAIL_USER,
  to: subemail,
  subject: 'test mail',
  html:`<h1>Thanks for subscription </h1>
  <p> we hope you will enjoy and lear from our blog</P>
  `
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
res.redirect('/')
}
catch(err){
	console.log(err)
  }
}


}

}
module.exports=subController