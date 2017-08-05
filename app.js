var Koa = require('koa');
var app = Koa();
app.on('error', function(err,ctx){
	console.log(err);
});   
app.listen(3000);