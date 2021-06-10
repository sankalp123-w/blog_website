const mongoose = require('mongoose');
const validator = require('validator')

const register = mongoose.Schema({
name:{
	  type:String,
	  required:true
}
,

email:{
	type:String,
	  required:true
	}
	,
	
	password:{
	  type:String,
	  required:true
	}

});

const Reguser = mongoose.model('user',register);
module.exports=Reguser;
