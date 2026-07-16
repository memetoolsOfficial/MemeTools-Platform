'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/auth/auth-form';
import { authRequest } from '@/services/auth-api';
import { useAuth } from '@/components/providers/auth-provider';

export default function SignupPage() {
  const [success, setSuccess] = useState<string>();
  const router = useRouter();
  const { refreshSession } = useAuth();
  return <AuthForm title="Create your account" description="Join MemeTools and start predicting." submitLabel="Create account" fields={[{ label: 'email', type: 'email', autoComplete: 'email' }, { label: 'password', type: 'password', autoComplete: 'new-password' }]} success={success} onSubmit={async (values) => { const response = await authRequest<{ requiresEmailConfirmation: boolean }>('signup', { method: 'POST', body: JSON.stringify(values) }); if (!response.requiresEmailConfirmation) { await refreshSession(); router.replace('/'); return; } setSuccess('Check your email to confirm your account.'); }} footer={<>Already have an account? <Link className="text-accent hover:underline" href="/auth/login">Log in</Link></>} />;
}
