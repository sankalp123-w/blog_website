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
    user: 'sankalpjha63@gmail.com',
    pass: 'sankalpjha123'
  },
 
});

var mailOptions = {
  from: 'sankalpjha63@gmail.com',
  to: subemail,
  subject: 'test mail',
  html:'<h1>Thanks for subscription <%=subemail%></h1>'
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