import { instruments, getInstrument, scoreInstrument, optionsFor } from '../.test-build/instruments.js';

let pass = 0, fail = 0;
const check = (name, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name}\n        got ${JSON.stringify(actual)} want ${JSON.stringify(expected)}`); }
};

console.log('\n--- Structural integrity ---');
for (const i of instruments) {
  // Max score must equal the sum of the highest option per question.
  const computedMax = i.questions.reduce((sum, q) => {
    const opts = optionsFor(i, q.id);
    return sum + Math.max(...opts.map(o => o.value));
  }, 0);
  check(`${i.name}: maxScore matches item count x scale (${i.maxScore})`, computedMax, i.maxScore);

  // Bands must cover 0..maxScore with no gaps or overlaps.
  const sorted = [...i.bands].sort((a,b) => a.min - b.min);
  let expectedMin = 0, contiguous = true;
  for (const b of sorted) {
    if (b.min !== expectedMin) contiguous = false;
    expectedMin = b.max + 1;
  }
  check(`${i.name}: bands contiguous 0..${i.maxScore}`, contiguous && expectedMin - 1 === i.maxScore, true);

  // Every question must have options.
  const allHaveOpts = i.questions.every(q => optionsFor(i, q.id).length > 0);
  check(`${i.name}: every item has a response scale`, allHaveOpts, true);
}

console.log('\n--- PHQ-9 scoring ---');
const phq = getInstrument('phq-9');
const allZero = Object.fromEntries(phq.questions.map(q => [q.id, 0]));
check('all zeros -> 0, Minimal', (() => { const r = scoreInstrument(phq, allZero); return [r.score, r.band.label, r.riskFlagged]; })(), [0, 'Minimal', false]);
const allThree = Object.fromEntries(phq.questions.map(q => [q.id, 3]));
check('all threes -> 27, Severe, risk flagged', (() => { const r = scoreInstrument(phq, allThree); return [r.score, r.band.label, r.riskFlagged]; })(), [27, 'Severe', true]);
// Score exactly 10 = cutoff -> Moderate
const ten = { ...allZero, phq1:3, phq2:3, phq3:2, phq4:2 };
check('score 10 -> Moderate, aboveCutoff', (() => { const r = scoreInstrument(phq, ten); return [r.score, r.band.label, r.aboveCutoff]; })(), [10, 'Moderate', true]);
// Risk item alone triggers flag even at low total
const riskOnly = { ...allZero, phq9: 1 };
check('item 9 endorsed at low total -> risk flagged', (() => { const r = scoreInstrument(phq, riskOnly); return [r.score, r.band.label, r.riskFlagged]; })(), [1, 'Minimal', true]);

console.log('\n--- GAD-7 scoring ---');
const gad = getInstrument('gad-7');
const g0 = Object.fromEntries(gad.questions.map(q => [q.id, 0]));
check('all threes -> 21, Severe', (() => { const r = scoreInstrument(gad, Object.fromEntries(gad.questions.map(q=>[q.id,3]))); return [r.score, r.band.label]; })(), [21, 'Severe']);
check('score 10 -> Moderate', (() => { const r = scoreInstrument(gad, {...g0, gad1:3,gad2:3,gad3:2,gad4:2}); return [r.score, r.band.label]; })(), [10, 'Moderate']);
check('GAD-7 has no risk item', gad.questions.some(q=>q.riskItem), false);

console.log('\n--- SSQ-14 scoring (reverse item 14) ---');
const ssq = getInstrument('ssq-14');
// All "No" (0). Item 14 is positively worded: "No" to "satisfied with work" = 1 symptom point.
const ssqNo = Object.fromEntries(ssq.questions.map(q => [q.id, 0]));
check('all No -> 1 (item 14 reverse), Below threshold', (() => { const r = scoreInstrument(ssq, ssqNo); return [r.score, r.band.label]; })(), [1, 'Below threshold']);
// All "Yes": items 1-13 = 13 points, item 14 "Yes"(satisfied) = 0 -> 13
const ssqYes = Object.fromEntries(ssq.questions.map(q => [q.id, 1]));
check('all Yes -> 13, High, risk flagged', (() => { const r = scoreInstrument(ssq, ssqYes); return [r.score, r.band.label, r.riskFlagged]; })(), [13, 'High', true]);
// True max 14: yes to 1-13 AND no to 14
const ssqMax = { ...ssqYes, ssq14: 0 };
check('max possible -> 14, High', (() => { const r = scoreInstrument(ssq, ssqMax); return [r.score, r.band.label]; })(), [14, 'High']);
// Cutoff 8
const ssq8 = { ...ssqNo, ssq1:1,ssq2:1,ssq3:1,ssq4:1,ssq5:1,ssq6:1,ssq7:1 }; // 7 + 1 from reverse = 8
check('score 8 -> Above threshold, aboveCutoff', (() => { const r = scoreInstrument(ssq, ssq8); return [r.score, r.band.label, r.aboveCutoff]; })(), [8, 'Above threshold', true]);
check('ssq13 is the risk item', ssq.questions.find(q=>q.riskItem)?.id, 'ssq13');

console.log('\n--- WHO-5 (low score = concerning) ---');
const who = getInstrument('who-5');
const whoMax = Object.fromEntries(who.questions.map(q => [q.id, 5]));
check('all 5s -> 25 (100%), Good, NOT aboveCutoff', (() => { const r = scoreInstrument(who, whoMax); return [r.score, r.percentage, r.band.label, r.aboveCutoff]; })(), [25, 100, 'Good wellbeing', false]);
const whoMin = Object.fromEntries(who.questions.map(q => [q.id, 0]));
check('all 0s -> 0 (0%), Very low, aboveCutoff=true (concern)', (() => { const r = scoreInstrument(who, whoMin); return [r.score, r.percentage, r.band.label, r.aboveCutoff]; })(), [0, 0, 'Very low wellbeing', true]);
const who13 = Object.fromEntries(who.questions.map((q,idx) => [q.id, idx < 3 ? 3 : 2]));
check('score 13 (cutoff) -> Low wellbeing, flagged', (() => { const r = scoreInstrument(who, who13); return [r.score, r.band.label, r.aboveCutoff]; })(), [13, 'Low wellbeing', true]);

console.log('\n--- PC-PTSD-5 ---');
const ptsd = getInstrument('pc-ptsd-5');
const p0 = Object.fromEntries(ptsd.questions.map(q => [q.id, 0]));
check('0 -> Negative screen', (() => { const r = scoreInstrument(ptsd, p0); return [r.score, r.band.label, r.aboveCutoff]; })(), [0, 'Negative screen', false]);
check('3 -> Positive screen', (() => { const r = scoreInstrument(ptsd, {...p0, ptsd1:1,ptsd2:1,ptsd3:1}); return [r.score, r.band.label, r.aboveCutoff]; })(), [3, 'Positive screen', true]);
check('2 -> still Negative', (() => { const r = scoreInstrument(ptsd, {...p0, ptsd1:1,ptsd2:1}); return [r.score, r.band.label]; })(), [2, 'Negative screen']);

console.log('\n--- AUDIT-C (per-question scales) ---');
const audit = getInstrument('audit-c');
check('audit1 has 5 options', optionsFor(audit,'audit1').length, 5);
check('max -> 12, High risk', (() => { const r = scoreInstrument(audit, {audit1:4,audit2:4,audit3:4}); return [r.score, r.band.label]; })(), [12, 'High risk']);
check('score 4 -> Increased risk, aboveCutoff', (() => { const r = scoreInstrument(audit, {audit1:2,audit2:1,audit3:1}); return [r.score, r.band.label, r.aboveCutoff]; })(), [4, 'Increased risk', true]);
check('score 0 -> Lower risk', (() => { const r = scoreInstrument(audit, {audit1:0,audit2:0,audit3:0}); return [r.score, r.band.label]; })(), [0, 'Lower risk']);

console.log('\n--- Partial answers must not crash ---');
check('PHQ-9 with 3 of 9 answered', (() => { const r = scoreInstrument(phq, {phq1:2,phq2:1,phq3:1}); return [r.score, typeof r.band.label]; })(), [4, 'string']);

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail > 0 ? 1 : 0);
