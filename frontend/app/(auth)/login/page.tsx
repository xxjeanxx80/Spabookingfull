import { AppShell } from '@/components/layout/AppShell';

const providers = [
  { id: 'google', label: 'Continue with Google' },
  { id: 'facebook', label: 'Continue with Facebook' }
];

export default function LoginPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Secure login</h1>
        <p className="text-sm text-slate-600">
          Authenticate via OAuth2 to access bookings, loyalty points, and management tools. After login the backend issues a JWT
          for API requests.
        </p>
        {providers.map((provider) => (
          <button
            key={provider.id}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-primary"
          >
            {provider.label}
          </button>
        ))}
      </div>
    </AppShell>
  );
}
