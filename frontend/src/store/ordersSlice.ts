import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@/types/order";
import { ordersApi } from "@/services/ordersApi";

interface OrdersState {
  items: Order[];
  selectedOrder: Order | null;
  loading: boolean;
}

const initialState: OrdersState = {
  items: [],
  selectedOrder: null,
  loading: false,
};

export const fetchOrders = createAsyncThunk("orders/fetchAll", async () =>
  ordersApi.getAll(),
);
export const fetchOrderById = createAsyncThunk(
  "orders/fetchById",
  async (id: number) => ordersApi.getById(id),
);
export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (id: number) => {
    await ordersApi.remove(id);
    return id;
  },
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearSelectedOrder(state) {
      state.selectedOrder = null;
    },
    addOrderLocal(state, action: PayloadAction<Order>) {
      state.items.push(action.payload);
    },
    removeOrderLocal(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        if (state.selectedOrder?.id === action.payload) {
          state.selectedOrder = null;
        }
      });
  },
});

export const { clearSelectedOrder, addOrderLocal, removeOrderLocal } =
  ordersSlice.actions;
export default ordersSlice.reducer;
