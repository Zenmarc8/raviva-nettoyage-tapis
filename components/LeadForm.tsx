import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { submitLead } from '../lib/store';
import type { LeadCategory } from '../types/database';

interface LeadFormProps {
  category: LeadCategory;
  defaultCity?: string;
}

export const LeadForm: React.FC<LeadFormProps> = ({ category, defaultCity = '' }) => {
  const { site, lang } = useSite();
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(defaultCity);
  const [serviceDetails, setServiceDetails] = useState('');
  const [consentPartnerSharing, setConsentPartnerSharing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const isCommercial = category === 'commercial';

  const t =
    lang === 'fr'
      ? {
          heading: isCommercial
            ? 'Demande de soumission commerciale (Contrat direct Raviva)'
            : 'Demande de soumission résidentielle (Partenaire indépendant)',
          disclosure: isCommercial
            ? `Cadre contractuel : Votre demande est traitée directement par ${site.brand_name}. Raviva conclut le contrat commercial, assure la facturation et dirige directement l'exécution des travaux.`
            : `Divulgation obligatoire : Pour le volet résidentiel, ${site.brand_name} agit uniquement comme plateforme de commercialisation et de mise en relation. Une entreprise partenaire indépendante vérifiée — dont l'identité vous sera communiquée au moment approprié — préparera la soumission, conclura le contrat, facturera et exécutera les travaux.`,
          fullName: 'Nom complet',
          companyName: "Nom de l'entreprise ou de l'immeuble",
          email: 'Courriel',
          phone: 'Téléphone',
          city: 'Municipalité (Grand Montréal)',
          cityPlaceholder: 'Sélectionnez ou inscrivez votre municipalité',
          details: isCommercial
            ? 'Description des locaux, superficie approximative (pi²) et type de revêtement'
            : 'Description des tapis, escaliers ou meubles à nettoyer',
          consentLabel:
            "Je comprends que Raviva Nettoyage de tapis agit uniquement comme intermédiaire de mise en relation pour le volet résidentiel et je consens explicitement à ce que mes coordonnées et les détails de ma demande soient transmis à une entreprise partenaire indépendante vérifiée afin qu'elle prépare ma soumission, conclue le contrat et exécute les travaux.",
          submit: isCommercial
            ? 'Envoyer ma demande commerciale à Raviva'
            : 'Transmettre ma demande au partenaire indépendant',
          submitting: 'Envoi en cours...',
          successTitle: 'Demande enregistrée',
          successDesc: isCommercial
            ? `Votre demande commerciale a été transmise à ${site.brand_name}.`
            : 'Votre demande résidentielle ainsi que votre consentement horodaté ont été enregistrés pour transmission à un partenaire indépendant vérifié.',
          newRequest: 'Soumettre une autre demande',
          errRequired: 'Veuillez remplir tous les champs obligatoires.',
          errEmail: 'Veuillez saisir une adresse courriel valide.',
          errConsent:
            'Vous devez cocher la case de consentement au partage avec le partenaire indépendant pour soumettre une demande résidentielle.',
        }
      : {
          heading: isCommercial
            ? 'Commercial Quote Request (Direct Raviva Contract)'
            : 'Residential Quote Request (Independent Partner)',
          disclosure: isCommercial
            ? `Contractual framework: Your inquiry is handled directly by ${site.brand_name}. Raviva signs the commercial contract, bills directly, and oversees the work.`
            : `Mandatory disclosure: For residential requests, ${site.brand_name} acts strictly as a marketing and matching platform. A verified independent partner company—whose identity will be disclosed to you at the appropriate time—will prepare the quote, enter into the contract, bill, and execute the work.`,
          fullName: 'Full name',
          companyName: 'Company or building name',
          email: 'Email address',
          phone: 'Phone number',
          city: 'Municipality (Greater Montreal)',
          cityPlaceholder: 'Select or enter your municipality',
          details: isCommercial
            ? 'Facility description, approximate square footage, and surface types'
            : 'Description of carpets, staircases, or upholstered furniture',
          consentLabel:
            'I understand that Raviva Nettoyage de tapis acts solely as a matching intermediary for residential services, and I explicitly consent to my contact and project details being shared with a verified independent partner company so they can prepare my quote, contract, and perform the work.',
          submit: isCommercial
            ? 'Send Commercial Request to Raviva'
            : 'Submit Residential Request to Independent Partner',
          submitting: 'Submitting...',
          successTitle: 'Request Recorded',
          successDesc: isCommercial
            ? `Your commercial inquiry has been received by ${site.brand_name}.`
            : 'Your residential inquiry and timestamped consent have been recorded for matching with a verified independent partner.',
          newRequest: 'Submit another request',
          errRequired: 'Please complete all required fields.',
          errEmail: 'Please enter a valid email address.',
          errConsent:
            'You must check the independent partner sharing consent box before submitting a residential request.',
        };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !city.trim() ||
      !serviceDetails.trim() ||
      (isCommercial && !companyName.trim())
    ) {
      setErrorMsg(t.errRequired);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg(t.errEmail);
      return;
    }

    if (!isCommercial && !consentPartnerSharing) {
      setErrorMsg(t.errConsent);
      return;
    }

    setSubmitting(true);
    try {
      const saved = await submitLead({
        site_id: site.id,
        category,
        full_name: fullName.trim(),
        company_name: isCommercial ? companyName.trim() : null,
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim(),
        service_details: serviceDetails.trim(),
        consent_partner_sharing: isCommercial ? false : true,
        consent_timestamp: isCommercial ? null : new Date().toISOString(),
      });
      setSubmittedId(saved.id);
      setFullName('');
      setCompanyName('');
      setEmail('');
      setPhone('');
      setCity(defaultCity);
      setServiceDetails('');
      setConsentPartnerSharing(false);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Erreur lors de la soumission.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedId) {
    return (
      <div
        role="status"
        className="p-6 bg-white a11y-surface rounded-lg border border-slate-200"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{t.successTitle}</h3>
            <p className="mt-1 text-sm text-slate-600 a11y-muted">{t.successDesc}</p>
            <button
              type="button"
              onClick={() => setSubmittedId(null)}
              className="mt-4 px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              {t.newRequest}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 md:p-8 bg-white a11y-surface rounded-lg border border-slate-200 space-y-5"
    >
      <div>
        <h3 className="text-xl font-semibold text-slate-900">{t.heading}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-700 a11y-muted p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          {t.disclosure}
        </p>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-900"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`lead-name-${category}`}
            className="block text-sm font-medium text-slate-900 mb-1.5"
          >
            {t.fullName} *
          </label>
          <input
            id={`lead-name-${category}`}
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm"
          />
        </div>

        {isCommercial && (
          <div>
            <label
              htmlFor={`lead-company-${category}`}
              className="block text-sm font-medium text-slate-900 mb-1.5"
            >
              {t.companyName} *
            </label>
            <input
              id={`lead-company-${category}`}
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm"
            />
          </div>
        )}

        <div>
          <label
            htmlFor={`lead-email-${category}`}
            className="block text-sm font-medium text-slate-900 mb-1.5"
          >
            {t.email} *
          </label>
          <input
            id={`lead-email-${category}`}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor={`lead-phone-${category}`}
            className="block text-sm font-medium text-slate-900 mb-1.5"
          >
            {t.phone} *
          </label>
          <input
            id={`lead-phone-${category}`}
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm"
          />
        </div>

        <div className={isCommercial ? 'md:col-span-2' : ''}>
          <label
            htmlFor={`lead-city-${category}`}
            className="block text-sm font-medium text-slate-900 mb-1.5"
          >
            {t.city} *
          </label>
          <input
            id={`lead-city-${category}`}
            type="text"
            list={`municipalities-list-${category}`}
            required
            placeholder={t.cityPlaceholder}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm"
          />
          <datalist id={`municipalities-list-${category}`}>
            {site.served_municipalities.map((m) => (
              <option key={m} value={m} />
            ))}
          </datalist>
        </div>
      </div>

      <div>
        <label
          htmlFor={`lead-details-${category}`}
          className="block text-sm font-medium text-slate-900 mb-1.5"
        >
          {t.details} *
        </label>
        <textarea
          id={`lead-details-${category}`}
          rows={4}
          required
          value={serviceDetails}
          onChange={(e) => setServiceDetails(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm"
        />
      </div>

      {!isCommercial && (
        <label className="flex items-start gap-3 p-4 rounded-lg border border-slate-300 bg-slate-50 cursor-pointer">
          <input
            type="checkbox"
            checked={consentPartnerSharing}
            onChange={(e) => setConsentPartnerSharing(e.target.checked)}
            className="mt-1 h-4 w-4 accent-slate-900 shrink-0"
          />
          <span className="text-xs leading-relaxed text-slate-800">{t.consentLabel}</span>
        </label>
      )}

      <button
        type="submit"
        disabled={submitting || (!isCommercial && !consentPartnerSharing)}
        className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-50"
        style={{ backgroundColor: 'var(--brand-primary)' }}
      >
        {submitting ? t.submitting : t.submit}
      </button>
    </form>
  );
};
