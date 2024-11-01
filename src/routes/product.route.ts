import { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { Product, ProductRequestBody } from "../types/product";

const productRouter = Router();

// In-memory Database
let products: Product[] = []

// Get all products - B
productRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json(products)
})

// Fetch product by search id query
productRouter.get('/search', (req: Request<{}, {}, {}, { id: string }>, res: Response) => {
  const { id } = req.query
  const foundProduct = products.find(product => product.id === id)
  if (foundProduct) {
    res.status(200).json(foundProduct)
  } else {
    res.status(404).send('Search did not show any results...')
  }
})

// Edit product by id - E
productRouter.put('/:id', (req: Request<{ id: string }, {}, ProductRequestBody>, res: Response) => {
  const { id } = req.params
  const productIndex = products.findIndex(product => product.id === id)
  if (productIndex !== -1) {
    const updatedProduct = {
      ...products[productIndex],
      product_name: req.body.product_name ?? products[productIndex].product_name,
      product_description: req.body.product_description ?? products[productIndex].product_description,
      product_price: req.body.product_price ?? products[productIndex].product_price
    }
    products[productIndex] = updatedProduct
    res.status(201).json(updatedProduct)
  } else {
    res.status(404).send('Product item not found!')
  }
})

// Add product - A
productRouter.post('/', (req: Request<{}, {}, ProductRequestBody>, res: Response) => {
  const newProduct: Product = {
    id: uuidv4(),
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price
  }
  products = [...products, newProduct]
  res.status(201).send('Product added successfully...')
})

// Delete product by id - D
productRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const findProduct = products.find(product => product.id === id)
  if (findProduct) {
    products = products.filter(product => product.id !== id)
    res.status(200).send(`Product was deleted successfully...`)
  } else {
    res.status(404).send(`Product not found!`)
  }
})

export default productRouter;
