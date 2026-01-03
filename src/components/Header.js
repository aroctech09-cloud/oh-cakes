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
  
  // Colores extraídos de la imagen:
  // Rosa: #F3A1B5 (Fondo principal)
  // Marrón Oscuro: #4A2C2A (Texto y acentos oscuros)

  return (
    <motion.header
      // 🎯 MODIFICADO: Fondo Rosa (#F3A1B5) y borde inferior en Marrón Oscuro
      className="bg-[#F3A1B5] border-b-4 border-[#4A2C2A] sticky top-0 z-50 shadow-lg"
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
            {/* Logo: Cuadro blanco con borde oscuro */}
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border-2 border-[#4A2C2A]">
              <span className="text-2xl">🍰</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-[#4A2C2A]">
                Oh Cakes !
              </h1>
              <p className="text-sm text-[#4A2C2A]/80 font-medium">Tu antojo al alcance de tu mano</p>
            </div>
          </motion.div>

          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              {/* Lupa en color oscuro */}
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4A2C2A] w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                // Input blanco con foco en color oscuro
                className="w-full pl-12 pr-6 py-3 bg-white border-2 border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4A2C2A] focus:border-[#4A2C2A] transition-all duration-300 text-[#4A2C2A] font-medium placeholder-[#4A2C2A]/50"
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
              // Botón de menú en color oscuro para que resalte sobre el rosa
              className="lg:hidden w-10 h-10 bg-[#4A2C2A] rounded-xl flex items-center justify-center hover:bg-[#36201F] transition-colors duration-200 text-white"
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