const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// CORS Configuration
const allowedOrigins = [];
if (process.env.NODE_ENV === 'production') {
  // Replace with your actual Netlify frontend URL in your .env or Railway environment variables
  const frontendURL = process.env.FRONTEND_URL || 'https://YOUR_RACHEL_FITNESS_APP.netlify.app'; // Fallback placeholder
  allowedOrigins.push(frontendURL);
} else {
  // Development environment
  allowedOrigins.push('http://localhost:5173'); // Vite default
  allowedOrigins.push('http://localhost:3000'); // Common React dev port
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};
app.use(cors(corsOptions));
app.use(express.json());

// Define a rate limiter for the payment intent creation
const createPaymentIntentLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 15, // Limit each IP to 15 requests per windowMs
  message: { error: 'Too many payment attempts from this IP, please try again after 5 minutes.' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Ruta para crear Payment Intent
app.post(
  '/create-payment-intent',
  createPaymentIntentLimiter, // Apply the rate limiter
  [
    body('amount')
      .isInt({ gt: 0 })
      .withMessage('Amount must be a positive integer representing cents.'),
    body('currency')
      .isIn(['usd'])
      .withMessage('Currency must be "usd".'),
    body('metadata.customer_email')
      .optional()
      .isEmail()
      .withMessage('Invalid customer email format.'),
    body('metadata.product')
      .optional()
      .notEmpty()
      .isString()
      .withMessage('Product name must be a non-empty string.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, currency = 'usd', metadata = {} } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount), // Already validated as int, Math.round is belt-and-suspenders
        currency, // Already validated
        automatic_payment_methods: {
          enabled: true,
      },
      metadata,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe Payment Intent Error:', error.message); // Log the detailed Stripe error
    // Send a more generic error to the client, unless it's a specific type of error Stripe expects the client to handle.
    // For now, a generic message is safer. Stripe's client-side SDK might also catch and interpret Stripe-specific error codes.
    res.status(500).json({ error: 'An error occurred while processing your payment. Please try again.' });
  }
});

// Ruta para el webhook de Stripe
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log(`PaymentIntent for ${paymentIntentSucceeded.amount} was successful! Metadata:`, paymentIntentSucceeded.metadata);
      break;
    case 'payment_intent.payment_failed':
      const paymentIntentFailed = event.data.object;
      console.log(`PaymentIntent failed: ${paymentIntentFailed.last_payment_error?.message}. Metadata:`, paymentIntentFailed.metadata);
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.json({ received: true });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
