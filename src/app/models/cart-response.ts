export interface CartItemResponse {
    productId: string;
    quantity: number;
    price: number;
    imageFile: string;
  }
  
  export interface CartResponse {
    cartId: string;
    items: CartItemResponse[];
  }
  