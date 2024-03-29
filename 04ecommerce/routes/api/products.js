const express = require('express')
const router = express.Router();
const ProductsService = require('../../services/products')

const productService = new ProductsService()

router.get('/', async (req, res, next) => {
  const { tags } = req.query
  console.log('req', req)

  try {
    const products = await productService.getProducts({ tags })
  
    res.status(200).json({
      data: products,
      message: 'products listed'
    })
  } catch(err) {
    next(err)
  }
})

router.get('/:productId', async (req, res) => {
  const { productId } = req.params
  try {
    const product = await productService.getProduct({ productId })
  
    res.status(200).json({
      data: product,
      message: 'products retrieved'
    })
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res) => {
  const { body: product } = req
  try {
    const product = await productService.createProduct({ product })
  
    res.status(201).json({
      data: product,
      message: 'product created'
    })
  } catch(err) {
    next(err)
  }
})

router.put('/:productId', async (req, res) => {
  const { productId } = req.params
  const { body: product } = req
  try {
    const updatedProduct = await productService.updateProduct({ productId, product })
  
    res.status(200).json({
      data: updatedProduct,
      message: 'products updated'
    })
  } catch(err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res) => {
  const { productId } = req.params
  try {
    const product = await productService.deleteProduct({ productId })
  
    res.status(200).json({
      data: product,
      message: 'products delete'
    })
  } catch(err) {
    next(err)
  }
})

module.exports = router
