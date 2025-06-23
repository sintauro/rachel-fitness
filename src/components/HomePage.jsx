import React from 'react';

function HomePage({ setCurrentPage }) {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto text-center max-w-3xl">
        <img
          src="https://placehold.co/300x300/4f46e5/fff?text=Rachel+Coach"
          alt="Rachel Rondón - Entrenadora Personal"
          className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
        />
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">¡Hola! Soy Rachel Rondón</h2>
        <p className="text-lg text-gray-700 mb-6">
          Entrenadora personal certificada con más de 6 años ayudando a personas a alcanzar sus metas físicas y mejorar su salud.
        </p>
        <button
          onClick={() => setCurrentPage('payment')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
        >
          Comprar mi plan
        </button>
      </div>

      {/* Services Section */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-4">
        {[
          { title: "Entrenamiento Personal", desc: "Sesiones adaptadas a tus necesidades." },
          { title: "Programa Nutricional", desc: "Alimentación balanceada y personalizada." },
          { title: "Online & Presencial", desc: "Clases en vivo desde cualquier lugar." },
        ].map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
            <p className="text-gray-600 mt-2">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomePage;