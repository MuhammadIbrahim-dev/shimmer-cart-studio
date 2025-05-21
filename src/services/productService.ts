import { db } from '../firebase/config';
import { collection, getDocs, getDoc, doc, query, where, limit } from 'firebase/firestore';
import { Product, Category } from '@/types/product';

// Placeholder products for demo purposes
const placeholderProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'A comfortable everyday essential with a modern fit. Made from premium cotton for breathability and durability. Features a classic crew neck and short sleeves that provide a timeless look that can be dressed up or down.',
    price: 29.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    stock: 50,
    rating: 4.5,
    featured: true
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    description: 'Designed for both comfort and style, these jeans feature a modern slim fit that sits perfectly on your frame. Crafted from high-quality denim with a touch of stretch, they offer great flexibility and durability. Ideal for any casual or semi-formal occasion.',
    price: 59.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1541099649429-a68dd5b43930?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541099649429-a68dd5b43930?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602471620513-c9f45495c1d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583454118538-4c7916c23571?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    stock: 30,
    rating: 4.2,
    featured: true
  },
  {
    id: '3',
    name: 'Leather Biker Jacket',
    description: 'This iconic leather biker jacket is a timeless piece that adds an edgy touch to any outfit. Made from premium quality leather, it features a classic asymmetrical zip closure, snap-down lapels, and multiple pockets for functionality. A durable and stylish choice for all seasons.',
    price: 199.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1585487000160-64058ff99c6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stock: 20,
    rating: 4.8,
    featured: true
  },
  {
    id: '4',
    name: 'High-Top Sneakers',
    description: 'Step up your shoe game with these stylish high-top sneakers. Combining comfort and fashion, they feature a cushioned sole for all-day support and a sleek design that pairs well with any casual look. Perfect for adding a sporty vibe to your wardrobe.',
    price: 79.99,
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1606107557195-0a29a5b4b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stock: 40,
    rating: 4.6,
    featured: true
  },
  {
    id: '5',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immerse yourself in sound with these wireless noise-cancelling headphones. Featuring advanced noise cancellation technology, they block out distractions and provide crystal-clear audio. With a long-lasting battery and comfortable design, they are perfect for travel, work, or relaxation.',
    price: 249.00,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1583394842264-10b2e463306e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stock: 15,
    rating: 4.9,
    featured: true
  },
  {
    id: '6',
    name: 'Smart Watch',
    description: 'Stay connected and track your fitness goals with this advanced smartwatch. It features heart rate monitoring, GPS tracking, and smartphone notifications. With a sleek design and customizable interface, it seamlessly integrates into your daily life.',
    price: 129.00,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stock: 25,
    rating: 4.7,
    featured: true
  },
  {
    id: '7',
    name: 'Leather Wallet',
    description: 'Keep your essentials organized with this stylish leather wallet. Made from genuine leather, it features multiple card slots, a bill compartment, and a slim design that fits comfortably in your pocket. A practical and elegant accessory for everyday use.',
    price: 49.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1553069080-22339829aa84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stock: 35,
    rating: 4.5,
    featured: true
  },
  {
    id: '8',
    name: 'Sunglasses',
    description: 'Protect your eyes in style with these trendy sunglasses. They feature UV protection lenses and a lightweight frame for comfortable wear. Available in various colors and styles, they are the perfect accessory for any sunny day.',
    price: 39.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stock: 30,
    rating: 4.3,
    featured: true
  }
];

const placeholderCategories: Category[] = [
  { id: 'clothing', name: 'Clothing' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'footwear', name: 'Footwear' }
];

// Function to simulate fetching products from an API
const getPlaceholderProducts = (): Product[] => {
  return placeholderProducts;
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    
    if (querySnapshot.empty) {
      console.log('No products found in Firestore, returning placeholder data');
      return getPlaceholderProducts();
    }

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data } as Product;
    });
  } catch (error) {
    console.error('Error getting products:', error);
    // Return placeholder products as fallback
    return getPlaceholderProducts();
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));

    if (querySnapshot.empty) {
      console.log('No categories found in Firestore, returning placeholder data');
      return placeholderCategories;
    }

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data } as Category;
    });
  } catch (error) {
    console.error('Error getting categories:', error);
    return placeholderCategories;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const q = query(collection(db, 'products'), where('category', '==', category));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No products found in category ${category}, returning all products`);
      return getProducts();
    }

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data } as Product;
    });
  } catch (error) {
    console.error(`Error getting products in category ${category}:`, error);
    return [];
  }
};

export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No products found matching search term ${searchTerm}`);
      return [];
    }

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data } as Product;
    });
  } catch (error) {
    console.error(`Error searching products with term ${searchTerm}:`, error);
    return [];
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('featured', '==', true),
      limit(8)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('No featured products found in Firestore');
      return getPlaceholderProducts().filter(product => product.featured).slice(0, 8);
    }
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data } as Product;
    });
  } catch (error) {
    console.error('Error getting featured products:', error);
    // Return placeholder products as fallback
    return getPlaceholderProducts().filter(product => product.featured).slice(0, 8);
  }
};
