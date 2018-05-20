### En base a los diseños dados, construir las siguientes tres vistas:
  
  * Caja de búsqueda
    * Resultados de la búsqueda
    * Detalle del producto

* Las vistas son navegables de manera independiente y cuentan con su propia url:
  * Caja de Búsqueda: ​ “/”
  * Resultados de la búsqueda: ​ “/items?search=”
  * Detalle del producto: ​ “/items/:id”
  * Construir los siguientes endpoints para ser utilizados desde las vistas:
  * /api/items?q= ​ :query

### Debe consultar el siguiente endpoint:
  https://api.mercadolibre.com/sites/MLA/search?q= ​ :query

  Y devolver los resultados en el formato indicado:
       {

     “author”: {

     “name”: String

     “lastname”: String
     },
     categories: [String, String, String, ...],

     items: [
           {"id": String,
             "title": String,
             "price": {
            "currency": String,
            "amount": Number,
            "decimals": Number
             },
          “picture”: String,
          "condition": String,
          "free_shipping": Boolean
           },
           {...},
           {...},
           {...}
           ]
     }
*  /api/items/ ​ :id
  *  Debe consultar los siguientes endpoints:
      https://api.mercadolibre.com/items/ ​ :id
      https://api.mercadolibre.com/items/ ​ :id​ /description
      Y devolver los resultados en el formato indicado:

          {
            “author”: {
            “name”: String
            “lastname”: String
          },
          “item”: {
           "id": String,
          "title": String,
          "price": {
           "currency": String,
          "amount": Number,
          "decimals": Number,
          },
         “picture”: String,
         "condition": String,
        "free_shipping": Boolean,
        "sold_quantity", Number
        "description": String
        }
      }
### Descripción funcional de la aplicación
  *  En la vista de caja de búsqueda, debería poder ingresar el 
      producto a buscar y al enviar el
      formulario navegar a la vista de Resultados de búsqueda, 
      visualizando solo 4 productos. Luego,
      al hacer click sobre uno de ellos, debería navegar a la vista de ### Detalle de Producto.
     *  Dado un id de producto, debería poder ingresar directamente a la vista de detalle de producto.
#### Entregable Repositorio en Github.
