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
          // 🎯 MODIFICADO: Borde y texto en Marrón Oscuro (#4A2C2A)
          className="relative w-12 h-12 bg-white text-[#4A2C2A] rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-lg border-2 border-[#4A2C2A]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <motion.span
              // 🎯 MODIFICADO: Fondo del contador en Rosa (#F3A1B5) con texto oscuro
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#F3A1B5] text-[#4A2C2A] rounded-full text-xs font-bold flex items-center justify-center border-2 border-[#4A2C2A]"
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
                border-2 border-[#4A2C2A]/10
                overflow-hidden z-50
              "
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* HEADER DEL CARRITO */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* 🎯 MODIFICADO: Icono en Rosa */}
                    <ShoppingBag className="w-6 h-6 text-[#F3A1B5]" />
                    <h3 className="text-lg font-bold text-[#4A2C2A]">
                      Mi Carrito ({totalItems})
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-[#4A2C2A]" />
                  </button>
                </div>
              </div>

              {/* ITEMS */}
              <div className="max-h-80 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="p-8 text-center">
                    <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">
                      Tu carrito está vacío
                    </p>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {cartItems.map(item => (
                      <motion.div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-[#F3A1B5]/30 transition-colors"
                        layout
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[#4A2C2A] text-sm truncate">
                            {item.name}
                          </h4>
                          {/* 🎯 MODIFICADO: Precio en Marrón Oscuro */}
                          <p className="font-bold text-sm text-[#4A2C2A]">
                            ${item.price}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-gray-200">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-[#4A2C2A]"
                            >
                              <Minus className="w-4 h-4" />
                            </button>

                            <span className="font-semibold text-[#4A2C2A] min-w-[1.5rem] text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-[#4A2C2A]"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            // 🎯 MODIFICADO: Botón eliminar en Marrón Oscuro
                            className="w-8 h-8 rounded-lg bg-[#4A2C2A] hover:bg-[#36201F] text-white flex items-center justify-center transition-colors shadow-sm"
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
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-[#4A2C2A]">
                      Total:
                    </span>
                    {/* 🎯 MODIFICADO: Precio total destacado en Marrón Oscuro */}
                    <span className="text-2xl font-bold text-[#4A2C2A]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <motion.button
                    onClick={handleConfirmOrder}
                    // 🎯 MODIFICADO: Botón de confirmación en Rosa (#F3A1B5) con texto oscuro
                    className="w-full py-4 bg-[#F3A1B5] text-[#4A2C2A] rounded-2xl font-bold text-lg shadow-lg shadow-[#F3A1B5]/20 hover:bg-[#ef8da7] transition-colors"
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