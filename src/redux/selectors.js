// USER INFO
export const LoadingUserSelector = (state) => state.userLoginSlice.loading;
export const UserInfoSelector = (state) => state.userLoginSlice.userInfo;
export const GetUserDetailSelector = (state) => state.userLoginSlice.userDetail;

//DIAMOND
export const GetAllDiamondSelector = (state) => state.diamondSlice.diamonds;
export const GetDiamondDetailSelector = (state) => state.diamondSlice.diamondDetail;
export const GetDiamondFilterSelector = (state) => state.diamondSlice.filterLimits;
export const GetDiamondShapeSelector = (state) => state.diamondSlice.diamondShape;
export const GetDiamondAttributesSelector = (state) => state.diamondSlice.diamondAttributes;
export const LoadingDiamondSelector = (state) => state.diamondSlice.loading;

//JEWELRY
export const GetAllJewelrySelector = (state) => state.jewelrySlice.jewelries;
export const GetAllJewelryModelSelector = (state) => state.jewelrySlice.jewelriesModel;
export const GetJewelryDetailSelector = (state) => state.jewelrySlice.jewelryDetail;
export const LoadingJewelrySelector = (state) => state.jewelrySlice.loading;
export const GetAllJewelryMetalSelector = (state) => state.jewelrySlice.metals;
export const GetAllJewelryModelCategoriesSelector = (state) => state.jewelrySlice.categories;
export const GetJewelryDetailPresetSelector = (state) => state.jewelrySlice.jewelryDetailPreset;

// DISTANCE
export const selectDistances = (state) => state.distanceSlice.distances;
export const GetAllWardSelector = (state) => state.distanceSlice.ward;
export const GetAllDistrictSelector = (state) => state.distanceSlice.district;
export const CalculateLocationSelector = (state) => state.distanceSlice.location;
export const selectLoading = (state) => state.distanceSlice.loading;
export const selectError = (state) => state.distanceSlice.error;

//CART
export const LoadingCartSelector = (state) => state.cartSlice.loading;
export const GetCartSelector = (state) => state.cartSlice.cart;
export const GetCartDesignSelector = (state) => state.cartSlice.cartDesign;
export const GetCartFinishSelector = (state) => state.cartSlice.cartFinish;

//PROMOTION
export const LoadingPromotionSelector = (state) => state.promotionSlice.loading;
export const GetPromotionSelector = (state) => state.promotionSlice.promotion;

//ORDER
export const LoadingOrderSelector = (state) => state.orderSlice.loading;
export const GetAllOrderSelector = (state) => state.orderSlice.orderList;
export const GetAllOrderDetailSelector = (state) => state.orderSlice.orderDetail;
export const GetOrderTransactionSelector = (state) => state.orderSlice.transaction;

//CUSTOMIZE
export const GetLoadingCustomizeSelector = (state) => state.customizeSlice.loading;
export const GetAllJewelryModelCustomizeSelector = (state) => state.customizeSlice.jewelriesModel;
export const GetAllJewelryModelDetailCustomizeSelector = (state) =>
	state.customizeSlice.jewelryDetail;

//WARRANTY
export const LoadingWarrantySelector = (state) => state.warrantySlice.loading;
export const GetOrderWarrantySelector = (state) => state.warrantySlice.warranties;

//PAYMENT
export const LoadingPaymentSelector = (state) => state.paymentSlice.loading;
export const GetAllPaymentSelector = (state) => state.paymentSlice.payment;

//REVIEW
export const LoadingReviewSelector = (state) => state.reviewSlice.loading;
export const GetAllReviewSelector = (state) => state.reviewSlice.reviews;
