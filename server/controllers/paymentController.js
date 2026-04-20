const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const plans = require('../config/plans');


const createPaymentIntent = async (req, res) => {

    try{

        const { plan } = req.body;
        const planData = plans[plan];

        if(!planData) return res.status(400).json({message: 'Invalid plan'});

        const paymentIntent = await stripe.paymentIntents.create({
            amount: planData.price,
            currency: 'usd',
            metadata: {
                plan,
                userId: req.user.id,
            },
        });

        res.json({ clientSecret: paymentIntent.client_secret });

    } catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }

}


const handleWebhook = async (req, res) => {

    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {

        const paymentIntent = event.data.object;
        const { plan, userId } = paymentIntent.metadata;

        await User.findByIdAndUpdate(userId, {

            $inc: { credits: plans[plan].credits },
            $set: { plan: plan }

        });

    }

    res.json({ received: true });

}

module.exports = { createPaymentIntent, handleWebhook };