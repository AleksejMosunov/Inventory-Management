'use client';

export default function Spinner(): React.ReactElement {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="spinner-border text-success" role="status" aria-label="Loading" />
    </div>
  );
}
