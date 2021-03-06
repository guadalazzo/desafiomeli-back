const fetch = require("isomorphic-fetch");
const express = require("express");
const body_parser = require("body-parser");

const app = express();
const limitResult = 4;
const API_URL = "https://api.mercadolibre.com";
app.use(body_parser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", async (req, res, next) => {
  const data = await fetch(`${API_URL}/sites/MLA/`);
  const response = await data.json();
  res.json({ response });
});
app.get("/items/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = await fetch(`${API_URL}/items/${id}`);
  const itemResult = await data.json();

  const description = await fetch(`${API_URL}/items/${id}/description`);
  const descriptionParsed = await description.json();

  res.json({
    item: {
      id: id,
      title: itemResult.title,
      price: {
        currency: itemResult.currency_id,
        amount: itemResult.price,
        decimals: 2
      },
      pictures: itemResult.pictures[0].url,
      condition: itemResult.condition,
      free_shipping: itemResult.shipping.free_shipping,
      sold_quantity: itemResult.sold_quantity,
      description: descriptionParsed.plain_text
    }
  });
});
app.get("/items", async (req, res, next) => {
  const { search } = req.query;
  const data = await fetch(
    `${API_URL}/sites/MLA/search?q=:${search}&limit=${limitResult}`
  );
  const itemSearch = await data.json();
  res.json({
    items: itemSearch.results.map(result => {
      return {
        id: result.id,
        title: result.title,
        price: {
          currency: result.currency_id,
          amount: result.price,
          decimals: 2
        },
        picture: result.thumbnail,
        condition: result.condition,
        free_shipping: result.shipping.free_shipping,
        location: result.address.state_name
      };
    })
  });
});

const server = app.listen(3001, () =>
  console.log("Server running at http://localhost:" + server.address().port)
);
