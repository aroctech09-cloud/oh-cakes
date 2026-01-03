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
      {/* 🎯 MODIFICADO: Color de éxito a Dorado */}
      <CheckCircle className={`w-10 h-10 mx-auto mb-3 ${type === 'error' ? 'text-red-500' : 'text-[#D4AF37]'}`} />
      <p className="font-semibold text-gray-800">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
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
    if (document.execCommand) {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmOrder = () => {
    if (!customerName.trim()) {
      setMessage({ text: 'Por favor ingresa tu nombre para continuar.', type: 'error' });
      return;
    }
    if (orderType !== 'dine-in' && !selectedSucursalName) {
      setMessage({ text: 'Por favor selecciona una sucursal.', type: 'error' });
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
        setMessage({ text: 'Por favor ingresa la dirección de envío.', type: 'error' });
        return;
    }

    const selectedSucursal = SUCURSALES.find(s => s.name === selectedSucursalName);
    const whatsappNumber = selectedSucursal?.whatsapp || '8445349337';
    
    const orderDetails = cartItems.map(item =>
      `🌮 ${item.name} - Cantidad: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('%0A');

    const paymentInfo = paymentMethod === 'transfer'
      ? `💳 *Método de pago:* Transferencia bancaria%0A Cuenta: ${bankAccount}`
      : '💵 *Método de pago:* Efectivo';

    let orderLocation;
    if (orderType === 'dine-in') {
      orderLocation = '🏡 *Tipo de servicio:* Comer Aquí';
    } else if (orderType === 'takeout') {
      orderLocation = `🛍️ *Tipo de servicio:* Para Llevar%0A📍 *Sucursal de Recolección:* ${selectedSucursalName}`;
    } else {
      orderLocation = `🚚 *Tipo de servicio:* A Domicilio%0A🏠 *Dirección de Envío:* ${deliveryAddress}%0A📍 *Sucursal de Envío:* ${selectedSucursalName}`;
    }
    
    const finalMsg = `📝 ¡Hola! Quiero confirmar mi pedido:%0A%0A` +
      `👤 *Nombre:* ${customerName}%0A` +
      `${orderLocation}%0A%0A` +
      `--- *DETALLE DEL PEDIDO* ---%0A` +
      `${orderDetails}%0A%0A` +
      `💰 *Total:* $${totalPrice.toFixed(2)}%0A%0A` +
      `${paymentInfo}%0A%0A` +
      `⏰ *Horario de recolección:* 9am - 4pm`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${finalMsg}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {message && <MessageDisplay message={message.text} type={message.type} onClose={() => setMessage(null)} />}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* 🎯 MODIFICADO: Gradiente a Dorado */}
                  <div className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Confirmar Pedido</h3>
                    <p className="text-gray-500 text-sm">Revisa los detalles antes de continuar</p>
                  </div>
                </div>
                <button onClick={onClose} className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* 🎯 MODIFICADO: Horario con fondo dorado suave */}
              <motion.div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#966F33] mb-1">Horario de Servicio</h4>
                    <p className="text-[#966F33] text-sm">Estamos listos de <strong>9am - 4pm</strong></p>
                  </div>
                </div>
              </motion.div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Tipo de Servicio:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'dine-in', label: 'Comer Aquí', icon: Home },
                    { value: 'takeout', label: 'Para Llevar', icon: ShoppingCart },
                    { value: 'delivery', label: 'A Domicilio', icon: Truck },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setOrderType(value)}
                      // 🎯 MODIFICADO: Botones de opción en Dorado
                      className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-200 text-sm font-medium border-2 
                        ${orderType === value
                          ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-md'
                          : 'bg-gray-100 text-gray-700 border-gray-100 hover:bg-gray-200'
                        }`}
                    >
                      <Icon className="w-5 h-5 mb-1" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {orderType === 'delivery' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <label className="block mb-2 font-semibold text-gray-900">Dirección de Envío:</label>
                  <div className="relative">
                    <Locate className="w-5 h-5 text-gray-400 absolute top-4 left-3" />
                    <textarea 
                      rows="3"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Calle, número, colonia y referencias..."
                      // 🎯 MODIFICADO: Ring focus a Dorado
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none"
                    ></textarea>
                  </div>
                </motion.div>
              )}

              {orderType !== 'dine-in' && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Sucursal:</h4>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={selectedSucursalName}
                      onChange={(e) => setSelectedSucursalName(e.target.value)}
                      // 🎯 MODIFICADO: Ring focus a Dorado
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] font-medium text-gray-700"
                    >
                      {SUCURSALES.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block mb-2 font-semibold text-gray-900">Nombre:</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Método de Pago:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 accent-[#D4AF37]" 
                    />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Transferencia Bancaria</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 accent-[#D4AF37]" 
                    />
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Efectivo al Recoger</span>
                  </label>
                </div>
              </div>

              {paymentMethod === 'transfer' && (
                <motion.div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl p-4">
                  <h5 className="font-semibold text-[#966F33] mb-2">Número de Cuenta:</h5>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#D4AF37]/20">
                    <span className="flex-1 font-mono font-semibold text-[#966F33]">{bankAccount}</span>
                    <button
                      onClick={() => copyToClipboard(bankAccount)}
                      // 🎯 MODIFICADO: Botón copiar en tonos café/dorado
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${copied ? 'bg-[#D4AF37] text-white' : 'bg-[#D4AF37]/20 text-[#966F33] hover:bg-[#D4AF37]/30'}`}
                    >
                      {copied ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="border-t border-gray-200 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  {/* 🎯 MODIFICADO: Gradiente de precio a Dorado */}
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#1A1A1A] to-[#D4AF37] bg-clip-text text-transparent">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  onClick={handleConfirmOrder}
                  // 🎯 MODIFICADO: Botón principal en Gradiente Dorado con sombra a juego
                  className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white rounded-2xl font-semibold shadow-lg shadow-[#D4AF37]/30 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
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