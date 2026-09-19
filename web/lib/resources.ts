/**
 * Crisis lines, support services and provider data for Zimbabwe.
 *
 * Every phone number here was verified against the organisation's own website
 * or an authoritative directory at build time. Numbers change — there is a
 * `verifiedOn` field so staleness is visible, and the resources page tells
 * people to report anything that does not connect.
 *
 * DO NOT add a helpline to this file without checking it against a primary
 * source. A number that does not answer is worse than no number at all.
 */

export type CrisisLine = {
  name: string;
  /** Digits as dialled inside Zimbabwe. */
  phone: string;
  /** E.164 for the tel: link. */
  tel: string;
  whatsapp?: string;
  hours: string;
  /** True for 24/7 lines — these are surfaced first at night. */
  alwaysOpen: boolean;
  description: string;
  languages?: string;
  cost?: string;
  url?: string;
  /** Narrows who this line is for, e.g. children. */
  audience?: string;
  verifiedOn: string;
};

export const emergencyNumbers = [
  { name: 'Police emergency', phone: '995', tel: '995' },
  { name: 'Ambulance / medical emergency', phone: '994', tel: '994' },
  { name: 'National emergency number', phone: '999', tel: '999' },
];

export const crisisLines: CrisisLine[] = [
  {
    name: 'Childline Zimbabwe',
    phone: '116',
    tel: '116',
    whatsapp: '+263732116116',
    hours: '24 hours a day, 7 days a week',
    alwaysOpen: true,
    description:
      'The national helpline for children and young people. Free from any phone on any network, anywhere in Zimbabwe. Trained counsellors handle abuse, neglect, distress and suicidal feelings. Drop-in centres in all ten provinces.',
    languages: 'English, Shona and Ndebele',
    cost: 'Free — toll-free from every network',
    url: 'https://childline.org.zw/',
    audience: 'Children and young people under 18',
    verifiedOn: '2026-09-18',
  },
  {
    name: 'Friendship Bench',
    phone: '+263 77 934 3240',
    tel: '+263779343240',
    whatsapp: '+263784845294',
    hours: 'Monday to Friday, 9am – 4pm',
    alwaysOpen: false,
    description:
      'Free problem-solving therapy delivered by trained community counsellors — the "grandmothers" — on benches at clinics across Zimbabwe. Designed for depression, anxiety, suicidal thoughts, emotional distress and the strain of chronic illness. Anonymous and confidential.',
    languages: 'English, Shona and Ndebele',
    cost: 'All sessions are free',
    url: 'https://www.friendshipbenchzimbabwe.org/',
    verifiedOn: '2026-09-18',
  },
  {
    name: 'Zimbabwe National Suicide Prevention Helpline',
    phone: '0808 4116',
    tel: '08084116',
    hours: 'Monday to Friday, 8am – 5pm',
    alwaysOpen: false,
    description:
      'Confidential crisis support and suicide prevention counselling, run in partnership with Friendship Bench.',
    cost: 'Toll-free',
    verifiedOn: '2026-09-18',
  },
  {
    name: 'ASAC — Anxiety Support and Awareness Centre',
    phone: '+263 77 926 2766',
    tel: '+263779262766',
    hours: 'Business hours',
    alwaysOpen: false,
    description:
      'Support and awareness for anxiety and related conditions, with counselling and referral.',
    url: 'https://asactrust.co.zw/',
    verifiedOn: '2026-09-18',
  },
  {
    name: 'Ministry of Health Mental Health Support Line',
    phone: '+263 242 708 220',
    tel: '+263242708220',
    hours: 'Monday to Friday, 8am – 4pm',
    alwaysOpen: false,
    description:
      'Access to psychological counselling, psychiatric care and referral through the public health system.',
    verifiedOn: '2026-09-18',
  },
];

/** Surfaced in the sticky crisis bar and the risk-escalation screen. */
export const primaryCrisisLine = crisisLines[0];

export type SupportService = {
  name: string;
  category: string;
  description: string;
  contact?: string;
  tel?: string;
  url?: string;
  location?: string;
};

export const supportServices: SupportService[] = [
  {
    name: 'Friendship Bench Open House',
    category: 'Free counselling',
    description:
      'Problem-solving therapy by appointment, Monday to Friday 9am–4pm. Anonymous, confidential, and free. For mild to moderate depression, anxiety, substance misuse, suicidal thoughts, relationship difficulties, and distress caused by chronic illness such as cancer, diabetes or HIV.',
    contact: 'WhatsApp +263 78 484 5294',
    tel: '+263784845294',
    url: 'https://www.friendshipbenchzimbabwe.org/openhouse',
    location: '4 Weale Road, Milton Park, Harare',
  },
  {
    name: 'Childline drop-in centres',
    category: 'Young people',
    description:
      'Face-to-face counselling for children and community members, in all ten provinces. Open 8:30am to 4:30pm on weekdays. Social workers also make follow-up home visits on reports made to the 116 helpline.',
    contact: 'Call 116 free, or WhatsApp +263 73 211 6116',
    tel: '116',
    url: 'https://childline.org.zw/what-do-we-do',
    location: 'All ten provinces',
  },
  {
    name: 'Zimbabwe National Association for Mental Health',
    category: 'Advocacy and support',
    description:
      'Mental health advocacy, community awareness work and support group coordination.',
    location: 'Harare',
  },
  {
    name: 'Community support groups (CKT)',
    category: 'Peer support',
    description:
      'Circle Kubatana Tose — peer-led support groups run through Friendship Bench, where people who have been through the bench support each other and build income-generating activities together.',
    url: 'https://www.friendshipbenchzimbabwe.org/',
    location: 'Nationwide',
  },
];

/**
 * Self-help strategies shown alongside results.
 * These are evidence-based and deliberately low-cost — no assumption of
 * data, transport money or time off work.
 */
export const selfHelpStrategies = [
  {
    title: 'Name the problem, then break it down',
    body: 'This is the core of what Friendship Bench counsellors do, and it works. Write down what is troubling you in one sentence. Then list what you could realistically change this week — not everything, just one step. Problems feel unmanageable mostly when they stay vague.',
  },
  {
    title: 'Protect your sleep first',
    body: 'Poor sleep makes every other symptom worse and is often the easiest thing to shift. Same wake-up time daily, no phone in the last hour, and get sunlight on your face early in the morning.',
  },
  {
    title: 'Move, even a little',
    body: 'Thirty minutes of walking most days has an effect size comparable to some treatments for mild depression. It does not need to be exercise as such — walking to see someone counts.',
  },
  {
    title: 'Tell one person',
    body: 'Isolation makes distress heavier. You do not need to explain everything, and you do not need advice. One honest conversation with someone who will not judge you does more than most people expect.',
  },
  {
    title: 'Slow your breathing when panic rises',
    body: 'Breathe in for four counts, out for six. The long out-breath is what calms the nervous system. Two minutes is usually enough to bring the peak down.',
  },
  {
    title: 'Watch what you are drinking',
    body: 'Alcohol reliably makes anxiety and low mood worse over the following days, even when it helps in the moment. Cutting back is often the single fastest improvement available.',
  },
];
