'use client';

import { useState } from 'react';
import Header from '@/components/allpages/Header';
import Footer from '@/components/allpages/Footer';
import PageHero from '@/components/ui/PageHero';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Veuillez entrer une adresse email valide');
      }

      const { error: supabaseError } = await supabase.from('contact_messages').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message,
          status: 'new',
          priority: 'normal',
        },
      ]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sc-page">
      <Header />
      <PageHero
        kicker="Contact"
        title="Parlons de votre projet"
        subtitle="Une question, un essai, une reprise ou un devis lavage — nous répondons rapidement."
      />

      <section className="sc-container pb-20 -mt-2">
        <div className="grid lg:grid-cols-[1fr_18rem] gap-12 lg:gap-16 items-start">
          <div className="sc-card sc-card-padded">
            <h2 className="sc-display text-2xl mb-6">Envoyer un message</h2>

            {success && (
              <p className="mb-6 text-sm text-[#86efac] border border-[color-mix(in_srgb,#22c55e_30%,transparent)] rounded-[var(--radius)] p-4">
                Message envoyé — nous vous répondrons dans les plus brefs délais.
              </p>
            )}
            {error && (
              <p className="mb-6 text-sm text-[#fca5a5] border border-[color-mix(in_srgb,#ef4444_30%,transparent)] rounded-[var(--radius)] p-4">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="text-sm sc-muted mb-2 block">Nom complet *</span>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="sc-input" placeholder="Jean Dupont" />
              </label>
              <label className="block">
                <span className="text-sm sc-muted mb-2 block">Email *</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="sc-input" placeholder="jean.dupont@email.com" />
              </label>
              <label className="block">
                <span className="text-sm sc-muted mb-2 block">Téléphone</span>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="sc-input" placeholder="06 12 34 56 78" />
              </label>
              <label className="block">
                <span className="text-sm sc-muted mb-2 block">Sujet *</span>
                <select name="subject" value={formData.subject} onChange={handleChange} required className="sc-input">
                  <option value="">Sélectionnez un sujet</option>
                  <option value="Achat de véhicule">Achat de véhicule</option>
                  <option value="Essai routier">Essai routier</option>
                  <option value="Reprise auto">Reprise auto</option>
                  <option value="Financement">Financement</option>
                  <option value="Lavage auto">Lavage auto</option>
                  <option value="Autre demande">Autre demande</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm sc-muted mb-2 block">Message *</span>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} className="sc-input resize-none" placeholder="Décrivez votre projet…" />
              </label>
              <button type="submit" disabled={loading} className="sc-btn sc-btn-primary w-full justify-center disabled:opacity-50">
                {loading ? 'Envoi…' : 'Envoyer le message'}
              </button>
              <p className="text-xs sc-muted text-center">En soumettant ce formulaire, vous acceptez notre politique de confidentialité.</p>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="sc-card sc-card-padded">
              <p className="text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-subtle)] mb-3">Coordonnées</p>
              <p className="sc-display text-2xl">Sanguinet</p>
              <p className="text-sm sc-muted mt-1">40460 · Landes</p>
              <a href="tel:+33769803889" className="block mt-4 text-[var(--text)] hover:text-[var(--silver)] transition-colors">
                07 69 80 38 89
              </a>
              <a href="mailto:contact@safecars.fr" className="block mt-1 text-[var(--text)] hover:text-[var(--silver)] transition-colors">
                contact@safecars.fr
              </a>
            </div>
            <div className="sc-card sc-card-padded">
              <p className="text-[0.6875rem] tracking-[0.14em] uppercase text-[var(--text-subtle)] mb-3">Horaires</p>
              <ul className="text-sm sc-muted space-y-2">
                <li className="flex justify-between gap-4"><span>Lun – Ven</span><span className="text-[var(--text)]">9h – 19h</span></li>
                <li className="flex justify-between gap-4"><span>Samedi</span><span className="text-[var(--text)]">9h – 12h</span></li>
                <li className="flex justify-between gap-4"><span>Dimanche</span><span className="text-[var(--silver)]">Fermé</span></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
