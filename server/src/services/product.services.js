import Product from "../models/product.model.js";

export const getProducts = (query) => {
  const filter = { isSold: false };
  if (query.category) filter.category = query.category;
  if (query.maxPrice) filter.price = { $lte: Number(query.maxPrice) };
  return Product.find(filter).sort({ createdAt: -1 });
};

export const getProductBySeller = (id, sellerId) =>
  Product.findOne({ _id: id, seller: sellerId, isSold: false });

export const createProduct = (data, sellerId) =>
  Product.create({ ...data, seller: sellerId });

export const updateProduct = (id, sellerId, data) =>
  Product.findOneAndUpdate(
    { _id: id, seller: sellerId, isSold: false },
    data,
    { new: true, runValidators: true }
  );

export const checkoutProducts = (productIds) => {
  const ids = [...new Set(productIds || [])];
  if (!ids.length) return { ids, result: null };
  return Product.updateMany({ _id: { $in: ids }, isSold: false }, { isSold: true })
    .then((result) => ({ ids, result }));
};
