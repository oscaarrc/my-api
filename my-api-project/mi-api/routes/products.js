var express = require('express');
const productServices =require ("../services/servicesProducts");
const { validatorHandler } = require('../middleware/validator.handler');
const router= express.Router();
const{ schemaProductCreate, schemaProductGet, schemaProductUpdate}= require('../schema/schemaProduct');

// router.get('/', async function(req, res){  //llamo a la función
//   const products= await productServices.getAllProducts(req,res); //me quedo en espera de la respuesta.
//   res.json(products);
// });
//vamos a provocar un error
router.get('/', async function(req, res,next){  //añado una llamada al middleware con next
  try {
    const products= await productServices.getAllProducts(req,res); //el error debeo generarlo en sevices
    res.json(products);

  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(schemaProductCreate, 'body'),
 async function(req, res){
 const createProduct= await productServices.createNewProduct(req,res);
 return createProduct;
})

router.patch('/:id', async function(req, res){
  const updatedProduct= await productServices.updateProduct(req,res);
  res.json(updatedProduct);

})
router.delete('/:id', async function(req, res){
 const deletedProduct=await productServices.deleteProduct(req,res);
 return deletedProduct;
})

router.get('/:id', validatorHandler(schemaProductGet, 'params') , async function(req, res){
   const getOneProduct= await productServices.getOneProduct(req,res);
   return getOneProduct;
});

module.exports = router;
