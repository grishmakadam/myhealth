const baseUserRoute = "http://localhost:7000/api/users";
const basecartRoute = "http://localhost:7000/api/cart";

export const registerUserUrl = baseUserRoute + "/register";
export const loginUserUrl = baseUserRoute + "/login";
export const verifyUserUrl = baseUserRoute + "/verifyUser";
export const forgetPasswordUrl = baseUserRoute + "/forgetPassword";
export const verifyOtpUrl = baseUserRoute + "/verifyOTP";
export const changePasswordUrl = baseUserRoute + "/changePassword";
export const logOutUrl = baseUserRoute + "/logOut";

export const addToCartUrl = basecartRoute + "/addToCart";
export const deleteFromCartUrl = basecartRoute + "/deleteFromCart";
export const removeItemUrl = basecartRoute + "/removeItem";
export const getAllItemsUrl = basecartRoute + "/allItems";
export const buyItemsUrl = basecartRoute + "/buyNow"
export const purchaseHistoryUrl=basecartRoute+"/purchaseHistory"