const fetch = require('isomorphic-fetch')
const express = require('express')
const body_parser = require('body-parser')

const app     = express()

app.use(body_parser.urlencoded({extended:true}))

var fs      = require('file-system')
var _ 			= require('lodash')


app.get('/items/:id', async (req, res) => {
  const { id } = req.params
  const data = await fetch("https://api.mercadolibre.com/");
  const items = await data.json();
	JSON.parse(data).forEach((product) =>{
		items.push(product)
	})
  return {items}
})

var server  = app.listen(3001, ()=> 
	console.log('Server running at http://localhost:'+ server.address().port)
)
