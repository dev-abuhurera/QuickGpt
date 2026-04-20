const plans = {

    basic: {
        name: 'Basic',
        credits: 100,
        price: 500,        // in cents — $5.00
        description: '100 Credits'
    },
    pro: {
        name: 'Pro',
        credits: 500,
        price: 1500,       // $15.00
        description: '500 Credits'
    },
    enterprise: {
        name: 'Enterprise',
        credits: 1500,
        price: 3999,       // $39.99
        description: '1500 Credits'
    }

}

module.exports = plans

