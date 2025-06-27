import React, { useState } from 'react';
import StripeCheckoutButton from './StripeCheckoutButton';

function PaymentPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Compra tu plan</h2>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Tu nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          {/* Aquí va el botón real de Stripe */}
          <StripeCheckoutButton />
        </form>
      </div>
    </section>
  );
}

export default PaymentPage;
