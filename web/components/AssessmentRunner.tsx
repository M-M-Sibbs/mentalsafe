'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  type Instrument,
  optionsFor,
  scoreInstrument,
  type ScoreResult,
} from '@/lib/instruments';
import { saveResult } from '@/lib/storage';
import RiskInterstitial from '@/components/RiskInterstitial';
import ResultPanel from '@/components/ResultPanel';

type Stage = 'intro' | 'questions' | 'risk' | 'result';

export default function AssessmentRunner({ instrument }: { instrument: Instrument }) {
  const [stage, setStage] = useState<Stage>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ScoreResult | null>(null);
  /** Set when a risk item is endorsed; we show support before the score. */
  const [riskAcknowledged, setRiskAcknowledged] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const total = instrument.questions.length;
  const question = instrument.questions[index];
  const options = useMemo(
    () => (question ? optionsFor(instrument, question.id) : []),
    [instrument, question]
  );

  // Move focus to the question when it changes so screen-reader and keyboard
  // users are not left at the top of the page after each answer.
  useEffect(() => {
    if (stage === 'questions') headingRef.current?.focus();
  }, [index, stage]);

  const finish = useCallback(
    (finalAnswers: Record<string, number>) => {
      const scored = scoreInstrument(instrument, finalAnswers);
      setResult(scored);
      saveResult({
        slug: instrument.slug,
        instrumentName: instrument.name,
        score: scored.score,
        maxScore: scored.maxScore,
        bandLabel: scored.band.label,
        tone: scored.band.tone,
      });
      setStage('result');
    },
    [instrument]
  );

  const handleAnswer = (value: number) => {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);

    // Safety first: if this is the self-harm item and it was endorsed, we
    // interrupt immediately rather than waiting for the end of the
    // questionnaire. The remaining questions can wait; this cannot.
    const isRisk = question.riskItem && value >= (question.riskThreshold ?? 1);
    if (isRisk && !riskAcknowledged) {
      setStage('risk');
      return;
    }

    if (index + 1 >= total) {
      finish(next);
    } else {
      setIndex(index + 1);
    }
  };

  const continueAfterRisk = () => {
    setRiskAcknowledged(true);
    if (index + 1 >= total) {
      finish(answers);
    } else {
      setIndex(index + 1);
      setStage('questions');
    }
  };

  const goBack = () => {
    if (index === 0) {
      setStage('intro');
    } else {
      setIndex(index - 1);
    }
  };

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setResult(null);
    setRiskAcknowledged(false);
    setStage('intro');
  };

  /* ---------------------------------------------------------------- */

  if (stage === 'intro') {
    return (
      <div className="card animate-fade-up p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          {instrument.fullName}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{instrument.name}</h1>
        <p className="mt-4 leading-relaxed text-slate-600">{instrument.about}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-sand-100 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Questions</dt>
            <dd className="mt-1 text-lg font-bold text-slate-900">{total}</dd>
          </div>
          <div className="rounded-xl bg-sand-100 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Takes about</dt>
            <dd className="mt-1 text-lg font-bold text-slate-900">
              {instrument.estimatedMinutes} min
            </dd>
          </div>
          <div className="rounded-xl bg-sand-100 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Covers</dt>
            <dd className="mt-1 text-lg font-bold text-slate-900">{instrument.recallPeriod}</dd>
          </div>
        </dl>

        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-4">
          <p className="text-sm leading-relaxed text-brand-900">{instrument.intro}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => setStage('questions')} className="btn-primary sm:flex-none">
            Start
          </button>
          <Link href="/assessments" className="btn-secondary sm:flex-none">
            Choose a different one
          </Link>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-slate-500">
          Your answers stay on this device. Nothing is sent anywhere, and there is no account.
        </p>
      </div>
    );
  }

  if (stage === 'risk') {
    return <RiskInterstitial onContinue={continueAfterRisk} />;
  }

  if (stage === 'result' && result) {
    return <ResultPanel instrument={instrument} result={result} onRestart={restart} />;
  }

  /* ------------------------------- questions ----------------------- */

  const progress = Math.round((index / total) * 100);
  const current = answers[question.id];

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700">
            Question {index + 1} of {total}
          </span>
          <span className="text-slate-500">{instrument.name}</span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-sand-200"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label="Progress through the questionnaire"
        >
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-300"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        <p className="text-sm text-slate-500">
          Thinking about <span className="font-semibold text-slate-700">{instrument.recallPeriod}</span>
        </p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 text-xl font-semibold leading-snug text-slate-900 outline-none sm:text-2xl"
        >
          {question.text}
        </h1>

        <div className="mt-6 space-y-3" role="radiogroup" aria-label={question.text}>
          {options.map((option) => {
            const selected = current === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleAnswer(option.value)}
                className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-4 text-left
                            text-base transition-colors ${
                              selected
                                ? 'border-brand-600 bg-brand-50 text-brand-900'
                                : 'border-sand-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50/40'
                            }`}
              >
                <span
                  aria-hidden
                  className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 ${
                    selected ? 'border-brand-600 bg-brand-600' : 'border-slate-300'
                  }`}
                >
                  {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                </span>
                <span className="font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button type="button" onClick={goBack} className="btn-secondary">
          Back
        </button>
        <Link href="/crisis" className="text-sm font-semibold text-urgent-700 underline underline-offset-2">
          I need help now
        </Link>
      </div>
    </div>
  );
}
