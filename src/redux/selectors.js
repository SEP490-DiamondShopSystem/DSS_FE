// USER INFO
export const LoadingUserSelector = (state) => state.userLoginSlice.loading;
export const UserInfoSelector = (state) => state.userLoginSlice.userInfo;
export const GetUserDetailSelector = (state) => state.userLoginSlice.userDetail;

//USER

//DIAMOND
export const GetAllDiamondSelector = (state) => state.diamondSlice.diamonds;
export const GetDiamondDetailSelector = (state) => state.diamondSlice.diamondDetail;
export const GetDiamondShapeSelector = (state) => state.diamondSlice.diamondShape;
export const GetDiamondAttributesSelector = (state) => state.diamondSlice.diamondAttributes;
export const LoadingDiamondSelector = (state) => state.diamondSlice.loading;

//JEWELRY
export const GetAllJewelrySelector = (state) => state.jewelrySlice.jewelries;
export const GetAllJewelryModelSelector = (state) => state.jewelrySlice.jewelriesModel;
export const GetJewelryDetailSelector = (state) => state.jewelrySlice.jewelryDetail;
export const LoadingJewelrySelector = (state) => state.jewelrySlice.loading;

// DISTANCE
export const selectDistances = (state) => state.distanceSlice.distances;
export const selectLoading = (state) => state.distanceSlice.loading;
export const selectError = (state) => state.distanceSlice.error;

//CART
export const GetCartSelector = (state) => state.cartSlice.cart;
export const GetCartDesignSelector = (state) => state.cartSlice.cartDesign;
export const GetCartFinishSelector = (state) => state.cartSlice.cartFinish;
