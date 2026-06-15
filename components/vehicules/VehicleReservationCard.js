 'use client'

import { useMemo, useState } from 'react'

const DEPOSIT_AMOUNT_EUR = Number(process.env.NEXT_PUBLIC_RESERVATION_DEPOSIT_EUR || 500)
const HOLD_DURATION_HOURS = Number(process.env.NEXT_PUBLIC_RESERVATION_HOLD_HOURS || 48)

function formatVehicleName(vehicle) {
	return [vehicle?.marque, vehicle?.modele, vehicle?.annee].filter(Boolean).join(' ')
}

export default function VehicleReservationCard({ vehicle }) {
	const vehicleName = useMemo(() => formatVehicleName(vehicle), [vehicle])
	const [formState, setFormState] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		acceptedTerms: false,
	})
	const [errorMessage, setErrorMessage] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const onFieldChange = (event) => {
		const { name, type, checked, value } = event.target
		setFormState((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		// Stripe temporarily disabled to allow repository push/build.
		setErrorMessage('Réservation temporairement désactivée. Merci de réessayer plus tard.')
		setIsSubmitting(false)
	}

	return (
		<section className="mt-10 rounded-2xl border border-blue-500/50 bg-gradient-to-b from-blue-500/10 to-black p-6 sm:p-8">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<p className="text-xs uppercase tracking-[0.2em] text-blue-300">Reservation rapide en ligne</p>
					<h2 className="mt-2 text-2xl font-black sm:text-3xl">Reserver ce vehicule en ligne</h2>
					<p className="mt-2 text-white/80">
						Réservez ce véhicule en ligne pour <strong>{DEPOSIT_AMOUNT_EUR} EUR d&apos;arrhes</strong>.
					</p>
					<p className="mt-1 text-sm text-white/70">
						Ce montant permet de bloquer le véhicule pendant {HOLD_DURATION_HOURS}h.
					</p>
				</div>
				<div className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white/80">
					<p className="font-semibold text-white">Paiement (désactivé)</p>
					<p className="mt-1">Service temporairement indisponible</p>
				</div>
			</div>

			<form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
				<label className="block">
					<span className="mb-2 block text-sm font-semibold text-white/90">Prenom</span>
					<input
						required
						type="text"
						name="firstName"
						value={formState.firstName}
						onChange={onFieldChange}
						className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-blue-400 focus:outline-none"
						placeholder="Votre prenom"
					/>
				</label>

				<label className="block">
					<span className="mb-2 block text-sm font-semibold text-white/90">Nom</span>
					<input
						required
						type="text"
						name="lastName"
						value={formState.lastName}
						onChange={onFieldChange}
						className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-blue-400 focus:outline-none"
						placeholder="Votre nom"
					/>
				</label>

				<label className="block">
					<span className="mb-2 block text-sm font-semibold text-white/90">Email</span>
					<input
						required
						type="email"
						name="email"
						value={formState.email}
						onChange={onFieldChange}
						className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-blue-400 focus:outline-none"
						placeholder="vous@exemple.fr"
					/>
				</label>

				<label className="block">
					<span className="mb-2 block text-sm font-semibold text-white/90">Telephone</span>
					<input
						required
						type="tel"
						name="phone"
						value={formState.phone}
						onChange={onFieldChange}
						className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-blue-400 focus:outline-none"
						placeholder="06 00 00 00 00"
					/>
				</label>

				<div className="sm:col-span-2 rounded-lg border border-white/10 bg-black/30 p-4">
					<p className="text-sm text-white/70">Vehicule concerne</p>
					<p className="mt-1 text-lg font-semibold text-white">{vehicleName}</p>
				</div>

				<label className="sm:col-span-2 flex items-start gap-3 rounded-lg border border-white/15 bg-black/30 p-4 text-sm">
					<input
						required
						type="checkbox"
						name="acceptedTerms"
						checked={formState.acceptedTerms}
						onChange={onFieldChange}
						className="mt-1 h-4 w-4 rounded border-white/30 bg-black/30 text-blue-500 focus:ring-blue-400"
					/>
					<span className="text-white/85">
						Je comprends que je verse des arrhes pour reserver ce vehicule.
						<br />
						Les arrhes permettent de reserver le vehicule pendant {HOLD_DURATION_HOURS}h. En cas d&apos;annulation,
						les conditions de remboursement precisees par SafeCars s&apos;appliquent.
					</span>
				</label>

				<button
					type="button"
					disabled
					className="sm:col-span-2 inline-flex items-center justify-center rounded-xl bg-gray-600 px-8 py-4 text-center text-base font-bold text-white"
				>
					Service désactivé
				</button>

				{errorMessage ? <p className="sm:col-span-2 text-sm text-red-400">{errorMessage}</p> : null}
			</form>

			<div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/60">
				<span className="rounded border border-white/20 px-2 py-1">Visa</span>
				<span className="rounded border border-white/20 px-2 py-1">Mastercard</span>
				<span className="rounded border border-white/20 px-2 py-1">Apple Pay</span>
				<span className="rounded border border-white/20 px-2 py-1">Paiement securise</span>
			</div>
		</section>
	)
}
