import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import { products, categories } from './data/products';
import { addToCart } from './utils/cartUtils';

// Logo
import logoImage from './assets/logo.png'; 

// ------------------------------------------
// LoaderScreen
// ------------------------------------------
const LoaderScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-[#D4AF37] flex flex-col items-center justify-center z-[9999]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 0.8}}
        animate={{ scale: 1.1 }}
        transition={{ 
          duration: 0.5,
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      >
        <div className="w-30 h-30 bg-white rounded-2xl flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
          <img 
            src={logoImage} 
            alt="Logo Dulce Encuentro" 
            className="w-full h-full object-contain p-2" 
          />
        </div>
      </motion.div>
      <p className="mt-6 text-white text-xl font-semibold tracking-wider">Cargando Menu</p>
    </motion.div>
  );
};

// ------------------------------------------
// Main App Component
// ------------------------------------------
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product) => {
    setCartItems(currentCart => addToCart(currentCart, product));
  };

  const handleCartUpdate = (newCartItems) => {
    setCartItems(newCartItems);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence>
        {isLoading && <LoaderScreen />}
      </AnimatePresence>

      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Header
          cartItems={cartItems}
          onCartUpdate={handleCartUpdate}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
        />

        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex justify-center items-center gap-2">
                {/* 🎯 MODIFICADO: Título en dorado */}
                <span className="text-[#D4AF37]">
                  Dulce Encuentro
                </span>
                <span className="text-4xl md:text-5xl">🍰</span>
              </h1>
              <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
                Descubre nuestra selección variada de productos de alta calidad
              </p>
            </motion.div>

            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
            />
          </motion.div>
        </main>

        <motion.footer
          // 🎯 MODIFICADO: Footer en dorado con sombra café/oro
          className="bg-[#D4AF37] text-white py-12 mt-16 shadow-2xl shadow-[#D4AF37]/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                {/* 🎯 MODIFICADO: Inicial 'D' en dorado */}
                <span className="text-[#D4AF37] font-bold text-xl">D</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Dulce Encuentro 🍰</h3>
            </div>
            <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
              Tu repostería de confianza con los mejores productos y el mejor servicio al cliente.
              <br />
              <span className="text-sm opacity-90">
                Horario: Lun-Jue: 7pm-1:10am | Sab-Dom: 7:00pm-3:10am
              </span>
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/80">
              <span>© 2025 Dulce Encuentro</span>
              <span>•</span>
              <span>Políticas de Privacidad</span>
              <span>•</span>
              <span>Contacto</span>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default App;