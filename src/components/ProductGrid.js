import React from 'react';
import { motion } from 'framer-motion';
import { Package, Search } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  products = [], 
  onAddToCart = () => {},
  searchTerm = '',
  selectedCategory = 'all'
}) => {
  if (products.length === 0) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center py-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          {searchTerm ? <Search className="w-12 h-12 text-gray-400" /> : <Package className="w-12 h-12 text-gray-400" />}
        </motion.div>
        
        <motion.h3 
          className="text-2xl font-bold text-gray-800 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {searchTerm ? 'Sin Resultados' : 'Sin Productos'}
        </motion.h3>
        
        <motion.p 
          className="text-gray-500 font-medium max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {searchTerm 
            ? `No encontramos productos que coincidan con "${searchTerm}". Intenta con otros términos de búsqueda.`
            : 'No hay productos disponibles en esta categoría en este momento.'
          }
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default ProductGrid;