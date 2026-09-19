/**
 * Validated mental-health screening instruments.
 *
 * Every instrument here is a real, published screening tool with documented
 * scoring. Nothing in this file is invented. Where an instrument has a
 * Zimbabwe-specific validation (the SSQ-14, and the Zimbabwe primary-care
 * validation of PHQ-9 / GAD-7), the local cut-off is used and cited.
 *
 * IMPORTANT CLINICAL NOTE
 * These are SCREENING tools, not diagnostic tools. A high score indicates
 * that a person may benefit from a proper assessment by a clinician. It does
 * not constitute a diagnosis. All result copy in the UI must reflect that.
 *
 * Copyright status of each instrument is recorded in `licence` below.
 */

export type ResponseOption = {
  label: string;
  value: number;
  /** Optional shorter label for narrow screens. */
  shortLabel?: string;
};

export type Question = {
  id: string;
  text: string;
  /** Marks an item that needs an immediate safety response if endorsed. */
  riskItem?: boolean;
  /** Threshold at or above which the risk response triggers. */
  riskThreshold?: number;
  /** Item is reverse-scored (higher raw answer = better wellbeing). */
  reverse?: boolean;
};

export type SeverityBand = {
  min: number;
  max: number;
  label: string;
  /** Plain-language interpretation shown to the person. */
  summary: string;
  /** What we suggest they do next. */
  advice: string;
  /** Drives result colour + urgency of the call to action. */
  tone: 'ok' | 'mild' | 'moderate' | 'high' | 'severe';
};

export type Instrument = {
  slug: string;
  name: string;
  fullName: string;
  /** One-line description for cards and listings. */
  tagline: string;
  /** What the tool screens for, in plain language. */
  about: string;
  /** e.g. "the last 2 weeks" */
  recallPeriod: string;
  estimatedMinutes: number;
  questions: Question[];
  options: ResponseOption[];
  /** Score range, used for progress meters. */
  maxScore: number;
  bands: SeverityBand[];
  /** The screening cut-off that suggests follow-up. */
  cutoff: number;
  cutoffNote: string;
  licence: string;
  source: { label: string; url: string }[];
  /** Shown as a lead-in before the first question. */
  intro: string;
  /** Category for grouping on the assessments index. */
  category: 'mood' | 'anxiety' | 'general' | 'trauma' | 'substance' | 'wellbeing';
};

/* ------------------------------------------------------------------ */
/* Shared response scales                                              */
/* ------------------------------------------------------------------ */

/** PHQ-9 / GAD-7 four-point frequency scale. */
const FREQUENCY_0_3: ResponseOption[] = [
  { label: 'Not at all', value: 0 },
  { label: 'Several days', value: 1 },
  { label: 'More than half the days', value: 2, shortLabel: 'More than half' },
  { label: 'Nearly every day', value: 3 },
];

/** SSQ-14 dichotomous scale. */
const YES_NO: ResponseOption[] = [
  { label: 'No', value: 0 },
  { label: 'Yes', value: 1 },
];

/* ------------------------------------------------------------------ */
/* PHQ-9 — depression                                                  */
/* ------------------------------------------------------------------ */

