'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  name,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className="modal-backdrop show"
            style={{ zIndex: 1040 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />
          <div
            className="modal show d-block"
            style={{ zIndex: 1050 }}
            aria-modal="true"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" style={{ transform: 'none' }}>
              <motion.div
                className="modal-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className="modal-body">
                  <p className="mb-3">{t('confirmDelete', { name })}</p>
                  <div className="d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                      {t('cancel')}
                    </button>
                    <button type="button" className="btn btn-danger" onClick={onConfirm}>
                      {t('delete')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
