import ordersReducer, {
  addOrderLocal,
  removeOrderLocal,
} from "@/store/ordersSlice";

describe("ordersSlice", () => {
  it("adds order", () => {
    const state = ordersReducer(
      undefined,
      addOrderLocal({
        id: 1,
        title: "Order 1",
        description: null,
        createdAt: "2024-01-01",
      }),
    );
    expect(state.items).toHaveLength(1);
  });

  it("removes order", () => {
    const withItem = ordersReducer(
      undefined,
      addOrderLocal({
        id: 1,
        title: "Order 1",
        description: null,
        createdAt: "2024-01-01",
      }),
    );
    const state = ordersReducer(withItem, removeOrderLocal(1));
    expect(state.items).toHaveLength(0);
  });
});
