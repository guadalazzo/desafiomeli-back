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
  const itemResult = await data.json();
  

  const description = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
  const description_parsered = await description.json();
  

  res.json( {
         item: {
            id:id,
            title:itemResult.title,
            price: {
              currency:itemResult.currency_id,
              amount:itemResult.price,
              decimals:2
            },
            pictures: itemResult.pictures[0].url,
            condition:itemResult.condition,
            free_shipping:itemResult.shipping.free_shipping,
            sold_quantity:itemResult.sold_quantity,
            description:description_parsered.plain_text
          }
      })


  
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
