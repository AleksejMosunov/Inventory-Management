import { fireEvent, render, screen } from '@testing-library/react';
import DeleteConfirmModal from '@/components/DeleteConfirmModal/DeleteConfirmModal';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: { name: string; }) =>
      key === 'confirmDelete' ? `Delete ${params?.name}` : key,
  }),
}));

describe('DeleteConfirmModal', () => {
  it('triggers callbacks', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    render(
      <DeleteConfirmModal isOpen name="Order 1" onConfirm={onConfirm} onCancel={onCancel} />,
    );

    fireEvent.click(screen.getByText('delete'));
    fireEvent.click(screen.getByText('cancel'));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
