import productsReducer, {
  addProductLocal,
  removeProductLocal,
  setFilterType,
} from "@/store/productsSlice";

describe("productsSlice", () => {
  it("adds product", () => {
    const state = productsReducer(
      undefined,
      addProductLocal({
        id: 1,
        serialNumber: "SN-1",
        isNew: true,
        photo: null,
        title: "Monitor",
        type: "Monitors",
        specification: null,
        guaranteeStart: null,
        guaranteeEnd: null,
        priceUsd: 200,
        priceUah: 8000,
        orderId: 1,
        createdAt: "2024-01-01",
      }),
    );

    expect(state.items).toHaveLength(1);
  });

  it("removes product", () => {
    const withItem = productsReducer(
      undefined,
      addProductLocal({
        id: 1,
        serialNumber: "SN-1",
        isNew: true,
        photo: null,
        title: "Monitor",
        type: "Monitors",
        specification: null,
        guaranteeStart: null,
        guaranteeEnd: null,
        priceUsd: 200,
        priceUah: 8000,
        orderId: 1,
        createdAt: "2024-01-01",
      }),
    );

    const state = productsReducer(withItem, removeProductLocal(1));
    expect(state.items).toHaveLength(0);
  });

  it("sets filter type", () => {
    const state = productsReducer(undefined, setFilterType("Monitors"));
    expect(state.filterType).toBe("Monitors");
  });
});
