//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT=process.env.PORT || 5000

const productsService = require("./productsService");
const getRequestData = require('./utils');
const parse = require('nodemon/lib/cli/parse');

const server = http.createServer(async (req, res) => {
  // Get all products
    if(req.url==='/products/productAll' && req.method==='GET'){
      res.writeHead(200,{
        'content-type':'application.json'
      })
      res.end(productsService.getProducts());
    }

  // Get a product with specified id
    else if (req.url.startsWith('/products/productId/') && req.method==='GET'){
      const id= parseInt(req.url.split("/").pop(),10)
      res.writeHead(200,{
        'content-type' : 'application.json'
      })
      productsService.getProductsById(id, (error, result) => {
        if (error) {
          // If there's an error, send a 404 status and the error message
          res.writeHead(404, {
            'content-type': 'application/json'
          });
          res.end(JSON.stringify({ error: error }));
        } else {
          // If successful, send the product details
          res.end(result);
        }
      });
      
      
    }

  // Create a new product
  else if (req.url==='/products/newProduct' && req.method==='POST'){
    let req_body= await getRequestData(req)
    let newProduct=JSON.parse(req_body)
    productsService.saveProduct(newProduct,(error,result)=>{
      if(error){
        res.writeHead(404,{
          'content-type': 'application/json'
        });
        res.end(JSON.stringify({ error: error }));
      }
      else {
        res.end(result);
      }
    })


  }

  // Update a specific product
  else if (req.url.startsWith('/products/updateProduct/') && req.method==='POST'){
    const id =parseInt(req.url.split("/").pop(),10)
    let req_body=await getRequestData(req)
    let newProduct=JSON.parse(req_body)
    productsService.updateProduct(id,newProduct,(error,result)=>{
      if(error){
        res.writeHead(404,{
          'content-type': 'application/json'
        });
        res.end(JSON.stringify({ error: error }));
      }
      else {
        res.end(result);
      }
    })
  }

  // Delete a specific Product
  else if(req.url.startsWith("/products/delete/") && req.method==='DELETE'){
    const id = parseInt(req.url.split("/").pop(),10)
    productsService.deleteProduct(id,(error,result)=>{
      if(error){
        res.writeHead(404,{
          'content-type':'application/json'
        });
        res.end(JSON.stringify({error:error}));
      }
      else{
        res.end(result)
      }
    })

  }

});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})