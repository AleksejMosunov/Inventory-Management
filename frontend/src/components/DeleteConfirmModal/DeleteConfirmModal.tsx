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
        <motion.div
          className="modal fade show d-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
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
          <div className="modal-backdrop fade show" onClick={onCancel} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
