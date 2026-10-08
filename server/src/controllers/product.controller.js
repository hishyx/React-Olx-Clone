import * as productServices from "../services/product.services.js";

export const getProducts = async (req, res) => {
  res.json(await productServices.getProducts(req.query));
};

export const getProduct = async (req, res) => {
  const product = await productServices.getProductBySeller(req.params.id, req.user.id);
  if (!product) return res.status(404).json({ message: "Listing not found" });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const product = await productServices.createProduct(req.body, req.user.id);
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await productServices.updateProduct(req.params.id, req.user.id, req.body);
  if (!product) return res.status(404).json({ message: "Listing not found" });
  res.json(product);
};

export const checkout = async (req, res) => {
  const checkoutResult = await productServices.checkoutProducts(req.body.productIds);
  const { ids, result } = checkoutResult;
  if (!ids.length) return res.status(400).json({ message: "Your cart is empty" });
  if (result.modifiedCount !== ids.length) {
    return res.status(409).json({ message: "One or more products are no longer available" });
  }
  res.json({ success: true, productIds: ids });
};
