'use client';

import { useTranslation } from 'react-i18next';

interface ProductFilterProps {
  types: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function ProductFilter({ types, value, onChange }: ProductFilterProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <label className="form-label">{t('filterByType')}</label>
      <select className="form-select" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{t('allTypes')}</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
