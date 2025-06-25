function PaymentPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Gracias ${name}, tu pago está siendo procesado. ¡Bienvenida al plan premium!`);
  };

  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Compra tu plan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Simulated Stripe Card Input */}
          <div className="p-4 border rounded bg-gray-50">
            <label className="block text-sm text-gray-600 mb-1">Número de tarjeta</label>
            <input type="text" placeholder="4242 4242 4242 4242" className="w-full p-2 border rounded bg-white" readOnly />

            <div className="mt-3 flex gap-3">
              <input type="text" placeholder="MM/AA" className="w-full p-2 border rounded bg-white" readOnly />
              <input type="text" placeholder="CVC" className="w-full p-2 border rounded bg-white" readOnly />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded transition"
          >
            Pagar $29.99/mes
          </button>
        </form>
      </div>
    </section>
  );
}