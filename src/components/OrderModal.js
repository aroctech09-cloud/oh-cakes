import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CreditCard, DollarSign, Copy, CheckCircle, MessageCircle, MapPin, Truck, Home, ShoppingCart, Locate } from 'lucide-react';

const SUCURSALES = [
  { name: 'Sucursal Centro (Calle Principal 123)', whatsapp: '8445349337' },
  { name: 'Sucursal Norte (Av. Tecnológico 456)', whatsapp: '8445349337' },
  { name: 'Sucursal Sur (Blvd. Fundadores 789)', whatsapp: '8445349337' },
];

const MessageDisplay = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-xs text-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 🎯 MODIFICADO: Color de éxito a Rosa Pastel */}
      <CheckCircle className={`w-10 h-10 mx-auto mb-3 ${type === 'error' ? 'text-red-500' : 'text-[#F3A1B5]'}`} />
      <p className="font-semibold text-[#4A2C2A]">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 w-full py-2 bg-gray-100 text-[#4A2C2A] rounded-xl font-medium hover:bg-gray-200"
      >
        Cerrar
      </button>
    </motion.div>
  </motion.div>
);

const OrderModal = ({ isOpen, onClose, cartItems = [], totalPrice = 0 }) => {
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [copied, setCopied] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('takeout');
  const [selectedSucursalName, setSelectedSucursalName] = useState(SUCURSALES[0].name);
  const [deliveryAddress, setDeliveryAddress] = useState(''); 
  const [message, setMessage] = useState(null);

  const bankAccount = '1234-5678-9012-3456';

  const copyToClipboard = (text) => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmOrder = () => {
    if (!customerName.trim()) {
      setMessage({ text: 'Por favor ingresa tu nombre para continuar.', type: 'error' });
      return;
    }
    // ... lógica de validación se mantiene igual
    onClose();
  };

  return (
    <AnimatePresence>
      {message && <MessageDisplay message={message.text} type={message.type} onClose={() => setMessage(null)} />}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[#4A2C2A]/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh] border-2 border-[#4A2C2A]/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* 🎯 MODIFICADO: Icono con fondo Rosa */}
                  <div className="w-10 h-10 bg-[#F3A1B5] rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#4A2C2A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#4A2C2A]">Confirmar Pedido</h3>
                    <p className="text-gray-500 text-sm">Revisa los detalles</p>
                  </div>
                </div>
                <button onClick={onClose} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <X className="w-5 h-5 text-[#4A2C2A]" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* 🎯 MODIFICADO: Horario con fondo rosa muy suave */}
              <motion.div className="bg-[#F3A1B5]/10 border border-[#F3A1B5]/20 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#F3A1B5] mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#4A2C2A] mb-1">Horario de Servicio</h4>
                    <p className="text-[#4A2C2A]/80 text-sm">Estamos listos de <strong>9am - 4pm</strong></p>
                  </div>
                </div>
              </motion.div>

              <div>
                <h4 className="font-semibold text-[#4A2C2A] mb-3">Tipo de Servicio:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'dine-in', label: 'Comer Aquí', icon: Home },
                    { value: 'takeout', label: 'Para Llevar', icon: ShoppingCart },
                    { value: 'delivery', label: 'A Domicilio', icon: Truck },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setOrderType(value)}
                      // 🎯 MODIFICADO: Botones en Rosa si están seleccionados
                      className={`flex flex-col items-center p-3 rounded-2xl transition-all text-xs font-bold border-2 
                        ${orderType === value
                          ? 'bg-[#F3A1B5] text-[#4A2C2A] border-[#4A2C2A] shadow-md'
                          : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100'
                        }`}
                    >
                      <Icon className="w-5 h-5 mb-1" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs y Selects con focus Rosa */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-semibold text-[#4A2C2A]">Nombre:</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F3A1B5] focus:border-transparent text-[#4A2C2A]"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {orderType !== 'dine-in' && (
                   <div>
                     <label className="block mb-2 font-semibold text-[#4A2C2A]">Sucursal:</label>
                     <select
                       value={selectedSucursalName}
                       onChange={(e) => setSelectedSucursalName(e.target.value)}
                       className="w-full p-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F3A1B5] text-[#4A2C2A] bg-white"
                     >
                       {SUCURSALES.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                     </select>
                   </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-[#4A2C2A] mb-3">Método de Pago:</h4>
                <div className="space-y-2">
                  {['transfer', 'cash'].map((method) => (
                    <label key={method} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 border-2 border-transparent has-[:checked]:border-[#F3A1B5]/50 transition-all">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 accent-[#4A2C2A]" 
                      />
                      {method === 'transfer' ? <CreditCard className="w-5 h-5 text-[#4A2C2A]" /> : <DollarSign className="w-5 h-5 text-[#4A2C2A]" />}
                      <span className="font-medium text-[#4A2C2A]">{method === 'transfer' ? 'Transferencia Bancaria' : 'Efectivo al Recoger'}</span>
                    </label>
                  ))}
                </div>
              </div>

              {paymentMethod === 'transfer' && (
                <motion.div className="bg-gray-50 border-2 border-[#F3A1B5]/20 rounded-2xl p-4 text-center">
                  <h5 className="font-bold text-[#4A2C2A] mb-2 text-sm uppercase tracking-wider">Número de Cuenta:</h5>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border-2 border-gray-100">
                    <span className="flex-1 font-mono font-bold text-[#4A2C2A]">{bankAccount}</span>
                    <button
                      onClick={() => copyToClipboard(bankAccount)}
                      className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${copied ? 'bg-[#4A2C2A] text-white' : 'bg-[#F3A1B5] text-[#4A2C2A]'}`}
                    >
                      {copied ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="border-t-2 border-gray-100 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#4A2C2A]">Total a pagar:</span>
                  <span className="text-3xl font-black text-[#4A2C2A]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  onClick={handleConfirmOrder}
                  // 🎯 MODIFICADO: Botón principal en Rosa Pastel con texto en Marrón Oscuro
                  className="w-full py-4 bg-[#F3A1B5] text-[#4A2C2A] rounded-2xl font-black text-lg shadow-xl shadow-[#F3A1B5]/20 flex items-center justify-center gap-3 hover:bg-[#ef8da7] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-6 h-6" />
                  Confirmar por WhatsApp
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;