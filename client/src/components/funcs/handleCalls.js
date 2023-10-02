import {
  removeItemApi,
  addToCartApi,
  deleteItemApi,
} from "../../apicalls/apicalls";

export const handleAddToCart = async (data) => {
  const res = await addToCartApi(data);
  if (res.success) {
    return res.items;
  } else {
    return res.message;
  }
};

export const handleRemoveFromCart = async (data) => {
  const res = await removeItemApi(data);
  if (res.success) {
    return res.items;
  } else {
    return res.message;
  }
};
export const handleDeleteFromCart = async (data) => {
  const res = await deleteItemApi(data);
  if (res.success) {
    return res.items;
  } else {
    return res.message;
  }
};
