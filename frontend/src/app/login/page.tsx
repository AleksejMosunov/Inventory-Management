'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { authApi } from '@/services/authApi';

export default function LoginPage(): React.ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError('');

    try {
      const response = await authApi.login({ email, password });
      localStorage.setItem('token', response.token);
      router.push('/orders');
    } catch {
      setError('Login failed');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h1 className="mb-4">{t('login')}</h1>
      <form onSubmit={submit} className="card p-4 shadow-sm">
        <label className="form-label">{t('email')}</label>
        <input className="form-control mb-3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className="form-label">{t('password')}</label>
        <input className="form-control mb-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        {error ? <div className="alert alert-danger py-2">{error}</div> : null}
        <button type="submit" className="btn btn-success">{t('login')}</button>
        <Link href="/register" className="mt-3 d-inline-block">{t('register')}</Link>
      </form>
    </div>
  );
}
