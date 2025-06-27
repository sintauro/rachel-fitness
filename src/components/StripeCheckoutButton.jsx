import React from 'react';

function StripeCheckoutButton() {
  const handleCheckout = async () => {
    const stripe = await window.Stripe('pk_test_51RaRSUQVDRAxGrvjF82dLOCtb7uJhCGYZjWqeOWLzPnQsqqBQ9opzebcEf53xCjZjZBdZ675rCbDAfPduKR8anrV002Jg46jWK'); //

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1ReTfNQVDRAxGrvjZqqiedXK', // 
          quantity: 1,
        },
      ],
      mode: 'subscription', // o 'payment' si es pago único
      successUrl: window.location.origin + '?success=true',
      cancelUrl: window.location.origin + '?canceled=true',
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded"
    >
      Pagar con Stripe
    </button>
  );
}

export default StripeCheckoutButton;
