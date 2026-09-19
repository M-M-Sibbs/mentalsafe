import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getInstrument, instruments } from '@/lib/instruments';
import AssessmentRunner from '@/components/AssessmentRunner';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return instruments.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const instrument = getInstrument(slug);
  if (!instrument) return { title: 'Assessment not found' };

  return {
    title: `${instrument.name} — ${instrument.fullName}`,
    description: instrument.tagline,
  };
}

export default async function AssessmentPage({ params }: Props) {
  const { slug } = await params;
  const instrument = getInstrument(slug);
  if (!instrument) notFound();

  return (
    <div className="container-page max-w-3xl py-10">
      <AssessmentRunner instrument={instrument} />
    </div>
  );
}
