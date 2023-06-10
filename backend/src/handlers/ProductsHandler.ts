import ProductsService from "../services/ProductsService";

export async function getProducts(c, req, res) {
  const products = await ProductsService.getAll();
  res.status(200).json({ products: products });
}

export async function getProduct(c, req, res) {
  const product = await ProductsService.getById(c.request.params.productId);
  res.status(200).json({ product: product });
}

export const productsHandlers = {
  getProducts,
  getProduct,
};
