import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, ImagePlus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { ACTIVE_SERVICES, ServiceId } from '../../config/services.config';
import { validateCanadianPostalCode } from '../../config/locations.config';
import { SITE_CONFIG } from '../../config/site.config';
import { useTranslation } from '../../context/LanguageContext';

interface QuoteWizardProps {
  initialServiceId?: ServiceId | null;
  compact?: boolean;
  onSuccessClose?: () => void;
}

interface UploadedPhoto {
  id: string;
  file: File;
  previewUrl: string;
}

function formatCanadianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export const QuoteWizard: React.FC<QuoteWizardProps> = ({
  initialServiceId = null,
  compact = false,
  onSuccessClose,
}) => {
  const { locale, t } = useTranslation();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 6;

  // Step 1: Sector, Primary Need & Services
  const [sector, setSector] = useState<'residential' | 'commercial'>('residential');
  const [primaryNeed, setPrimaryNeed] = useState<string>('tapis');
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>(
    initialServiceId ? [initialServiceId] : ['wall-to-wall-carpet']
  );

  // Step 2: Property type
  const [propertyType, setPropertyType] = useState<string>('house');

  // Step 3: Specific needs
  const [specificNeeds, setSpecificNeeds] = useState<string[]>([]);

  // Step 4: Quantities
  const [roomsCount, setRoomsCount] = useState<string>('3');
  const [stairsCount, setStairsCount] = useState<string>('0');
  const [areaSqFt, setAreaSqFt] = useState<string>('');
  const [sofaSeats, setSofaSeats] = useState<string>('0');
  const [notes, setNotes] = useState<string>('');

  // Step 5: Timeframe
  const [timeframe, setTimeframe] = useState<string>('next-2-weeks');
  const [preferredDate, setPreferredDate] = useState<string>('');

  // Step 6: Contact + Photos + Consents
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [consentLoi25, setConsentLoi25] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (initialServiceId && !selectedServices.includes(initialServiceId)) {
      setSelectedServices([initialServiceId]);
    }
  }, [initialServiceId]);

  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
  }, [photos]);

  const postalStatus = postalCode.trim().length >= 6 ? validateCanadianPostalCode(postalCode) : null;

  const handleNeedCategorySelect = (catId: string, serviceIds: string[]) => {
    setPrimaryNeed(catId);
    const validIds = serviceIds.filter((id): id is ServiceId =>
      ACTIVE_SERVICES.some((s) => s.id === id)
    );
    if (validIds.length > 0) {
      setSelectedServices(validIds);
      setErrors((prev) => ({ ...prev, services: '' }));
    }
  };

  const toggleService = (id: ServiceId) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setErrors((prev) => ({ ...prev, services: '' }));
  };

  const toggleNeed = (id: string) => {
    setSpecificNeeds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    if (photos.length + files.length > 5) {
      setPhotoError(t.quoteForm.fields.photosTooMany);
      e.target.value = '';
      return;
    }

    const oversized = files.find((f) => f.size > 5 * 1024 * 1024);
    if (oversized) {
      setPhotoError(t.quoteForm.fields.photosTooLarge);
      e.target.value = '';
      return;
    }

    const added: UploadedPhoto[] = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...added]);
    e.target.value = '';
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  const validateCurrentStep = (targetStep: number): boolean => {
    const nextErrors: Record<string, string> = {};

    if (targetStep === 1 && selectedServices.length === 0) {
      nextErrors.services = t.quoteForm.errors.selectOneService;
    }
    if (targetStep === 2 && !propertyType) {
      nextErrors.propertyType = t.quoteForm.errors.selectProperty;
    }
    if (targetStep === 6) {
      if (!firstName.trim()) nextErrors.firstName = t.quoteForm.errors.firstNameRequired;
      if (!lastName.trim()) nextErrors.lastName = t.quoteForm.errors.lastNameRequired;
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) nextErrors.phone = t.quoteForm.errors.phoneInvalid;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        nextErrors.email = t.quoteForm.errors.emailInvalid;
      }
      if (!city.trim()) nextErrors.city = t.quoteForm.errors.cityRequired;
      const postalCheck = validateCanadianPostalCode(postalCode);
      if (!postalCheck.isValidFormat) {
        nextErrors.postalCode = t.quoteForm.errors.postalInvalid;
      }
      if (!consentLoi25) {
        nextErrors.consentLoi25 = t.quoteForm.errors.consentRequired;
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep(step)) {
      setStep((s) => Math.min(totalSteps, s + 1));
    }
  };

  const handlePrev = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep(6)) return;

    setIsSubmitting(true);
    const postalCheck = validateCanadianPostalCode(postalCode);

    const payload = {
      locale,
      source: compact ? 'quick_modal' : 'wizard',
      sector,
      primary_need: primaryNeed,
      selected_services: selectedServices,
      property_type: propertyType,
      specific_needs: specificNeeds,
      quantity_details: {
        rooms: roomsCount,
        stairs: stairsCount,
        areaSqFt,
        sofaSeats,
        notes,
      },
      preferred_timeframe: timeframe,
      preferred_date: preferredDate || null,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city: city.trim(),
      postal_code: postalCheck.normalized,
      in_service_zone: postalCheck.inServiceZone,
      photo_count: photos.length,
      consent_loi25: consentLoi25,
      consent_marketing: consentMarketing,
      submitted_at: new Date().toISOString(),
    };

    try {
      try {
        const existing = JSON.parse(localStorage.getItem('raviva_recent_quotes') || '[]');
        existing.unshift(payload);
        localStorage.setItem('raviva_recent_quotes', JSON.stringify(existing.slice(0, 15)));
      } catch {
        // Ignore local storage fallback error
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

      if (supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project')) {
        await fetch(`${supabaseUrl}/rest/v1/quote_requests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify(payload),
        });
      }

      const refCode = `RV-${Date.now().toString().slice(-6)}`;
      setSubmittedRef(refCode);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetWizard = () => {
    setSubmittedRef(null);
    setStep(1);
    setErrors({});
    setConsentLoi25(false);
    setConsentMarketing(false);
    setPhotos([]);
  };

  if (submittedRef) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-emerald-200 bg-[#f4f7f5] p-6 sm:p-8"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#0b3d2e]" aria-hidden="true" />
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900">
              {t.quoteForm.successTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{t.quoteForm.successBody}</p>
            <p className="mt-3 font-mono text-xs font-semibold text-[#0b3d2e] tabular-nums">
              Ref: {submittedRef}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={resetWizard}
                className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                {t.quoteForm.newRequestBtn}
              </button>
              {onSuccessClose && (
                <button
                  type="button"
                  onClick={onSuccessClose}
                  className="min-h-[44px] rounded-lg bg-[#0b3d2e] px-5 py-2 text-sm font-semibold text-white hover:bg-[#082d22]"
                >
                  {t.a11y.closeModal}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span className="tabular-nums">
            {t.quoteForm.stepOf
              .replace('{current}', String(step))
              .replace('{total}', String(totalSteps))}
          </span>
          <span className="tabular-nums">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
        >
          <div
            className="h-full bg-[#0b3d2e] transition-all duration-200"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <fieldset className="space-y-5">
          <div>
            <legend className="font-display text-lg font-bold text-slate-900">
              {t.quoteForm.steps.s1Title}
            </legend>
            <p className="mt-1 text-sm text-slate-600">{t.quoteForm.steps.s1Subtitle}</p>
          </div>

          {/* Direct Sector Selector (Residential / Commercial) */}
          <div>
            <span className="block text-xs font-bold text-slate-700">
              {t.quoteForm.sectorLabel}
            </span>
            <div className="mt-2 grid grid-cols-2 gap-2.5">
              {t.quoteForm.sectors.map((sec) => {
                const active = sector === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setSector(sec.id);
                      if (sec.id === 'commercial') {
                        setPropertyType('commercial');
                      } else if (propertyType === 'commercial') {
                        setPropertyType('house');
                      }
                    }}
                    className={`min-h-[44px] rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? 'border-[#0b3d2e] bg-[#0b3d2e] text-white'
                        : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {sec.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Need Quick Selector */}
          <div>
            <span className="block text-xs font-bold text-slate-700">
              {t.quoteForm.needCategoryLabel}
            </span>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {t.quoteForm.needCategories.map((cat) => {
                const active = primaryNeed === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleNeedCategorySelect(cat.id, cat.serviceIds)}
                    className={`min-h-[42px] rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                      active
                        ? 'border-[#0b3d2e] bg-[#f4f7f5] text-[#0b3d2e]'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {ACTIVE_SERVICES.map((srv) => {
              const checked = selectedServices.includes(srv.id);
              return (
                <label
                  key={srv.id}
                  className={`flex min-h-[48px] cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition-colors ${
                    checked
                      ? 'border-[#0b3d2e] bg-[#f4f7f5]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleService(srv.id)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0b3d2e] focus:ring-[#0b3d2e]"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-slate-900">
                      {t.services[srv.id].title}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-600">
                      {srv.indicativePrice[locale]}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
          {errors.services && (
            <p role="alert" className="flex items-center gap-1.5 text-sm font-medium text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errors.services}</span>
            </p>
          )}
        </fieldset>
      )}

      {/* Step 2: Property Type */}
      {step === 2 && (
        <fieldset className="space-y-4">
          <legend className="font-display text-lg font-bold text-slate-900">
            {t.quoteForm.steps.s2Title}
          </legend>
          <p className="text-sm text-slate-600">{t.quoteForm.steps.s2Subtitle}</p>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {t.quoteForm.propertyTypes.map((prop) => {
              const checked = propertyType === prop.id;
              return (
                <label
                  key={prop.id}
                  className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-colors ${
                    checked
                      ? 'border-[#0b3d2e] bg-[#f4f7f5]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="propertyType"
                    value={prop.id}
                    checked={checked}
                    onChange={() => {
                      setPropertyType(prop.id);
                      setErrors({});
                    }}
                    className="h-4 w-4 border-slate-300 text-[#0b3d2e] focus:ring-[#0b3d2e]"
                  />
                  <span className="text-sm font-semibold text-slate-900">{prop.label}</span>
                </label>
              );
            })}
          </div>
          {errors.propertyType && (
            <p role="alert" className="flex items-center gap-1.5 text-sm font-medium text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errors.propertyType}</span>
            </p>
          )}
        </fieldset>
      )}

      {/* Step 3: Specific Needs */}
      {step === 3 && (
        <fieldset className="space-y-4">
          <legend className="font-display text-lg font-bold text-slate-900">
            {t.quoteForm.steps.s3Title}
          </legend>
          <p className="text-sm text-slate-600">{t.quoteForm.steps.s3Subtitle}</p>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {t.quoteForm.specificNeeds.map((need) => {
              const checked = specificNeeds.includes(need.id);
              return (
                <label
                  key={need.id}
                  className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-colors ${
                    checked
                      ? 'border-[#0b3d2e] bg-[#f4f7f5]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleNeed(need.id)}
                    className="h-4 w-4 rounded border-slate-300 text-[#0b3d2e] focus:ring-[#0b3d2e]"
                  />
                  <span className="text-sm font-medium text-slate-900">{need.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Step 4: Quantities & Dimensions */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              {t.quoteForm.steps.s4Title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{t.quoteForm.steps.s4Subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="qw-rooms" className="block text-sm font-semibold text-slate-800">
                {t.quoteForm.quantities.roomsLabel}
              </label>
              <input
                id="qw-rooms"
                type="number"
                min="0"
                max="50"
                value={roomsCount}
                onChange={(e) => setRoomsCount(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="qw-stairs" className="block text-sm font-semibold text-slate-800">
                {t.quoteForm.quantities.stairsLabel}
              </label>
              <input
                id="qw-stairs"
                type="number"
                min="0"
                max="100"
                value={stairsCount}
                onChange={(e) => setStairsCount(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 tabular-nums"
              />
            </div>
            <div>
              <label htmlFor="qw-area" className="block text-sm font-semibold text-slate-800">
                {t.quoteForm.quantities.areaSqFtLabel}
              </label>
              <input
                id="qw-area"
                type="text"
                placeholder="Ex. 8 x 10 pi / 600 sq.ft."
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label htmlFor="qw-sofa" className="block text-sm font-semibold text-slate-800">
                {t.quoteForm.quantities.sofaSeatsLabel}
              </label>
              <input
                id="qw-sofa"
                type="number"
                min="0"
                max="30"
                value={sofaSeats}
                onChange={(e) => setSofaSeats(e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 tabular-nums"
              />
            </div>
          </div>

          <div>
            <label htmlFor="qw-notes" className="block text-sm font-semibold text-slate-800">
              {t.quoteForm.quantities.notesLabel}
            </label>
            <textarea
              id="qw-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.quoteForm.quantities.notesPlaceholder}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900"
            />
          </div>
        </div>
      )}

      {/* Step 5: Timeframe */}
      {step === 5 && (
        <fieldset className="space-y-4">
          <legend className="font-display text-lg font-bold text-slate-900">
            {t.quoteForm.steps.s5Title}
          </legend>
          <p className="text-sm text-slate-600">{t.quoteForm.steps.s5Subtitle}</p>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {t.quoteForm.timeframes.map((tf) => {
              const checked = timeframe === tf.id;
              return (
                <label
                  key={tf.id}
                  className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-colors ${
                    checked
                      ? 'border-[#0b3d2e] bg-[#f4f7f5]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="timeframe"
                    value={tf.id}
                    checked={checked}
                    onChange={() => setTimeframe(tf.id)}
                    className="h-4 w-4 border-slate-300 text-[#0b3d2e] focus:ring-[#0b3d2e]"
                  />
                  <span className="text-sm font-semibold text-slate-900">{tf.label}</span>
                </label>
              );
            })}
          </div>

          <div className="max-w-xs">
            <label htmlFor="qw-date" className="block text-sm font-semibold text-slate-800">
              {t.quoteForm.preferredDateLabel}
            </label>
            <input
              id="qw-date"
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
            />
          </div>
        </fieldset>
      )}

      {/* Step 6: Contact + Photos + Loi 25 Consent */}
      {step === 6 && (
        <div className="space-y-5">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              {t.quoteForm.steps.s6Title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{t.quoteForm.steps.s6Subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="qw-fname" className="block text-sm font-semibold text-slate-800">
                {t.quoteForm.fields.firstName} <span aria-hidden="true">*</span>
              </label>
              <input
                id="qw-fname"
                type="text"
                autoComplete="given-name"
                aria-required="true"
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={errors.firstName ? 'qw-fname-err' : undefined}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors((p) => ({ ...p, firstName: '' }));
                }}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
              />
              {errors.firstName && (
                <p id="qw-fname-err" role="alert" className="mt-1 text-xs font-medium text-red-700">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="qw-lname" className="block text-sm font-semibold text-slate-800">
                {t.quoteForm.fields.lastName} <span aria-hidden="true">*</span>
              </label>
              <input
                id="qw-lname"
                type="text"
                autoComplete="family-name"
                aria-required="true"
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={errors.lastName ? 'qw-lname-err' : undefined}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors((p) => ({ ...p, lastName: '' }));
                }}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
              />
              {errors.lastName && (
                <p id="qw-lname-err" role="alert" className="mt-1 text-xs font-medium text-red-700">
                  {errors.lastName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="qw-phone" className="block text-sm font-semibold text-slate-800">
                {t.quoteForm.fields.phone} <span aria-hidden="true">*</span>
              </label>
              <input
                id="qw-phone"
                type="tel"
                autoComplete="tel"
                placeholder="(514) 555-0123"
                aria-required="true"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'qw-phone-err' : undefined}
                value={phone}
                onChange={(e) => {
                  setPhone(formatCanadianPhone(e.target.value));
                  setErrors((p) => ({ ...p, phone: '' }));
                }}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 tabular-nums"
              />
              {errors.phone && (
                <p id="qw-phone-err" role="alert" className="mt-1 text-xs font-medium text-red-700">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="qw-email" className="block text-sm font-semibold text-slate-800">
                {t.quoteForm.fields.email} <span aria-hidden="true">*</span>
              </label>
              <input
                id="qw-email"
                type="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'qw-email-err' : undefined}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((p) => ({ ...p, email: '' }));
                }}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
              />
              {errors.email && (
                <p id="qw-email-err" role="alert" className="mt-1 text-xs font-medium text-red-700">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="qw-city" className="block text-sm font-semibold text-slate-800">
                {t.quoteForm.fields.city} <span aria-hidden="true">*</span>
              </label>
              <input
                id="qw-city"
                type="text"
                autoComplete="address-level2"
                placeholder="Ex. Montréal, Laval, Brossard"
                aria-required="true"
                aria-invalid={Boolean(errors.city)}
                aria-describedby={errors.city ? 'qw-city-err' : undefined}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setErrors((p) => ({ ...p, city: '' }));
                }}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
              />
              {errors.city && (
                <p id="qw-city-err" role="alert" className="mt-1 text-xs font-medium text-red-700">
                  {errors.city}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="qw-postal" className="block text-sm font-semibold text-slate-800">
                {t.quoteForm.fields.postalCode} <span aria-hidden="true">*</span>
              </label>
              <input
                id="qw-postal"
                type="text"
                autoComplete="postal-code"
                placeholder="H2X 1Y4"
                maxLength={7}
                aria-required="true"
                aria-invalid={Boolean(errors.postalCode)}
                aria-describedby={errors.postalCode ? 'qw-postal-err' : undefined}
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value.toUpperCase());
                  setErrors((p) => ({ ...p, postalCode: '' }));
                }}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase text-slate-900"
              />
              {errors.postalCode && (
                <p id="qw-postal-err" role="alert" className="mt-1 text-xs font-medium text-red-700">
                  {errors.postalCode}
                </p>
              )}
              {postalStatus && postalStatus.isValidFormat && !postalStatus.inServiceZone && (
                <p className="mt-1.5 text-xs text-amber-800">{t.quoteForm.outOfZoneNotice}</p>
              )}
            </div>
          </div>

          {/* Photo Upload (max 5 files, 5MB each) */}
          {SITE_CONFIG.features.enablePhotoUpload && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <label htmlFor="qw-photos" className="block text-sm font-semibold text-slate-900">
                    {t.quoteForm.fields.photosLabel}
                  </label>
                  <p className="mt-0.5 text-xs text-slate-600">{t.quoteForm.fields.photosHint}</p>
                </div>
                <label
                  htmlFor="qw-photos"
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 shrink-0"
                >
                  <ImagePlus className="h-4 w-4 text-[#0b3d2e]" aria-hidden="true" />
                  <span>{t.quoteForm.fields.photosBtn}</span>
                </label>
                <input
                  id="qw-photos"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handlePhotoChange}
                  className="sr-only"
                />
              </div>

              {photoError && (
                <p role="alert" className="mt-2 text-xs font-medium text-red-700">
                  {photoError}
                </p>
              )}

              {photos.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative h-20 w-20 overflow-hidden rounded-lg border border-slate-200 bg-white"
                    >
                      <img
                        src={photo.previewUrl}
                        alt={photo.file.name}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        aria-label={`Remove ${photo.file.name}`}
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Separate Loi 25 Consent Checkboxes */}
          <div className="space-y-3 border-t border-slate-200 pt-4">
            <div>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={consentLoi25}
                  aria-required="true"
                  aria-invalid={Boolean(errors.consentLoi25)}
                  aria-describedby={errors.consentLoi25 ? 'qw-consent-err' : undefined}
                  onChange={(e) => {
                    setConsentLoi25(e.target.checked);
                    setErrors((p) => ({ ...p, consentLoi25: '' }));
                  }}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0b3d2e] focus:ring-[#0b3d2e]"
                />
                <span className="text-xs leading-relaxed text-slate-800">
                  {t.quoteForm.fields.consentLoi25} <span aria-hidden="true">*</span>
                </span>
              </label>
              {errors.consentLoi25 && (
                <p id="qw-consent-err" role="alert" className="mt-1 pl-7 text-xs font-medium text-red-700">
                  {errors.consentLoi25}
                </p>
              )}
            </div>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consentMarketing}
                onChange={(e) => setConsentMarketing(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0b3d2e] focus:ring-[#0b3d2e]"
              />
              <span className="text-xs leading-relaxed text-slate-600">
                {t.quoteForm.fields.consentMarketing}
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
        {step > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{t.quoteForm.prevStep}</span>
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#0b3d2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082d22]"
          >
            <span>{t.quoteForm.nextStep}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#0b3d2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#082d22] disabled:opacity-60"
          >
            <span>{isSubmitting ? t.quoteForm.submitting : t.quoteForm.submitQuote}</span>
          </button>
        )}
      </div>
    </form>
  );
};
