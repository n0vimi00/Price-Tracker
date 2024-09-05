import { create } from 'zustand';

const useProductStore = create((set) => ({
  productList: [], // To store the list of products
  currentProduct: null, // To store the currently selected product
  
  // Function to set the product list
  setProductList: (products) => set({ productList: products }),
  
  // Function to add a product to the list
  addProduct: (product) =>
    set((state) => ({
      productList: [...state.productList, product],
    })),

  // Function to set the current product
  setCurrentProduct: (product) => set({ currentProduct: product }),
}));

export default useProductStore;
