// USER INFO
export const LoadingUserSelector = (state) => state.userLoginSlice.loading;
export const UserInfoSelector = (state) => state.userLoginSlice.userInfo;

//DIAMOND
export const GetAllDiamondSelector = (state) => state.diamondSlice.diamonds;
export const LoadingDiamondSelector = (state) => state.diamondSlice.loading;

//JEWELRY
export const GetAllJewelrySelector = (state) => state.jewelrySlice.jewelries;
export const GetAllJewelryModelSelector = (state) => state.jewelrySlice.jewelriesModel;
export const LoadingJewelrySelector = (state) => state.jewelrySlice.loading;
