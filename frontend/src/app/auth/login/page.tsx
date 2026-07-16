'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { AuthForm } from '@/components/auth/auth-form';
import { useAuth } from '@/components/providers/auth-provider';
import { authRequest } from '@/services/auth-api';

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}

function LoginForm() {
  const router = useRouter(); const searchParams = useSearchParams(); const { refreshSession } = useAuth();
  return <AuthForm title="Welcome back" description="Log in to continue to MemeTools." submitLabel="Log in" fields={[{ label: 'email', type: 'email', autoComplete: 'email' }, { label: 'password', type: 'password', autoComplete: 'current-password' }]} onSubmit={async (values) => { await authRequest('login', { method: 'POST', body: JSON.stringify(values) }); await refreshSession(); const next = searchParams.get('next'); router.replace(next?.startsWith('/') ? next : '/'); }} footer={<><Link className="text-accent hover:underline" href="/auth/forgot-password">Forgot password?</Link><span className="mx-2">·</span>New here? <Link className="text-accent hover:underline" href="/auth/signup">Create an account</Link></>} />;
}
