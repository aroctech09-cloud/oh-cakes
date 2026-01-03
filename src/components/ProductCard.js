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
      // Borde suave en el color oscuro con baja opacidad
      className="bg-white rounded-3xl shadow-sm border border-[#4A2C2A]/10 overflow-hidden group hover:shadow-xl transition-all duration-500"
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
        
        {/* 🎯 MODIFICADO: Etiqueta de Poco Stock en Rosa Pastel */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-[#F3A1B5] text-[#4A2C2A] px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-[#4A2C2A]/20">
              ¡Últimas piezas!
            </span>
          </div>
        )}

        {/* Etiqueta de Agotado */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-[#4A2C2A]/40 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-white text-[#4A2C2A] px-4 py-2 rounded-xl font-bold border-2 border-[#4A2C2A]">
              Agotado
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-3">
          {/* 🎯 MODIFICADO: Título cambia a Rosa al hacer hover */}
          <h3 className="text-lg font-extrabold text-[#4A2C2A] mb-2 line-clamp-2 group-hover:text-[#F3A1B5] transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {/* 🎯 MODIFICADO: Precio en Marrón Oscuro sólido (más legible) */}
            <span className="text-2xl font-black text-[#4A2C2A]">
              ${product.price}
            </span>
          </div>

          {/* 🎯 MODIFICADO: Botón de Agregar en Rosa Pastel con texto Oscuro */}
          <motion.button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
              product.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-transparent'
                : 'bg-[#F3A1B5] text-[#4A2C2A] hover:bg-[#ef8da7] hover:shadow-lg shadow-[#F3A1B5]/30 border-2 border-transparent active:border-[#4A2C2A]'
            }`}
            whileHover={product.stock > 0 ? { scale: 1.05 } : {}}
            whileTap={product.stock > 0 ? { scale: 0.95 } : {}}
          >
            <Plus className="w-5 h-5 stroke-[3px]" />
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