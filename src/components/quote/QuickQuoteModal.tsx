import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useTranslation } from '../../context/LanguageContext';
import { AccessibleModal } from '../common/AccessibleModal';
import { QuoteWizard } from './QuoteWizard';

export const QuickQuoteModal: React.FC = () => {
  const { isQuoteModalOpen, closeQuoteModal, preselectedService } = useRouter();
  const { t } = useTranslation();

  return (
    <AccessibleModal
      isOpen={isQuoteModalOpen}
      onClose={closeQuoteModal}
      titleId="quick-quote-modal-title"
      title={t.quoteForm.modalTitle}
      subtitle={t.quoteForm.modalSubtitle}
      maxWidthClass="max-w-2xl"
    >
      <QuoteWizard
        initialServiceId={preselectedService}
        compact
        onSuccessClose={closeQuoteModal}
      />
    </AccessibleModal>
  );
};
