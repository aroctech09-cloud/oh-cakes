import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CreditCard, DollarSign, CheckCircle, MessageCircle, Truck, Home, ShoppingCart } from 'lucide-react';

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
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('takeout');
  const [selectedSucursalName, setSelectedSucursalName] = useState(SUCURSALES[0].name);
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const bankAccount = '1234-5678-9012-3456';

  // --- LEER COOKIE AL ABRIR ---
  useEffect(() => {
    if (isOpen) {
      const savedName = document.cookie
        .split('; ')
        .find(row => row.startsWith('nombre_cliente='))
        ?.split('=')[1];
      if (savedName) setCustomerName(decodeURIComponent(savedName));
    }
  }, [isOpen]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- FUNCIÓN PRINCIPAL CORREGIDA ---
  const handleConfirmOrder = async () => {
    if (!customerName.trim()) {
      setMessage({ text: 'Por favor ingresa tu nombre para continuar.', type: 'error' });
      return;
    }

    setIsSubmitting(true);

    // 1. Preparamos los datos para PHP
    const orderData = {
      cliente: customerName,
      tipo_servicio: orderType,
      sucursal: selectedSucursalName,
      metodo_pago: paymentMethod,
      total: totalPrice,
      detalles: cartItems.map(item => ({
        nombre: item.name,
        cantidad: item.quantity,
        precio: item.price
      }))
    };

    try {
      // 2. Guardamos en Base de Datos
      const response = await fetch('http://localhost/oh_cakes/guardar_pedido.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      // 3. Enviamos a WhatsApp sin importar si el PHP falló (para no perder la venta)
      const productosTexto = cartItems.map(i => `*${i.quantity}x* ${i.name}`).join('%0A');
      const waMsg = `🧁 *NUEVO PEDIDO: Oh Cakes!*%0A%0A👤 *Cliente:* ${customerName}%0A📍 *Servicio:* ${orderType}%0A🏢 *Sucursal:* ${selectedSucursalName}%0A💳 *Pago:* ${paymentMethod}%0A%0A🛒 *Detalles:*%0A${productosTexto}%0A%0A💰 *TOTAL: $${totalPrice.toFixed(2)}*`;
      
      window.open(`https://wa.me/8445349337?text=${waMsg}`, '_blank');
      onClose();

    } catch (error) {
      console.error("Error al guardar, pero enviando WhatsApp...", error);
      // Si falla el servidor, igual abrimos WhatsApp
      window.open(`https://wa.me/8445349337?text=Error de red al guardar, pero aquí está mi pedido...`, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {message && <MessageDisplay message={message.text} type={message.type} onClose={() => setMessage(null)} />}
      {isOpen && (
        <motion.div className="fixed inset-0 bg-[#4A2C2A]/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-16" onClick={onClose}>
          <motion.div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh] border-2 border-[#4A2C2A]/10" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F3A1B5] rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#4A2C2A]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#4A2C2A]">Confirmar Pedido</h3>
                  <p className="text-gray-500 text-sm">Registro automático</p>
                </div>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 space-y-6">
              {/* Horario */}
              <div className="bg-[#F3A1B5]/10 border border-[#F3A1B5]/20 rounded-2xl p-4 flex gap-3">
                <Clock className="w-5 h-5 text-[#F3A1B5]" />
                <p className="text-sm text-[#4A2C2A]">Horario: <strong>9am - 4pm</strong></p>
              </div>

              {/* Tipo de Servicio */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { v: 'dine-in', l: 'Aquí', i: Home },
                  { v: 'takeout', l: 'Llevar', i: ShoppingCart },
                  { v: 'delivery', l: 'Envío', i: Truck },
                ].map(({ v, l, i: Icon }) => (
                  <button key={v} onClick={() => setOrderType(v)} className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${orderType === v ? 'bg-[#F3A1B5] border-[#4A2C2A]' : 'bg-gray-50 border-transparent text-gray-400'}`}>
                    <Icon className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold uppercase">{l}</span>
                  </button>
                ))}
              </div>

              {/* Nombre y Sucursal */}
              <div className="space-y-4">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Tu Nombre completo"
                  className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F3A1B5] outline-none"
                />
                <select value={selectedSucursalName} onChange={(e) => setSelectedSucursalName(e.target.value)} className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-white outline-none">
                  {SUCURSALES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              {/* Pago */}
              <div className="space-y-2">
                {['transfer', 'cash'].map((m) => (
                  <label key={m} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer border-2 border-transparent has-[:checked]:border-[#F3A1B5]">
                    <input type="radio" name="pay" value={m} checked={paymentMethod === m} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 accent-[#4A2C2A]" />
                    <span className="font-bold text-[#4A2C2A] text-sm">{m === 'transfer' ? 'Transferencia' : 'Efectivo'}</span>
                  </label>
                ))}
              </div>

              {paymentMethod === 'transfer' && (
                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-[#F3A1B5]/20 flex items-center justify-between">
                  <span className="font-mono font-bold text-xs">{bankAccount}</span>
                  <button onClick={() => copyToClipboard(bankAccount)} className="bg-[#F3A1B5] px-3 py-1 rounded-lg text-xs font-bold">{copied ? 'Listo' : 'Copiar'}</button>
                </div>
              )}

              {/* Botón Final */}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#4A2C2A]">Total:</span>
                  <span className="text-3xl font-black text-[#4A2C2A]">${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#F3A1B5] text-[#4A2C2A] rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg hover:bg-[#ef8da7] disabled:bg-gray-200"
                >
                  <MessageCircle className="w-6 h-6" />
                  {isSubmitting ? 'Procesando...' : 'Confirmar por WhatsApp'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;