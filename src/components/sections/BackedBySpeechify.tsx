import { SpeechifyLogo } from '@/components/brand/SpeechifyLogo';

export function BackedBySpeechify() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-simba-blue/5 blur-[120px]" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-simba-gray-200 bg-gradient-to-br from-white via-simba-gray-50 to-white p-10 sm:p-14 text-center shadow-sm">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-simba-blue">
            Built by Speechify
          </div>

          <div className="mt-6 flex items-center justify-center">
            <SpeechifyLogo />
          </div>

          <h2 className="mt-8 text-3xl sm:text-4xl font-black tracking-tight text-simba-black leading-tight">
            SIMBA Voice Agents is built by Speechify — the world&apos;s largest
            consumer voice AI platform.
          </h2>

          <p className="mt-6 text-lg text-simba-gray-600 leading-relaxed max-w-3xl mx-auto">
            Speechify powers billions of listens for over 50 million users across
            270+ countries, turning text into lifelike speech in 60+ languages.
            The same voice technology trusted by consumers, Fortune 500 teams, and
            top universities now powers every SIMBA voice agent — from the
            neural text-to-speech engine to the production voice model library.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-simba-blue">
                50M+
              </div>
              <div className="mt-1 text-sm text-simba-gray-600">
                Users worldwide
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-simba-blue">
                270+
              </div>
              <div className="mt-1 text-sm text-simba-gray-600">
                Countries served
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-simba-blue">
                60+
              </div>
              <div className="mt-1 text-sm text-simba-gray-600">
                Languages spoken
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-simba-blue">
                #1
              </div>
              <div className="mt-1 text-sm text-simba-gray-600">
                Consumer voice AI
              </div>
            </div>
          </div>

          <p className="mt-10 text-sm text-simba-gray-500">
            A new chapter in Speechify&apos;s voice platform — purpose-built for
            teams deploying conversational voice agents in production.
          </p>
        </div>
      </div>
    </section>
  );
}
