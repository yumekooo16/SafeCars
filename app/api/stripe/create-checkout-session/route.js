// import { NextResponse } from 'next/server'
// import Stripe from 'stripe'

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY
// const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null

// const DEPOSIT_AMOUNT_EUR = Number(process.env.NEXT_PUBLIC_RESERVATION_DEPOSIT_EUR || 500)
// const HOLD_DURATION_HOURS = Number(process.env.NEXT_PUBLIC_RESERVATION_HOLD_HOURS || 48)
// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.safecars.fr'
// const STRIPE_DEPOSIT_PRICE_ID = process.env.STRIPE_DEPOSIT_PRICE_ID

// function buildError(message, status = 400) {
//   return NextResponse.json({ error: message }, { status })
// }

// export async function POST(request) {
//   if (!stripe) {
//     return buildError('Configuration Stripe manquante.', 500)
//   }

//   try {
//     const body = await request.json()
//     const requiredFields = ['vehicleId', 'vehicleName', 'firstName', 'lastName', 'email', 'phone']

//     const missingField = requiredFields.find((field) => !body?.[field])
//     if (missingField) {
//       return buildError(`Champ manquant: ${missingField}`)
//     }

//     if (!body.acceptedTerms) {
//       return buildError("Vous devez accepter les conditions d'arrhes.")
//     }

//     const lineItem = STRIPE_DEPOSIT_PRICE_ID
//       ? { price: STRIPE_DEPOSIT_PRICE_ID, quantity: 1 }
//       : {
//           price_data: {
//             currency: 'eur',
//             unit_amount: DEPOSIT_AMOUNT_EUR * 100,
//             product_data: {
//               name: 'Reservation vehicule SafeCars',
//               description: `${body.vehicleName} - blocage ${HOLD_DURATION_HOURS}h`,
//             },
//           },
//           quantity: 1,
//         }

//     const session = await stripe.checkout.sessions.create({
//       mode: 'payment',
//       customer_email: body.email,
//       billing_address_collection: 'required',
//       phone_number_collection: { enabled: true },
//       locale: 'fr',
//       line_items: [lineItem],
//       payment_intent_data: {
//         description: `Arrhes pour ${body.vehicleName}`,
//         metadata: {
//           vehicle_id: String(body.vehicleId),
//           vehicle_name: String(body.vehicleName),
//           customer_first_name: String(body.firstName),
//           customer_last_name: String(body.lastName),
//           customer_phone: String(body.phone),
//           hold_duration_hours: String(HOLD_DURATION_HOURS),
//           accepted_deposit_terms: 'true',
//         },
//       },
//       metadata: {
//         vehicle_id: String(body.vehicleId),
//         vehicle_name: String(body.vehicleName),
//         customer_full_name: `${body.firstName} ${body.lastName}`.trim(),
//         customer_phone: String(body.phone),
//       },
//       consent_collection: {
//         terms_of_service: 'required',
//       },
//       success_url: `${SITE_URL}/reservation-confirmee?session_id={CHECKOUT_SESSION_ID}&vehicule=${encodeURIComponent(body.vehicleName)}&depot=${DEPOSIT_AMOUNT_EUR}`,
//       cancel_url: `${SITE_URL}/vehicules/${encodeURIComponent(body.vehicleId)}?reservation=cancelled`,
//     })

//     return NextResponse.json({ url: session.url })
//   } catch (error) {
//     console.error('Stripe checkout error:', error)
//     return buildError('Erreur Stripe, merci de reessayer.', 500)
//   }
// }
