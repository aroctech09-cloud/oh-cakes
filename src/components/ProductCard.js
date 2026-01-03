// ProductCard.js
import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const ProductCard = ({ 
  product = {}, 
  onAddToCart = () => {}, 
  index = 0 
}) => {
  const handleAddToCart = () => {
    if (product.stock > 0) {
      onAddToCart(product);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-sm border border-gray-200/50 overflow-hidden group hover:shadow-xl transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
        />
        
        {/* Etiqueta de Poco Stock - Ahora en Dorado suave */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-[#D4AF37] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              ¡Últimas piezas!
            </span>
          </div>
        )}

        {/* Etiqueta de Agotado */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-gray-800 text-white px-4 py-2 rounded-xl font-semibold border border-white/20">
              Agotado
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {/* 🎯 MODIFICADO: Degradado de Precio de Negro a Dorado */}
            <span className="text-2xl font-bold bg-gradient-to-r from-[#1A1A1A] to-[#D4AF37] bg-clip-text text-transparent">
              ${product.price}
            </span>
          </div>

          {/* 🎯 MODIFICADO: Botón de Agregar con Degradado Dorado */}
          <motion.button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
              product.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white hover:from-[#B8860B] hover:to-[#D4AF37] hover:shadow-lg shadow-[#D4AF37]/30'
            }`}
            whileHover={product.stock > 0 ? { scale: 1.05 } : {}}
            whileTap={product.stock > 0 ? { scale: 0.95 } : {}}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:block">
              {product.stock === 0 ? 'Agotado' : 'Agregar'}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;