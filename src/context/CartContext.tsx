
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import { useToast } from '@/components/ui/use-toast';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextProps | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Load cart from Firestore when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, 'carts', currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setCartItems(docSnap.data().items || []);
          } else {
            // Create a new cart for the user
            await setDoc(docRef, { items: [] });
          }
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      } else {
        // If no user, load cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      }
    };

    loadCart();
  }, [currentUser]);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  const saveCartToFirestore = async (updatedItems: CartItem[]) => {
    if (currentUser) {
      try {
        const docRef = doc(db, 'carts', currentUser.uid);
        await setDoc(docRef, { items: updatedItems }, { merge: true });
      } catch (error) {
        console.error('Error saving cart to Firestore:', error);
      }
    }
  };

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);

      let updatedItems;
      if (existingItem) {
        updatedItems = prevItems.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        updatedItems = [...prevItems, item];
      }

      saveCartToFirestore(updatedItems);
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`
      });
      
      return updatedItems;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      saveCartToFirestore(updatedItems);
      return updatedItems;
    });
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart."
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;

    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      saveCartToFirestore(updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    saveCartToFirestore([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart."
    });
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    totalItems,
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
