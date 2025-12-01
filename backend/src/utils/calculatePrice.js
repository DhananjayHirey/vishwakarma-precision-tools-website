import { Product } from "../models/product.model.js";

export const calculatePrice = async (orderObject) => {
  let amount = 0.0;
  try {
    for (let i = 0; i < orderObject.length; i += 1) {
      let prodPrice = await Product.findById(orderObject[i]?.productId);
      let price = prodPrice.price;
      price *= orderObject[i].quantity;
      amount += price;
    }
  } catch (e) {
    return NaN;
  }
  return amount;
};
