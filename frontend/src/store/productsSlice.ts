import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { productsApi } from "@/services/productsApi";

interface ProductsState {
  items: Product[];
  loading: boolean;
  filterType: string;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  filterType: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (type?: string) => productsApi.getAll(type),
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    await productsApi.remove(id);
    return id;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilterType(state, action: PayloadAction<string>) {
      state.filterType = action.payload;
    },
    addProductLocal(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
    },
    removeProductLocal(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { setFilterType, addProductLocal, removeProductLocal } =
  productsSlice.actions;
export default productsSlice.reducer;
