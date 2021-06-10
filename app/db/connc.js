const mongoose = require('mongoose');
const url ='mongodb://localhost:27017/myblog'
mongoose.connect(url,{useCreateIndex:true,useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false})
.then(()=>console.log('db connected'))
.catch(err=>console.log(err))