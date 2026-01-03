import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import { products, categories } from './data/products';
import { addToCart } from './utils/cartUtils';
import logoImage from './assets/logo.png'; 

const LoaderScreen = () => {
  return (
    <motion.div
      key="loader"
      // Aparece y desaparece lentamente con opacidad
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#F3A1B5] flex flex-col items-center justify-center z-[9999]"
    >
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center border-4 border-[#4A2C2A] shadow-2xl overflow-hidden">
          <img src={logoImage} alt="Logo" className="w-full h-full object-contain p-2" />
        </div>
      </motion.div>
      <p className="mt-8 text-[#4A2C2A] text-2xl font-black tracking-widest uppercase">
        Cargando Menú
      </p>
    </motion.div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Lógica de filtrado (se mantiene igual)
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoaderScreen />
        ) : (
          <motion.div
            key="content"
            // El contenido aparece suavemente cuando el loader ya no está
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Header
              cartItems={cartItems}
              onCartUpdate={(items) => setCartItems(items)}
              searchTerm={searchTerm}
              onSearchChange={(val) => setSearchTerm(val)}
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => setSelectedCategory(cat)}
              categories={categories}
            />

            <main className="container mx-auto px-4 py-12">
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-black mb-6 flex justify-center items-center gap-4">
                  <span className="text-[#4A2C2A] tracking-tighter">Oh Cakes !</span>
                  <span className="drop-shadow-md">🍰</span>
                </h1>
                <p className="text-[#4A2C2A]/70 text-xl font-medium max-w-2xl mx-auto italic">
                  "Tu antojo al alcance de tu mano"
                </p>
              </div>

              <ProductGrid
                products={filteredProducts}
                onAddToCart={(p) => setCartItems(current => addToCart(current, p))}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
              />
            </main>

            <footer className="bg-[#F3A1B5] text-[#4A2C2A] py-16 mt-20 border-t-8 border-[#4A2C2A]">
              <div className="container mx-auto px-4 text-center">
                <h3 className="text-3xl font-black mb-4 tracking-tighter">Oh Cakes !</h3>
                <p className="font-bold opacity-80">© 2026 Repostería Artesanal</p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;