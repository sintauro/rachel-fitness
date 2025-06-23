import React from 'react';

function RoutinesPage() {
  const routines = [
    { day: "Lunes", focus: "Pecho & Triceps", time: "45 minutos" },
    { day: "Martes", focus: "Espalda & Biceps", time: "45 minutos" },
    { day: "Miércoles", focus: "Piernas", time: "50 minutos" },
    { day: "Jueves", focus: "Hombros & Abs", time: "40 minutos" },
    { day: "Viernes", focus: "Cardio Intenso", time: "30 minutos" },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Rutinas Semanales</h2>
        <ul className="space-y-4">
          {routines.map((routine, i) => (
            <li key={i} className="border-l-4 border-indigo-500 pl-4 py-3 bg-gray-50 rounded shadow-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">{routine.day}</span>
                <span className="text-sm text-gray-500">{routine.time}</span>
              </div>
              <p className="text-indigo-600">{routine.focus}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default RoutinesPage;