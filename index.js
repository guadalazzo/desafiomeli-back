const fetch = require('isomorphic-fetch')
const express = require('express')
const body_parser = require('body-parser')

const app     = express()

app.use(body_parser.urlencoded({extended:true}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var fs      = require('file-system')
var _ 			= require('lodash')
app.get('/', async(req,res,next)=>{
	const data = await fetch(`https://api.mercadolibre.com/sites/MLA/`);
	const response = await data.json();
	 res.json({response})
})
app.get('/items/:id', async (req, res,next) => {
  const { id } = req.params
  const data = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const item = await data.json();

  res.json({item})
})
app.get('/items', async (req, res,next) => {
  const { search } = req.query
  const data = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=:${search}`);
  const itemsearch = await data.json();
  res.json({itemsearch})
})

var server  = app.listen(3001, ()=> 
	console.log('Server running at http://localhost:'+ server.address().port)
)
