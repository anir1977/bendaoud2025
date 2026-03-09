import MaintenanceCountdown from '@/components/MaintenanceCountdown'

export const metadata = {
  title: 'Maintenance en cours | Ben Daoud Bijouterie',
  description: 'Notre site est temporairement en maintenance. Nous revenons tres bientot.',
}

export default function MaintenancePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.22),_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_45%)]" />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1600&q=80')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl rounded-3xl border border-white/15 bg-slate-900/70 backdrop-blur-xl shadow-2xl p-6 md:p-10 text-center">
          <p className="inline-flex items-center rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-1 text-xs md:text-sm uppercase tracking-[0.2em] text-amber-200">
            Maintenance en cours
          </p>

          <h1 className="mt-5 text-3xl md:text-5xl font-black leading-tight text-white">
            Ben Daoud Bijouterie revient avec une nouvelle experience
          </h1>

          <p className="mt-4 text-sm md:text-lg text-slate-200 max-w-2xl mx-auto">
            Nous finalisons la plateforme. Le lancement est prevu dans 7 jours.
            Merci pour votre patience et votre confiance.
          </p>

          <div className="mt-8 flex justify-center">
            <MaintenanceCountdown />
          </div>

          <div className="mt-8 text-slate-300 text-sm md:text-base">
            Pour toute urgence: <span className="text-amber-300 font-semibold">+212 6 00 00 00 00</span>
          </div>
        </div>
      </section>
    </main>
  )
}
