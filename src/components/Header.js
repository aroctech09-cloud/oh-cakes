import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import CartButton from './CartButton'; 

const Header = ({
  cartItems = [],
  onCartUpdate = () => {},
  searchTerm = '',
  onSearchChange = () => {},
  selectedCategory = 'all',
  onCategoryChange = () => {},
  categories = []
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <motion.header
      // 🎯 MODIFICADO: Fondo Dorado (#D4AF37) y sombras/bordes en tonos tierra para que combine
      className="bg-[#D4AF37] border-b border-[#B8860B] sticky top-0 z-50 shadow-xl shadow-[#D4AF37]/30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            {/* Logo: Icono con texto en dorado */}
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-[#966F33]">
              <span className="text-[#D4AF37] font-bold text-lg">🍰</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-white">
                Dulce Encuentro
              </h1>
              <p className="text-sm text-gray-100 font-medium">Tu antojo al alcance de tu mano</p>
            </div>
          </motion.div>

          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              {/* Barra de búsqueda: Lupa en dorado y foco en dorado */}
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all duration-300 text-gray-800 font-medium placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CartButton
              cartItems={cartItems}
              onCartUpdate={onCartUpdate}
            />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              // 🎯 MODIFICADO: Botón de menú en un dorado más oscuro para contraste
              className="lg:hidden w-10 h-10 bg-[#B8860B] rounded-xl flex items-center justify-center hover:bg-[#966F33] transition-colors duration-200 text-white"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;