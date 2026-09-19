import type { Metadata } from 'next';
import Link from 'next/link';
import { selfHelpStrategies } from '@/lib/resources';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Practical, low-cost self-help strategies for depression, anxiety and stress, plus how to support someone else who is struggling.',
};

export default function ResourcesPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Resources</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Things that have evidence behind them and cost nothing. None of this replaces talking to
          someone, but all of it helps, and most of it helps faster than people expect.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Looking after yourself</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {selfHelpStrategies.map((s) => (
            <article key={s.title} className="card p-5">
              <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Helping someone else</h2>
        <div className="mt-5 card p-6">
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              <strong className="text-slate-900">Ask directly.</strong> If you are worried that
              someone is thinking about suicide, ask them plainly. Asking does not plant the idea —
              the evidence on this is clear and consistent. What it usually does is relieve someone
              who has been carrying it alone.
            </p>
            <p>
              <strong className="text-slate-900">Listen longer than is comfortable.</strong> The
              instinct is to fix, reassure, or point out what they have to be grateful for. That
              tends to close the conversation. Sitting with someone in it, without rushing to the
              bright side, is what actually helps.
            </p>
            <p>
              <strong className="text-slate-900">Do not promise secrecy you cannot keep.</strong> If
              someone is in danger, they may need more help than you can give. Say that honestly
              rather than agreeing to keep something you will have to break.
            </p>
            <p>
              <strong className="text-slate-900">Help with the practical step.</strong> Offer to
              make the call with them, or go with them to the clinic. The gap between deciding to
              get help and actually getting it is where most people stall.
            </p>
            <p>
              <strong className="text-slate-900">Check back.</strong> One conversation is rarely
              enough. A short message a few days later carries more weight than people realise.
            </p>
          </div>

          <div className="mt-6 rounded-xl bg-sand-100 p-4">
            <p className="text-sm leading-relaxed text-slate-600">
              If you are supporting someone, this is heavy on you too. Friendship Bench counsellors
              will talk to you about that, not just about the person you are worried about.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Understanding the questionnaires</h2>
        <div className="mt-5 card p-6">
          <dl className="space-y-5 text-sm leading-relaxed">
            <div>
              <dt className="font-bold text-slate-900">
                Why does the app use several different tests?
              </dt>
              <dd className="mt-1 text-slate-600">
                Because they measure different things. Depression, anxiety, trauma and drinking
                overlap, but the treatments differ, so it is worth knowing which is actually driving
                how you feel. The SSQ-14 is the broadest and a good starting point.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-slate-900">What does a &ldquo;cut-off&rdquo; mean?</dt>
              <dd className="mt-1 text-slate-600">
                It is the score above which enough people turn out to have the condition that
                further assessment is worth everyone&rsquo;s time. It is a sorting threshold, not a
                diagnostic line — people just below it can be unwell and people just above it can be
                fine.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-slate-900">Can I trust the result?</dt>
              <dd className="mt-1 text-slate-600">
                As far as it goes. These instruments typically catch around 70–80% of true cases,
                which is good for a questionnaire and poor compared to an actual clinician. Treat a
                high score as a prompt to talk to someone, and a low score as reassuring but not
                conclusive.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-slate-900">How often should I retake one?</dt>
              <dd className="mt-1 text-slate-600">
                Every two weeks is about right if you are tracking change — most of these ask about
                the last fortnight, so taking one daily just measures noise.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-brand-50 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">Ready to check in on yourself?</h2>
        <p className="mt-2 leading-relaxed text-slate-600">
          A few minutes, and you will know whether this is something worth taking to a counsellor.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/assessments" className="btn-primary">Take an assessment</Link>
          <Link href="/providers" className="btn-secondary">Find support near you</Link>
        </div>
      </section>
    </div>
  );
}
