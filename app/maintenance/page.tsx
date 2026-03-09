import MaintenanceCountdown from '@/components/MaintenanceCountdown'
import { STORE_PHOTO_URL } from '@/lib/store-media'

export const metadata = {
  title: 'Maintenance en cours | Ben Daoud Bijouterie',
  description: 'Notre site est temporairement en maintenance. Nous revenons tres bientot.',
}

export default function MaintenancePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.22),_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_45%)]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('${STORE_PHOTO_URL}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />

      <div className="absolute inset-0 bg-slate-950/25" />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="relative overflow-hidden w-full max-w-4xl rounded-3xl border border-white/20 shadow-2xl text-center">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${STORE_PHOTO_URL}')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              filter: 'brightness(1.15) saturate(1.1)',
            }}
          />
          <div className="absolute inset-0 bg-slate-950/35" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.30)_0%,rgba(2,6,23,0.45)_100%)]" />

          <div className="relative z-10 p-6 md:p-10">
            <p className="inline-flex items-center rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-1 text-xs md:text-sm uppercase tracking-[0.2em] text-amber-200">
              Maintenance en cours
            </p>

            <h1 className="mt-5 text-3xl md:text-5xl font-black leading-tight text-white">
              Ben Daoud Bijouterie revient avec une nouvelle experience
            </h1>

            <p className="mt-4 text-sm md:text-lg text-slate-100 max-w-2xl mx-auto">
              Nous finalisons la plateforme. Le lancement est prevu dans 7 jours.
              Merci pour votre patience et votre confiance.
            </p>

            <div className="mt-8 flex justify-center">
              <MaintenanceCountdown />
            </div>

            <div className="mt-8 text-slate-100 text-sm md:text-base flex items-center justify-center gap-2">
              <i className="ri-phone-line text-amber-300 text-lg" aria-hidden="true" />
              <span>Pour toute urgence:</span>
              <a href="tel:0522621818" className="text-amber-300 font-semibold hover:text-amber-200">0522621818</a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                href="https://www.facebook.com/bendaoud.bijouterie"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <i className="ri-facebook-fill text-xl" />
              </a>
              <a
                href="https://www.instagram.com/bendaoud_officiel/?hl=fr"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                aria-label="Instagram"
              >
                <i className="ri-instagram-fill text-xl" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
