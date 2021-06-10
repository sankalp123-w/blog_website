const mongoose = require('mongoose');
const validator = require('validator')

const subscription = mongoose.Schema({


email:{
	type:String,
	  required:true
	}
	
},{ timestamps: true });

const Subs = mongoose.model('subscriber',subscription);
module.exports=Subs;
