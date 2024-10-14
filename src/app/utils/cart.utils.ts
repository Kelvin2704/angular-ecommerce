import { Product } from '../models/product.model';

// This is a pure function that adds or updates products in the cart
export function updateCartItems(product: Product, cartItems: Product[]): Product[] {
  const existingProduct = cartItems.find(item => item.id === product.id);

  if (existingProduct) {
    // If the product already exists, increase the quantity immutably
    return cartItems.map(item =>
      item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
  } else {
    // Add new product with quantity = 1
    return [...cartItems, { ...product, quantity: 1 }];
  }
}


export function combineCartItems(items: Product[]): Product[] {
    const combinedItems: { [key: number]: Product } = {};
  
    items.forEach(item => {
      if (combinedItems[item.id]) {
        // If the product exists, increase its quantity
        combinedItems[item.id].quantity = (combinedItems[item.id].quantity || 1) + (item.quantity || 1);
      } else {
        // Add the product with its initial quantity
        combinedItems[item.id] = { ...item, quantity: item.quantity || 1 };
      }
    });
  
    // Return the array of combined items
    return Object.values(combinedItems);
  }