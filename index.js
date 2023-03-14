var express = require('express');
var app = express();

const port = 3000;

//const bodyParser = require('body-parser');

app.get("/toto",function(req, res){

	res.send("Bonjour Toto");
});

app.listen(port, function(){
	console.log('serveur listening on port: '+port);
});
