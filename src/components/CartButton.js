import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Minus, Plus, X, ShoppingBag } from 'lucide-react';
import OrderModal from './OrderModal';

const CartButton = ({ cartItems = [], onCartUpdate = () => {} }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      onCartUpdate(cartItems.filter(item => item.id !== productId));
    } else {
      onCartUpdate(
        cartItems.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const removeItem = (productId) => {
    onCartUpdate(cartItems.filter(item => item.id !== productId));
  };

  const handleConfirmOrder = () => {
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  return (
    <>
      <div className="relative">
        {/* BOTÓN PRINCIPAL */}
        <motion.button
          onClick={() => setIsCartOpen(!isCartOpen)}
          // 🎯 MODIFICADO: Texto y borde en dorado (#D4AF37)
          className="relative w-12 h-12 bg-white text-[#D4AF37] rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-all duration-300 shadow-lg border border-[#D4AF37]/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
          {totalItems > 0 && (
            <motion.span
              // 🎯 MODIFICADO: Fondo del contador en dorado
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#D4AF37] text-white rounded-full text-xs font-bold flex items-center justify-center border-2 border-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.3 }}
            >
              {totalItems}
            </motion.span>
          )}
        </motion.button>

        {/* MENÚ DESPLEGABLE DEL CARRITO */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              className="
                fixed inset-x-0 top-[88px]
                mx-auto px-4
                md:absolute md:top-full md:right-0 md:left-auto
                md:px-0
                w-full md:w-[420px]
                max-w-[95vw]
                bg-white rounded-3xl shadow-2xl
                border border-gray-200/50
                overflow-hidden z-50
              "
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* HEADER DEL CARRITO */}
              <div className="p-6 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* 🎯 MODIFICADO: Icono en dorado */}
                    <ShoppingBag className="w-6 h-6 text-[#D4AF37]" />
                    <h3 className="text-lg font-bold text-gray-900">
                      Mi Carrito ({totalItems})
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* ITEMS */}
              <div className="max-h-80 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="p-8 text-center">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">
                      Tu carrito está vacío
                    </p>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {cartItems.map(item => (
                      <motion.div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
                        layout
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm truncate">
                            {item.name}
                          </h4>
                          {/* 🎯 MODIFICADO: Gradiente de precio de Negro a Dorado */}
                          <p className="font-bold text-sm bg-gradient-to-r from-[#1A1A1A] to-[#D4AF37] bg-clip-text text-transparent">
                            ${item.price}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-white rounded-xl p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </button>

                            <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            // 🎯 MODIFICADO: Botón de eliminar en dorado oscuro
                            className="w-8 h-8 rounded-lg bg-[#D4AF37] hover:bg-[#B8860B] text-white flex items-center justify-center transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* FOOTER DEL CARRITO */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-gray-200/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-900">
                      Total:
                    </span>
                    {/* 🎯 MODIFICADO: Gradiente del total a Dorado */}
                    <span className="text-2xl font-bold bg-gradient-to-r from-[#1A1A1A] to-[#D4AF37] bg-clip-text text-transparent">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <motion.button
                    onClick={handleConfirmOrder}
                    // 🎯 MODIFICADO: Botón de confirmación con gradiente dorado y sombra dorada
                    className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white rounded-2xl font-semibold shadow-lg shadow-[#D4AF37]/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Confirmar Pedido
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
      />
    </>
  );
};

export default CartButton;