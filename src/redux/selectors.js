// USER INFO
export const LoadingUserSelector = (state) => state.userLoginSlice.loading;
export const UserInfoSelector = (state) => state.userLoginSlice.userInfo;
export const GetUserDetailSelector = (state) => state.userLoginSlice.userDetail;
export const ErrorUserSelector = (state) => state.userLoginSlice.error;

//USER
export const LoadingUserDetailSelector = (state) => state.userSlice.loading;
export const ErrorPasswordSelector = (state) => state.userSlice.error;

//DIAMOND
export const GetAllDiamondSelector = (state) => state.diamondSlice.diamonds;
export const GetDiamondDetailSelector = (state) => state.diamondSlice.diamondDetail;
export const GetDiamondFilterSelector = (state) => state.diamondSlice.filterLimits;
export const GetDiamondShapeSelector = (state) => state.diamondSlice.diamondShape;
export const GetDiamondAttributesSelector = (state) => state.diamondSlice.diamondAttributes;
export const LoadingDiamondSelector = (state) => state.diamondSlice.loading;
export const ErrorDiamondSelector = (state) => state.diamondSlice.error;
export const GetLockProductSelector = (state) => state.diamondSlice.lockProduct;

//JEWELRY
export const GetAllJewelrySelector = (state) => state.jewelrySlice.jewelries;
export const GetAllJewelryModelSelector = (state) => state.jewelrySlice.jewelriesModel;
export const GetJewelryDetailSelector = (state) => state.jewelrySlice.jewelryDetail;
export const LoadingJewelrySelector = (state) => state.jewelrySlice.loading;
export const GetAllJewelryMetalSelector = (state) => state.jewelrySlice.metals;
export const GetAllJewelryModelCategoriesSelector = (state) => state.jewelrySlice.categories;
export const GetJewelryDetailPresetSelector = (state) => state.jewelrySlice.jewelryDetailPreset;
export const GetJewelryDetailFilesSelector = (state) => state.jewelrySlice.jewelryDetailThumbnail;
export const ErrorJewelrySelector = (state) => state.jewelrySlice.error;

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
export const ErrorCartSelector = (state) => state.cartSlice.error;

//PROMOTION
export const LoadingPromotionSelector = (state) => state.promotionSlice.loading;
export const GetPromotionSelector = (state) => state.promotionSlice.promotion;
export const GetPromotionAbleSelector = (state) => state.promotionSlice.promoAble;
export const GetDiscountSelector = (state) => state.promotionSlice.discount;
export const ErrorPromotionSelector = (state) => state.promotionSlice.error;

//ORDER
export const LoadingOrderSelector = (state) => state.orderSlice.loading;
export const GetAllOrderSelector = (state) => state.orderSlice.orderList;
export const GetStatusOrderSelector = (state) => state.orderSlice.orderStatus;
export const GetAllOrderDetailSelector = (state) => state.orderSlice.orderDetail;
export const GetOrderTransactionSelector = (state) => state.orderSlice.transaction;
export const GetOrderLogsSelector = (state) => state.orderSlice.orderLogs;
export const GetOrderChildLogsSelector = (state) => state.logSlice.orderChildLogList;
export const GetOrderInvoiceSelector = (state) => state.orderSlice.orderInvoice;
export const ErrorOrderSelector = (state) => state.orderSlice.error;
export const GetOrderTransferSelector = (state) => state.paymentSlice.transfer;

//CUSTOMIZE
export const GetLoadingCustomizeSelector = (state) => state.customizeSlice.loading;
export const GetAllJewelryModelCustomizeSelector = (state) => state.customizeSlice.jewelriesModel;
export const GetAllJewelryModelDetailCustomizeSelector = (state) =>
	state.customizeSlice.jewelryDetail;
export const GetAllRequestCustomizeSelector = (state) => state.customizeSlice.requestByUser;
export const GetRequestCustomizeDetailSelector = (state) =>
	state.customizeSlice.requestByUserDetail;
export const ErrorCustomizeSelector = (state) => state.customizeSlice.error;

//WARRANTY
export const LoadingWarrantySelector = (state) => state.warrantySlice.loading;
export const GetOrderWarrantySelector = (state) => state.warrantySlice.warranties;
export const ErrorWarrantySelector = (state) => state.warrantySlice.error;

//PAYMENT
export const LoadingPaymentSelector = (state) => state.paymentSlice.loading;
export const GetAllPaymentSelector = (state) => state.paymentSlice.payment;
export const ErrorPaymentSelector = (state) => state.paymentSlice.error;

//REVIEW
export const LoadingReviewSelector = (state) => state.reviewSlice.loading;
export const GetAllReviewSelector = (state) => state.reviewSlice.reviews;
export const ReviewSelector = (state) => state.reviewSlice.review;
export const ErrorReviewSelector = (state) => state.reviewSlice.error;

//BLOG
export const GetAllBlogSelector = (state) => state.blogSlice.blogs;
export const GetBlogDetailSelector = (state) => state.blogSlice.blogDetail;

// DIAMOND PRICE
export const getPriceBoardSelector = (state) => state.diamondPriceSlice.priceBoard;
export const getAllPricesSelector = (state) => state.diamondPriceSlice.prices;
export const getAllShapesSelector = (state) => state.diamondPriceSlice.shapes;
export const LoadingDiamondPriceSelector = (state) => state.diamondPriceSlice.loading;
export const DiamondPriceErrorSelector = (state) => state.diamondPriceSlice.error;
//SHOP LOCATION
export const LoadingLocationSelector = (state) => state.locationSlice.loading;
export const GetShopLocationSelector = (state) => state.locationSlice.shopLocation;
export const ErrorLocationSelector = (state) => state.locationSlice.error;
//CONFIG
export const selectDiamondRule = (state) => state?.configSlice?.diamondRule;
export const selectFrontendDisplayRule = (state) => state?.configSlice?.frontendDisplayRule;
export const selectPromotionRule = (state) => state?.configSlice?.promotionRule;
export const selectLocationRule = (state) => state?.configSlice?.locationRule;
export const selectOrderRule = (state) => state?.configSlice?.orderRule;
export const selectOrderPaymentRule = (state) => state?.configSlice?.orderPaymentRule;
export const selectShopBankAccountRule = (state) => state?.configSlice?.shopBankAccountRule;
export const selectIsLoading = (state) => state?.configSlice?.loading;
export const selectConfigError = (state) => state?.configSlice?.error;
