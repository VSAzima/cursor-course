import { useState } from 'react';
import ProductCard from './components/ProductCard';
import { Product } from './types';

/**
 * Demo App Component
 * Showcases the ProductCard component with multiple products
 */
function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sample products for demonstration
  const products: Product[] = [
    {
      id: 1,
      title: 'Premium Wireless Headphones',
      description: 'Experience crystal-clear sound with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      rating: 4.8,
      reviewCount: 1243,
      inStock: true,
      category: 'Audio',
    },
    {
      id: 2,
      title: 'Smart Watch Pro',
      description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and waterproof design.',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      rating: 4.6,
      reviewCount: 892,
      inStock: true,
      category: 'Wearables',
    },
    {
      id: 3,
      title: 'Professional Camera Lens',
      description: 'Capture stunning photos with this versatile 24-70mm lens. Features image stabilization and weather-sealed construction.',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?w=600&h=600&fit=crop',
      rating: 4.9,
      reviewCount: 567,
      inStock: false,
      category: 'Photography',
    },
    {
      id: 4,
      title: 'Ergonomic Office Chair',
      description: 'Work in comfort with adjustable lumbar support, breathable mesh back, and smooth-rolling casters. Perfect for long work sessions.',
      price: 449.99,
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&h=600&fit=crop',
      rating: 4.7,
      reviewCount: 2134,
      inStock: true,
      category: 'Furniture',
    },
    {
      id: 5,
      title: 'Minimalist Backpack',
      description: 'Stylish and functional backpack with laptop compartment, water-resistant material, and comfortable padded straps.',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
      rating: 4.5,
      reviewCount: 743,
      inStock: true,
      category: 'Accessories',
    },
    {
      id: 6,
      title: 'Portable Power Bank',
      description: 'Keep your devices charged on the go with this 20,000mAh power bank. Features fast charging and multiple USB ports.',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=600&fit=crop',
      rating: 4.4,
      reviewCount: 1876,
      inStock: true,
      category: 'Electronics',
    },
  ];

  /**
   * Handles adding a product to the cart
   */
  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      setNotification('Please sign in to add items.');
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      return;
    }

    setCart(prevCart => [...prevCart, product]);
    
    // Show notification
    setNotification(`${product.title} added to cart!`);
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Product Showcase
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                Discover our featured products
              </p>
            </div>

            <nav className="flex items-center gap-6" aria-label="Primary">
              <a className="text-gray-700 hover:text-blue-600 font-medium" href="#products">Products</a>
              <a className="text-gray-700 hover:text-blue-600 font-medium" href="#footer">About</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAuthenticated(prev => !prev)}
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={isAuthenticated ? 'Sign out' : 'Sign in'}
              >
                {isAuthenticated ? 'Sign out' : 'Sign in'}
              </button>

              {/* Cart Counter */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label={`Shopping cart with ${cart.length} items`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="font-semibold">Cart ({cart.length})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 animate-bounce-slow">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">{notification}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Product Grid */}
        <div data-testid="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Built with React, TypeScript, and Tailwind CSS
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Responsive Product Card Component Demo
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
