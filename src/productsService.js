// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;
const fs=require('fs');
const { json } = require("mocha/lib/reporters");

const getProducts = () => {
  // get all products
  return(JSON.stringify(productsList))
}

const getProductsById = (productId, done) => {
    let product=null
    product=productsList.find((products)=>products.id===productId)
    if(product===undefined){
      return done("Requested product doesn't exist..!")
    }
    // get a product by ID
    return done(null, JSON.stringify(product)); 
}

const saveProduct = (newProduct, done) => {
 // save a product
 const existingProduct= productsList.find(product=>product.id===newProduct.id)
 if(existingProduct){
  return done("Product already exists..!")
 }
  productsList.push(newProduct)
  return done(null, JSON.stringify(productsList));
}

const updateProduct = (productId, updateData, done) => {
  let updatedProductList = null;
  // update the product list
  const existingId= productsList.find(product=>product.id===productId)
  if(existingId){
    let productIndex=productsList.findIndex((item)=>item.id===productId)
    if(productIndex!=-1){
      productsList[productIndex]={...productsList[productIndex],...updateData};
    }
    updatedProductList=productsList;
    done(null, JSON.stringify(updatedProductList));
  }
  else {
    done("Requested product doesn't exist..!");
  }
  
}

const deleteProduct = (productId, done) => {
  // delete a product
  const existingId=productsList.find(product=>product.id===productId)
  if(!existingId){
   done("Requested product doesn't exist..!")
  } 
  const index=productsList.indexOf(existingId)
  productsList.splice(index,1)  
  done(null, JSON.stringify(productsList));
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}