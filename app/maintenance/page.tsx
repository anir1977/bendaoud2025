import MaintenanceCountdown from '@/components/MaintenanceCountdown'

export const metadata = {
  title: 'Maintenance en cours | Ben Daoud Bijouterie',
  description: 'Notre site est temporairement en maintenance. Nous revenons tres bientot.',
}

export default function MaintenancePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.22),_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_45%)]" />
      <div className="absolute inset-0 opacity-35 pointer-events-none">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.7234567890123!2d-7.5942577!3d33.5861925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd6a79846c4d%3A0x81cb4eff7369e1d6!2sBen%20Daoud%20Bijouterie!5e0!3m2!1sfr!2sma!4v1234567890123"
          title="Localisation Ben Daoud Bijouterie"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

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
            Pour toute urgence: <a href="tel:0522621818" className="text-amber-300 font-semibold hover:text-amber-200">0522621818</a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
              aria-label="Facebook"
            >
              <i className="ri-facebook-fill" />
              Facebook
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
              aria-label="Instagram"
            >
              <i className="ri-instagram-line" />
              Instagram
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
