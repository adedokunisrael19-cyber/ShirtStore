import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedColor: "Default",
  selectedSize: "M",
  quantity: 1,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    increaseDetailQuantity: (state) => {
      state.quantity += 1;
    },
    decreaseDetailQuantity: (state) => {
      if (state.quantity > 1) state.quantity -= 1;
    },
    resetDetailSelection: () => initialState,
  },
});

export const {
  setSelectedColor,
  setSelectedSize,
  increaseDetailQuantity,
  decreaseDetailQuantity,
  resetDetailSelection,
} = productDetailSlice.actions;

export default productDetailSlice.reducer;
