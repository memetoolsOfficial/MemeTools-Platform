'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AuthForm } from '@/components/auth/auth-form';
import { authRequest } from '@/services/auth-api';

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState<string>();
  return <AuthForm title="Reset your password" description="Enter your email and we’ll send a reset link if an account exists." submitLabel="Send reset link" fields={[{ label: 'email', type: 'email', autoComplete: 'email' }]} success={success} onSubmit={async (values) => { await authRequest('forgot-password', { method: 'POST', body: JSON.stringify(values) }); setSuccess('If an account exists for that email, a reset link is on its way.'); }} footer={<Link className="text-accent hover:underline" href="/auth/login">Back to log in</Link>} />;
}
