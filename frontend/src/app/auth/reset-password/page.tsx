'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AuthForm } from '@/components/auth/auth-form';
import { authRequest } from '@/services/auth-api';

export default function ResetPasswordPage() {
  const [token, setToken] = useState<string>(); const [success, setSuccess] = useState<string>();
  useEffect(() => { const params = new URLSearchParams(window.location.hash.slice(1)); setToken(params.get('access_token') ?? undefined); }, []);
  return <AuthForm title="Choose a new password" description="Use at least 8 characters, including a letter and number." submitLabel="Update password" fields={[{ label: 'password', type: 'password', autoComplete: 'new-password' }]} success={success} onSubmit={async (values) => { if (!token) throw new Error('This password reset link is invalid or expired.'); await authRequest('reset-password', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(values) }); setSuccess('Your password has been updated. You can now log in.'); }} footer={<Link className="text-accent hover:underline" href="/auth/login">Back to log in</Link>} />;
}
