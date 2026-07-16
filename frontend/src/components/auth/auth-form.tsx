'use client';

import Link from 'next/link';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Field = { label: string; type: 'email' | 'password'; autoComplete: string };
type Props = { title: string; description: string; submitLabel: string; fields: Field[]; footer?: React.ReactNode; onSubmit: (values: Record<string, string>) => Promise<void>; success?: string };

export function AuthForm({ title, description, submitLabel, fields, footer, onSubmit, success }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const validate = () => {
    const email = values.email?.trim();
    if (fields.some((field) => field.type === 'email') && (!email || !/^\S+@\S+\.\S+$/.test(email))) return 'Enter a valid email address.';
    if (fields.some((field) => field.type === 'password') && !/^(?=.*[A-Za-z])(?=.*\d).{8,72}$/.test(values.password ?? '')) return 'Passwords must be 8–72 characters and include a letter and number.';
    return undefined;
  };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validate();
    if (validation) return setError(validation);
    setLoading(true); setError(undefined);
    try { await onSubmit(values); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Something went wrong.'); } finally { setLoading(false); }
  }
  return <main className="flex min-h-screen items-center justify-center px-4 py-12"><section className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/20 sm:p-8"><Link href="/" className="text-lg font-bold tracking-tight text-foreground">Meme<span className="text-accent">Tools</span></Link><h1 className="mt-8 text-2xl font-bold tracking-tight">{title}</h1><p className="mt-2 text-sm text-muted-foreground">{description}</p>{success ? <p role="status" className="mt-6 rounded-lg border border-positive/30 bg-positive/10 p-3 text-sm text-positive">{success}</p> : <form className="mt-6 space-y-4" onSubmit={submit} noValidate>{fields.map((field) => <div key={field.label}><label htmlFor={field.label} className="mb-2 block text-sm font-medium">{field.label}</label><div className="relative"><Input id={field.label} name={field.label} type={field.type === 'password' && visible[field.label] ? 'text' : field.type} autoComplete={field.autoComplete} value={values[field.label] ?? ''} onChange={(event) => setValues((current) => ({ ...current, [field.label]: event.target.value }))} aria-invalid={Boolean(error)} required />{field.type === 'password' && <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => setVisible((current) => ({ ...current, [field.label]: !current[field.label] }))} aria-label={`${visible[field.label] ? 'Hide' : 'Show'} password`}>{visible[field.label] ? <EyeOff size={18} /> : <Eye size={18} />}</button>}</div></div>)}{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button className="w-full" type="submit" disabled={loading}>{loading && <LoaderCircle className="animate-spin" size={16} />}{submitLabel}</Button></form>}{footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}</section></main>;
}
