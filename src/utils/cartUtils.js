export const addToCart = (currentCart, product) => {
  const existingItem = currentCart.find(item => item.id === product.id);
  
  if (existingItem) {
    return currentCart.map(item =>
      item.id === product.id 
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    return [...currentCart, { ...product, quantity: 1 }];
  }
};

export const updateCartQuantity = (currentCart, productId, newQuantity) => {
  if (newQuantity <= 0) {
    return currentCart.filter(item => item.id !== productId);
  }
  
  return currentCart.map(item =>
    item.id === productId 
      ? { ...item, quantity: newQuantity }
      : item
  );
};

export const removeFromCart = (currentCart, productId) => {
  return currentCart.filter(item => item.id !== productId);
};

export const getCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};