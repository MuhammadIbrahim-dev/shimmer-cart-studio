
import { collection, getDocs, doc, getDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product, Category } from '../types/product';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const productRef = doc(db, 'products', id);
    const productDoc = await getDoc(productRef);
    
    if (productDoc.exists()) {
      return { id: productDoc.id, ...productDoc.data() } as Product;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting product by ID:', error);
    return null;
  }
};

export const getFeaturedProducts = async (limit = 4): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('featured', '==', true), limit(limit));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting featured products:', error);
    return [];
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('category', '==', category));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error('Error getting products by category:', error);
    return [];
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categoriesRef = collection(db, 'categories');
    const snapshot = await getDocs(categoriesRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Category[];
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

// Search products by name
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    // This is a simple implementation - Firebase doesn't support full-text search natively
    // For a production app, consider using Algolia or another search service
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};
