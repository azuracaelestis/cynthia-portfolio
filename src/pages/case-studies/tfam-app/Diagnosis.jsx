import Section from '../../../components/case-study/Section';

const FRICTION = [
  {
    moment: 'Plan',
    subtitle: 'Before the Visit',
    body: 'Exhibition details are hard to find, and booking means an email or a phone call.',
  },
  {
    moment: 'Wander',
    subtitle: 'During Visit',
    body: 'The audio guide has no clear way in. Visitors lean on staff and signage instead.',
  },
  {
    moment: 'Remember',
    subtitle: 'After',
    body: "Nothing carries the visit home. There's no way to keep the pieces you loved.",
  },
];

const PERSONAS = [
  {
    name: 'Yu Chen Lin, 29',
    tag: 'Marketing manager in Taipei — Repeat local Mandarin speaker',
    goal: 'See what’s on and book a tour in a few taps.',
    frustrations: 'Planning means juggling the website, social media, and a phone call.',
    breaks: 'Before she leaves home. Language is never her problem, planning is.',
  },
  {
    name: 'Marco Rossi, 34',
    tag: 'Architect visiting from Milan — First time tourist, non-Mandarin speaker',
    goal: 'Find his way and understand the art without leaning on staff.',
    frustrations: 'The app and signage assume Mandarin, and the audio codes on the placards mean nothing to him.',
    breaks: 'The moment he walks in. Language is the first wall he hits.',
  },
];

const QUESTIONS = [
  'How might we surface the audio guide the moment a visitor arrives?',
  'How might we help first-timers navigate without staff or signage?',
  'How might we help recurring visitors discover current and upcoming exhibitions?',
  'How might we let visitors book in a few taps instead of emailing or calling?',
  'How might we help visitors keep the works they loved?',
];

export default function Diagnosis() {
  return (
    <Section id="diagnosis" eyebrow="DIAGNOSIS" title="Five visitors, one clear pattern">
      <p className="font-satoshi text-[16px] text-ink leading-[23px] mb-12">
        I used two research methods. First, five in-depth interviews with real visitors, both locals and tourists.
        Second, a four-lens audit of the live app: App Store reviews, TripAdvisor feedback, a heuristic review, and
        my own walkthrough inside the museum. The interviews showed me the pattern. The audit confirmed it.
      </p>

      <div className="mb-12">
        <p className="font-satoshi font-bold text-[20px] text-ink mb-6">Friction mapped to the visit journey</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FRICTION.map((f) => (
            <div key={f.moment} className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-6">
              <p className="font-satoshi font-bold text-[20px] text-ink">{f.moment}</p>
              <p className="font-satoshi text-[14px] text-case-study-blue mb-2">{f.subtitle}</p>
              <p className="font-satoshi text-[16px] text-charcoal leading-[23px]">{f.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <p className="font-satoshi font-bold text-[20px] text-ink mb-6">New User Persona</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PERSONAS.map((p) => (
            <div key={p.name} className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-4">
              <div>
                <p className="font-satoshi font-bold text-[20px] text-ink">{p.name}</p>
                <p className="font-satoshi text-[14px] text-charcoal">{p.tag}</p>
              </div>
              <div>
                <p className="font-satoshi font-bold text-[14px] text-case-study-blue">Goal</p>
                <p className="font-satoshi text-[16px] text-charcoal leading-[23px]">{p.goal}</p>
              </div>
              <div>
                <p className="font-satoshi font-bold text-[14px] text-case-study-blue">Frustrations</p>
                <p className="font-satoshi text-[16px] text-charcoal leading-[23px]">{p.frustrations}</p>
              </div>
              <div>
                <p className="font-satoshi font-bold text-[14px] text-case-study-blue">Breaks</p>
                <p className="font-satoshi text-[16px] text-charcoal leading-[23px]">{p.breaks}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <p className="font-satoshi font-bold text-[20px] text-ink mb-6">Each frustration turned into a question</p>
        <div className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] px-6 py-8 flex flex-col gap-5">
          {QUESTIONS.map((q) => (
            <div key={q} className="flex gap-3 items-start">
              <span className="shrink-0 mt-2 size-1.5 rounded-full bg-case-study-blue" />
              <p className="font-satoshi font-bold text-[16px] text-ink">{q}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-satoshi font-bold text-[20px] text-ink mb-4">The decision this led to</p>
        <p className="font-satoshi text-[16px] text-ink leading-[23px] mb-6">
          The personas pointed to one choice. Instead of redesigning a list of features, I anchored the whole app on
          three moments in a visit: plan, wander, remember. Every feature would live inside whichever moment it
          actually served.
        </p>
        <div className="bg-case-study-highlight rounded-2xl px-6 py-5">
          <p className="font-satoshi font-semibold text-[18px] text-ink leading-[27px]">
            People take in information best right when they need it, not all at once on a home screen.
          </p>
        </div>
      </div>
    </Section>
  );
}