export const phq9: Instrument = {
  slug: 'phq-9',
  name: 'PHQ-9',
  fullName: 'Patient Health Questionnaire-9',
  tagline: 'Screens for depression and tracks its severity over time.',
  about:
    'The PHQ-9 maps directly onto the nine diagnostic criteria for major depressive disorder. It is the most widely used depression screener in the world and has been validated in Zimbabwean primary care.',
  recallPeriod: 'the last 2 weeks',
  estimatedMinutes: 3,
  category: 'mood',
  intro:
    'Over the last 2 weeks, how often have you been bothered by any of the following problems? Answer as honestly as you can — there are no right answers, and nobody else sees this.',
  options: FREQUENCY_0_3,
  maxScore: 27,
  cutoff: 10,
  cutoffNote:
    'A score of 10 or more is the usual threshold for further assessment. The Zimbabwe primary-care validation found a cut-off of 11 performed best locally.',
  licence:
    'Public domain. Developed by Drs Robert L. Spitzer, Janet B.W. Williams and Kurt Kroenke with an educational grant from Pfizer. No permission required to reproduce, translate or display.',
  source: [
    {
      label: 'Kroenke, Spitzer & Williams (2001), The PHQ-9: validity of a brief depression severity measure',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1495268/',
    },
    {
      label:
        'Chibanda et al. (2016), Validation of screening tools for depression and anxiety in a primary care population with high HIV prevalence in Zimbabwe',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27011359/',
    },
  ],
  questions: [
    { id: 'phq1', text: 'Little interest or pleasure in doing things' },
    { id: 'phq2', text: 'Feeling down, depressed, or hopeless' },
    { id: 'phq3', text: 'Trouble falling or staying asleep, or sleeping too much' },
    { id: 'phq4', text: 'Feeling tired or having little energy' },
    { id: 'phq5', text: 'Poor appetite or overeating' },
    {
      id: 'phq6',
      text: 'Feeling bad about yourself — or that you are a failure, or have let yourself or your family down',
    },
    {
      id: 'phq7',
      text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
    },
    {
      id: 'phq8',
      text: 'Moving or speaking so slowly that other people could have noticed — or the opposite, being so fidgety or restless that you have been moving around a lot more than usual',
    },
    {
      id: 'phq9',
      text: 'Thoughts that you would be better off dead, or of hurting yourself in some way',
      riskItem: true,
      riskThreshold: 1,
    },
  ],
  bands: [
    {
      min: 0,
      max: 4,
      label: 'Minimal',
      tone: 'ok',
      summary:
        'Your answers suggest few or no symptoms of depression over the past two weeks.',
      advice:
        'Nothing here suggests you need clinical support right now. If something still feels wrong, trust that — screening tools can miss things. You can retake this any time your situation changes.',
    },
    {
      min: 5,
      max: 9,
      label: 'Mild',
      tone: 'mild',
      summary:
        'Your answers suggest mild depressive symptoms. This is common and often improves with everyday support.',
      advice:
        'Watchful waiting is usually the right first step. Talk to someone you trust, keep an eye on how you feel, and retake this in two weeks. A Friendship Bench session is free and a good place to start.',
    },
    {
      min: 10,
      max: 14,
      label: 'Moderate',
      tone: 'moderate',
      summary:
        'Your answers suggest moderate depressive symptoms, above the threshold where support usually helps.',
      advice:
        'Consider booking a session with a counsellor or your nearest clinic. Problem-solving therapy — what Friendship Bench offers free of charge — has strong evidence at this level in Zimbabwe.',
    },
    {
      min: 15,
      max: 19,
      label: 'Moderately severe',
      tone: 'high',
      summary:
        'Your answers suggest moderately severe depressive symptoms.',
      advice:
        'This is a level where professional treatment is usually recommended. Please arrange to speak to a counsellor, psychologist or doctor soon — not eventually. The directory has people who can help.',
    },
    {
      min: 20,
      max: 27,
      label: 'Severe',
      tone: 'severe',
      summary:
        'Your answers suggest severe depressive symptoms.',
      advice:
        'Please reach out for professional help as soon as you can. This is treatable, and you do not have to manage it alone. If you feel unsafe at any point, use the crisis numbers — they are free and confidential.',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* GAD-7 — anxiety                                                     */
/* ------------------------------------------------------------------ */

export const gad7: Instrument = {
  slug: 'gad-7',
  name: 'GAD-7',
  fullName: 'Generalised Anxiety Disorder-7',
  tagline: 'Screens for generalised anxiety and measures its severity.',
  about:
    'The GAD-7 is a seven-item measure of anxiety symptoms. It performs well as a general anxiety screener and is also sensitive to panic, social anxiety and PTSD.',
  recallPeriod: 'the last 2 weeks',
  estimatedMinutes: 2,
  category: 'anxiety',
  intro:
    'Over the last 2 weeks, how often have you been bothered by the following problems?',
  options: FREQUENCY_0_3,
  maxScore: 21,
  cutoff: 10,
  cutoffNote:
    'A score of 10 or more is the standard cut-off for probable generalised anxiety disorder.',
  licence:
    'Public domain. Developed by Drs Robert L. Spitzer, Janet B.W. Williams and Kurt Kroenke with an educational grant from Pfizer. No permission required.',
  source: [
    {
      label: 'Spitzer et al. (2006), A brief measure for assessing generalized anxiety disorder: the GAD-7',
      url: 'https://pubmed.ncbi.nlm.nih.gov/16717171/',
    },
    {
      label:
        'Chibanda et al. (2016), Validation of screening tools for depression and anxiety in Zimbabwe',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27011359/',
    },
  ],
  questions: [
    { id: 'gad1', text: 'Feeling nervous, anxious or on edge' },
    { id: 'gad2', text: 'Not being able to stop or control worrying' },
    { id: 'gad3', text: 'Worrying too much about different things' },
    { id: 'gad4', text: 'Trouble relaxing' },
    { id: 'gad5', text: 'Being so restless that it is hard to sit still' },
    { id: 'gad6', text: 'Becoming easily annoyed or irritable' },
    { id: 'gad7', text: 'Feeling afraid, as if something awful might happen' },
  ],
  bands: [
    {
      min: 0,
      max: 4,
      label: 'Minimal',
      tone: 'ok',
      summary: 'Your answers suggest minimal anxiety symptoms.',
      advice:
        'No action needed based on this screen. Everyday stress is normal — it becomes a concern when it stops you doing the things you need to do.',
    },
    {
      min: 5,
      max: 9,
      label: 'Mild',
      tone: 'mild',
      summary: 'Your answers suggest mild anxiety symptoms.',
      advice:
        'Self-help strategies often work well at this level — regular sleep, cutting back on stimulants, breathing exercises, and talking things through with someone. Retake this in a couple of weeks.',
    },
    {
      min: 10,
      max: 14,
      label: 'Moderate',
      tone: 'moderate',
      summary:
        'Your answers suggest moderate anxiety, at or above the threshold for probable generalised anxiety disorder.',
      advice:
        'It is worth speaking to a counsellor or doctor. Anxiety at this level responds well to talking therapy, and you do not need a referral to start.',
    },
    {
      min: 15,
      max: 21,
      label: 'Severe',
      tone: 'high',
      summary: 'Your answers suggest severe anxiety symptoms.',
      advice:
        'Please arrange to speak to a mental health professional soon. Severe anxiety is treatable, and leaving it untreated usually makes it harder to shift later.',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* SSQ-14 — the Zimbabwean instrument                                  */
/* ------------------------------------------------------------------ */

export const ssq14: Instrument = {
  slug: 'ssq-14',
  name: 'SSQ-14',
  fullName: 'Shona Symptom Questionnaire',
  tagline:
    'Developed in Harare. The screener used by Friendship Bench across Zimbabwe.',
  about:
    'The SSQ-14 was developed in Shona in Harare by Patel and colleagues, built from how Zimbabweans actually describe distress rather than translated from an English instrument. It screens for common mental disorders — depression and anxiety together — and is the primary tool used by Friendship Bench grandmothers nationwide. Because it was designed around local idioms of distress, it tends to pick up what imported tools miss.',
  recallPeriod: 'the past 7 days',
  estimatedMinutes: 2,
  category: 'general',
  intro:
    'These questions are about how you have been feeling in the past week. Answer yes or no for each one. This questionnaire was developed here in Zimbabwe, in Shona, and is used by Friendship Bench counsellors across the country.',
  options: YES_NO,
  maxScore: 14,
  cutoff: 8,
  cutoffNote:
    'A score of 8 or more indicates probable common mental disorder. A score of 11 or more suggests more severe symptoms. Research in Zimbabwe suggests a lower cut-off of 5 may work better for adolescents.',
  licence:
    'Published in the peer-reviewed literature (Patel et al., 1997) and used openly in Zimbabwean public health practice. Cite the original validation when using it.',
  source: [
    {
      label:
        'Patel, Simunyu, Gwanzura, Lewis & Mann (1997), The Shona Symptom Questionnaire: the development of an indigenous measure of common mental disorders in Harare',
      url: 'https://pubmed.ncbi.nlm.nih.gov/9242841/',
    },
    {
      label:
        'Chibanda et al. (2016), Validation of screening tools in a primary care population with high HIV prevalence in Zimbabwe',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27011359/',
    },
    {
      label: 'Friendship Bench Zimbabwe',
      url: 'https://www.friendshipbenchzimbabwe.org/',
    },
  ],
  questions: [
    { id: 'ssq1', text: 'In the past week, were there times when you were thinking deeply or thinking about many things?' },
    { id: 'ssq2', text: 'In the past week, did you find yourself sometimes failing to concentrate?' },
    { id: 'ssq3', text: 'In the past week, did you lose your temper or get annoyed over trivial matters?' },
    { id: 'ssq4', text: 'In the past week, did you have nightmares or bad dreams?' },
    { id: 'ssq5', text: 'In the past week, did you have any complaints of headaches?' },
    { id: 'ssq6', text: 'In the past week, were you generally unhappy with things you would normally do?' },
    { id: 'ssq7', text: 'In the past week, did your work lag behind or fall short of what you would normally do?' },
    { id: 'ssq8', text: 'In the past week, were you frightened by trivial things?' },
    { id: 'ssq9', text: 'In the past week, did you sometimes feel that you had failed in life?' },
    { id: 'ssq10', text: 'In the past week, did you sometimes feel like crying?' },
    { id: 'ssq11', text: 'In the past week, did you feel run down or tired?' },
    { id: 'ssq12', text: 'In the past week, did you have moments when you felt life was so tough that you wanted to give up?' },
    {
      id: 'ssq13',
      text: 'In the past week, did you ever think of killing yourself?',
      riskItem: true,
      riskThreshold: 1,
    },
    { id: 'ssq14', text: 'In the past week, were you satisfied with your work performance?', reverse: true },
  ],
  bands: [
    {
      min: 0,
      max: 7,
      label: 'Below threshold',
      tone: 'ok',
      summary:
        'Your answers fall below the threshold used to identify common mental disorder.',
      advice:
        'Nothing here suggests you need clinical support right now. If things change, or if this does not match how you actually feel, come back and take it again — or just talk to someone.',
    },
    {
      min: 8,
      max: 10,
      label: 'Above threshold',
      tone: 'moderate',
      summary:
        'Your answers are at or above the threshold that Friendship Bench uses to identify common mental disorder.',
      advice:
        'This is exactly the point at which the Friendship Bench was designed to help. Sessions are free, confidential, and available in Shona, Ndebele and English. Four to six sessions of problem-solving therapy is the standard course.',
    },
    {
      min: 11,
      max: 14,
      label: 'High',
      tone: 'high',
      summary:
        'Your answers suggest a high level of distress — at or above the more severe threshold.',
      advice:
        'Please speak to someone soon. Friendship Bench counsellors can see you free of charge and will refer you on to a clinical psychologist or psychiatrist if that is what you need.',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* WHO-5 — wellbeing                                                   */
/* ------------------------------------------------------------------ */

export const who5: Instrument = {
  slug: 'who-5',
  name: 'WHO-5',
  fullName: 'WHO-5 Well-Being Index',
  tagline: 'Measures positive wellbeing rather than symptoms.',
  about:
    'The WHO-5 asks about the presence of good things rather than the presence of problems, which makes it a gentler place to start. It is one of the most widely used wellbeing measures in the world and also works as a depression screener.',
  recallPeriod: 'the last 2 weeks',
  estimatedMinutes: 2,
  category: 'wellbeing',
  intro:
    'Please say which is closest to how you have been feeling over the last two weeks. Notice that higher numbers mean better wellbeing here.',
  options: [
    { label: 'At no time', value: 0 },
    { label: 'Some of the time', value: 1 },
    { label: 'Less than half the time', value: 2, shortLabel: 'Less than half' },
    { label: 'More than half the time', value: 3, shortLabel: 'More than half' },
    { label: 'Most of the time', value: 4 },
    { label: 'All of the time', value: 5 },
  ],
  maxScore: 25,
  cutoff: 13,
  cutoffNote:
    'The raw score is multiplied by 4 to give a percentage. A raw score of 13 or below (50% or less) indicates poor wellbeing and warrants further assessment.',
  licence:
    'Free to use. Copyright Psychiatric Research Unit, Mental Health Centre North Zealand. May be reproduced without permission for non-commercial use.',
  source: [
    {
      label: 'Topp et al. (2015), The WHO-5 Well-Being Index: a systematic review of the literature',
      url: 'https://pubmed.ncbi.nlm.nih.gov/25831962/',
    },
  ],
  questions: [
    { id: 'who1', text: 'I have felt cheerful and in good spirits', reverse: true },
    { id: 'who2', text: 'I have felt calm and relaxed', reverse: true },
    { id: 'who3', text: 'I have felt active and vigorous', reverse: true },
    { id: 'who4', text: 'I woke up feeling fresh and rested', reverse: true },
    { id: 'who5', text: 'My daily life has been filled with things that interest me', reverse: true },
  ],
  bands: [
    {
      min: 0,
      max: 7,
      label: 'Very low wellbeing',
      tone: 'high',
      summary:
        'Your wellbeing score is very low. This pattern is strongly associated with depression.',
      advice:
        'Please consider taking the PHQ-9 as well, and speaking to a counsellor. A score this low usually means something needs to change, and support genuinely helps.',
    },
    {
      min: 8,
      max: 13,
      label: 'Low wellbeing',
      tone: 'moderate',
      summary:
        'Your wellbeing score is below the threshold that suggests further assessment.',
      advice:
        'It is worth taking the PHQ-9 to look at this more closely, and considering a conversation with a counsellor. Low wellbeing is not a diagnosis, but it is worth paying attention to.',
    },
    {
      min: 14,
      max: 19,
      label: 'Moderate wellbeing',
      tone: 'mild',
      summary: 'Your wellbeing score is in the moderate range.',
      advice:
        'Things seem reasonably steady. Keeping up sleep, movement, and time with people you like is the most reliable way to protect this.',
    },
    {
      min: 20,
      max: 25,
      label: 'Good wellbeing',
      tone: 'ok',
      summary: 'Your wellbeing score is good.',
      advice:
        'Whatever you are doing is working. Worth noticing what that is, so you can lean on it when things get harder.',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* PC-PTSD-5 — trauma                                                  */
/* ------------------------------------------------------------------ */

export const pcptsd5: Instrument = {
  slug: 'pc-ptsd-5',
  name: 'PC-PTSD-5',
  fullName: 'Primary Care PTSD Screen for DSM-5',
  tagline: 'A short screen for post-traumatic stress after a frightening event.',
  about:
    'This screen is for people who have lived through something frightening, horrible or upsetting — an accident, an assault, a disaster, violence, the sudden loss of someone close. It asks whether that event is still affecting you now.',
  recallPeriod: 'the past month',
  estimatedMinutes: 2,
  category: 'trauma',
  intro:
    'These questions are about a frightening, horrible or upsetting experience — for example a serious accident, physical or sexual assault, violence, a disaster, or the sudden death of someone close to you. If you have lived through something like that, answer yes or no about the past month. If nothing like this has happened to you, this screen will not tell you much, and you can skip it.',
  options: YES_NO,
  maxScore: 5,
  cutoff: 3,
  cutoffNote:
    'A score of 3 or more is a positive screen and indicates that a full PTSD assessment is warranted.',
  licence:
    'Public domain. Developed by the US National Center for PTSD, Department of Veterans Affairs. Free to use and reproduce.',
  source: [
    {
      label: 'Prins et al. (2016), The Primary Care PTSD Screen for DSM-5 (PC-PTSD-5)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27599491/',
    },
    {
      label: 'US National Center for PTSD — PC-PTSD-5',
      url: 'https://www.ptsd.va.gov/professional/assessment/screens/pc-ptsd.asp',
    },
  ],
  questions: [
    {
      id: 'ptsd1',
      text: 'In the past month, have you had nightmares about the event, or thought about it when you did not want to?',
    },
    {
      id: 'ptsd2',
      text: 'In the past month, have you tried hard not to think about the event, or gone out of your way to avoid situations that reminded you of it?',
    },
    {
      id: 'ptsd3',
      text: 'In the past month, have you been constantly on guard, watchful, or easily startled?',
    },
    {
      id: 'ptsd4',
      text: 'In the past month, have you felt numb or detached from people, activities, or your surroundings?',
    },
    {
      id: 'ptsd5',
      text: 'In the past month, have you felt guilty or unable to stop blaming yourself or others for the event or any problems the event may have caused?',
    },
  ],
  bands: [
    {
      min: 0,
      max: 2,
      label: 'Negative screen',
      tone: 'ok',
      summary:
        'Your answers do not meet the threshold for a positive PTSD screen.',
      advice:
        'This screen does not suggest PTSD. That does not mean a difficult experience has not affected you — if it weighs on you, that is reason enough to talk to someone.',
    },
    {
      min: 3,
      max: 5,
      label: 'Positive screen',
      tone: 'high',
      summary:
        'Your answers are a positive screen, meaning a full assessment for post-traumatic stress is warranted.',
      advice:
        'Please speak to a mental health professional who can do a proper assessment. PTSD responds well to specific treatments, and those treatments work best when the right diagnosis is made first.',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* AUDIT-C — alcohol                                                   */
/* ------------------------------------------------------------------ */

export const auditc: Instrument = {
  slug: 'audit-c',
  name: 'AUDIT-C',
  fullName: 'Alcohol Use Disorders Identification Test — Consumption',
  tagline: 'Three questions on drinking patterns, from the WHO instrument.',
  about:
    'The AUDIT-C is the three consumption questions from the WHO AUDIT. It identifies drinking that is likely to be harming your health, including patterns that do not look like dependence.',
  recallPeriod: 'the past year',
  estimatedMinutes: 1,
  category: 'substance',
  intro:
    'These three questions are about your drinking over the past year. One standard drink is roughly a 340ml bottle of beer, a 150ml glass of wine, or a single 45ml tot of spirits.',
  options: [], // per-question options, handled below
  maxScore: 12,
  cutoff: 4,
  cutoffNote:
    'A score of 4 or more in men, or 3 or more in women, indicates drinking likely to be harmful. A score of 8 or more suggests a strong likelihood of alcohol dependence.',
  licence:
    'World Health Organization instrument, free to use for non-commercial purposes.',
  source: [
    {
      label: 'Bush et al. (1998), The AUDIT alcohol consumption questions (AUDIT-C)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/9738608/',
    },
    {
      label: 'WHO — AUDIT: The Alcohol Use Disorders Identification Test',
      url: 'https://www.who.int/publications/i/item/WHO-MSD-MSB-01.6a',
    },
  ],
  questions: [
    { id: 'audit1', text: 'How often do you have a drink containing alcohol?' },
    {
      id: 'audit2',
      text: 'How many standard drinks containing alcohol do you have on a typical day when you are drinking?',
    },
    { id: 'audit3', text: 'How often do you have six or more drinks on one occasion?' },
  ],
  bands: [
    {
      min: 0,
      max: 3,
      label: 'Lower risk',
      tone: 'ok',
      summary: 'Your answers suggest lower-risk drinking.',
      advice:
        'Nothing here flags a problem. Worth knowing that risk rises sharply with heavy single occasions, even when the weekly total is modest.',
    },
    {
      min: 4,
      max: 7,
      label: 'Increased risk',
      tone: 'moderate',
      summary:
        'Your answers suggest drinking at a level that increases your risk of harm.',
      advice:
        'This is worth a conversation with a health worker. Most people at this level are not dependent — small changes now tend to be much easier than bigger ones later.',
    },
    {
      min: 8,
      max: 12,
      label: 'High risk',
      tone: 'high',
      summary:
        'Your answers suggest a high-risk drinking pattern, with a strong likelihood of alcohol dependence.',
      advice:
        'Please speak to a health professional. Do not stop heavy drinking abruptly on your own — withdrawal can be dangerous and should be managed with medical support.',
    },
  ],
};

/** AUDIT-C uses different options per question. */
export const auditcOptions: Record<string, ResponseOption[]> = {
  audit1: [
    { label: 'Never', value: 0 },
    { label: 'Monthly or less', value: 1 },
    { label: '2–4 times a month', value: 2 },
    { label: '2–3 times a week', value: 3 },
    { label: '4 or more times a week', value: 4 },
  ],
  audit2: [
    { label: '1 or 2', value: 0 },
    { label: '3 or 4', value: 1 },
    { label: '5 or 6', value: 2 },
    { label: '7 to 9', value: 3 },
    { label: '10 or more', value: 4 },
  ],
  audit3: [
    { label: 'Never', value: 0 },
    { label: 'Less than monthly', value: 1 },
    { label: 'Monthly', value: 2 },
    { label: 'Weekly', value: 3 },
    { label: 'Daily or almost daily', value: 4 },
  ],
};

/* ------------------------------------------------------------------ */
/* Registry + scoring                                                  */
/* ------------------------------------------------------------------ */

export const instruments: Instrument[] = [ssq14, phq9, gad7, who5, pcptsd5, auditc];

export function getInstrument(slug: string): Instrument | undefined {
  return instruments.find((i) => i.slug === slug);
}

/** Returns the options for a given question, handling per-question scales. */
export function optionsFor(instrument: Instrument, questionId: string): ResponseOption[] {
  if (instrument.slug === 'audit-c') {
    return auditcOptions[questionId] ?? [];
  }
  return instrument.options;
}

export type ScoreResult = {
  score: number;
  maxScore: number;
  band: SeverityBand;
  /** Percentage, used by WHO-5 and progress meters. */
  percentage: number;
  aboveCutoff: boolean;
  /** True when a risk item was endorsed at or above its threshold. */
  riskFlagged: boolean;
};

/**
 * Scores a completed instrument.
 *
 * `answers` maps question id -> selected option value.
 *
 * Note on reverse items: the WHO-5 is scored as-is (higher = better) and the
 * SSQ-14's item 14 is the single positively-worded item, scored 1 for "No".
 */
export function scoreInstrument(
  instrument: Instrument,
  answers: Record<string, number>
): ScoreResult {
  let score = 0;
  let riskFlagged = false;

  for (const question of instrument.questions) {
    const raw = answers[question.id];
    if (raw === undefined) continue;

    // SSQ-14 item 14 is positively worded: "No" (0) is the symptomatic answer.
    if (instrument.slug === 'ssq-14' && question.reverse) {
      score += raw === 0 ? 1 : 0;
    } else {
      score += raw;
    }

    if (question.riskItem && raw >= (question.riskThreshold ?? 1)) {
      riskFlagged = true;
    }
  }

  const band =
    instrument.bands.find((b) => score >= b.min && score <= b.max) ??
    instrument.bands[instrument.bands.length - 1];

  // WHO-5 is conventionally reported as a percentage (raw x 4).
  const percentage = Math.round((score / instrument.maxScore) * 100);

  // For WHO-5 a LOW score is the concerning direction.
  const aboveCutoff =
    instrument.slug === 'who-5' ? score <= instrument.cutoff : score >= instrument.cutoff;

  return { score, maxScore: instrument.maxScore, band, percentage, aboveCutoff, riskFlagged };
}
