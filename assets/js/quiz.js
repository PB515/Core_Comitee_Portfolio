const QUESTIONS = [
  {
    label: 'Scenario 01: Budget Slack',
    text: "You're managing a lean ₹12,000 community budget across a multi-week project. Halfway through, a sub-team asks for extra funds for \"better material,\" with no receipts yet.",
    options: [
      { text: 'Approve it immediately to keep morale up.', correct: false },
      { text: 'Deny it outright to protect the ledger.', correct: false },
      { text: 'Audit the specific line item against what remains, and require receipt-backed justification before releasing partial funds.', correct: true },
      { text: 'Table it for a full committee vote next week.', correct: false },
    ],
    feedback: "This is exactly the Navratri Decoration budget: a ₹12,000 cap, every receipt audited, one definitive ledger (hisab), accountability without freezing momentum.",
  },
  {
    label: 'Scenario 02: Infrastructure Failure',
    text: "Your tournament ground is rock-hard and sun-baked. Players are getting injured mid-match, and back-to-back games are already scheduled all day.",
    options: [
      { text: 'Cancel the remaining matches for safety.', correct: false },
      { text: 'Continue as scheduled and treat injuries as they occur.', correct: false },
      { text: 'Institute a pre-match conditioning loop: plough and water-sprinkle the ground before every match, with on-field incident command ready.', correct: true },
      { text: 'Move everything indoors for the rest of the day.', correct: false },
    ],
    feedback: "This mirrors Impulso: manual ploughing plus a water-sprinkling routine before every match, with direct on-field first-aid and evacuation command. The tournament continued safely.",
  },
  {
    label: 'Scenario 03: Internal Stakeholder Dispute',
    text: "Two long-standing members of the same extended family disagree hard on creative direction for a community project. Elders won't intervene; they don't want to fracture family ties.",
    options: [
      { text: 'Call a group meeting and force a resolution in front of everyone.', correct: false },
      { text: 'Pick a side based on seniority.', correct: false },
      { text: 'Run private, individual conversations with each party, then engineer a compromise that blends both visions.', correct: true },
      { text: 'Postpone the decision indefinitely.', correct: false },
    ],
    feedback: "This is the Navratri design deadlock: shuttle diplomacy, individual private mediations, not a group confrontation, landed a fusion design that kept the family and the workforce intact.",
  },
];

const PROFILES = [
  { min: 3, title: 'The Crisis-Ready Operator', blurb: "You reach for the same move under pressure: audit before you act, fix the system before the symptom, and mediate privately before it becomes public. That's the operating pattern behind every case in this portfolio." },
  { min: 2, title: 'The Developing Strategist', blurb: "You get the instinct right most of the time. The gap is usually reaching for the structural fix (a process, a cap, a private conversation) instead of the fastest-looking one." },
  { min: 0, title: 'The Instinctive Responder', blurb: "Your calls lean toward the fast, visible fix. Worth comparing against how these three scenarios actually played out: the resolutions were almost never the obvious first move." },
];

let current = 0;
let score = 0;
const answers = [];

const card = document.getElementById('quizCard');
const progressEl = document.getElementById('quizProgress');
const titleEl = document.getElementById('quizTitle');
const introEl = document.getElementById('quizIntro');

function renderQuestion(i) {
  const q = QUESTIONS[i];
  updateProgress(i);

  card.innerHTML = `
    <div class="quiz-q-label">${q.label}</div>
    <div class="quiz-q-text">${q.text}</div>
    <div class="quiz-options">
      ${q.options.map((o, idx) => `<button class="quiz-option" data-idx="${idx}">${o.text}</button>`).join('')}
    </div>
    <div class="quiz-feedback" id="quizFeedback"></div>
    <button class="quiz-next" id="quizNext">Next →</button>
  `;

  const buttons = card.querySelectorAll('.quiz-option');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.idx);
      const chosen = q.options[idx];
      answers.push(chosen.correct);
      if (chosen.correct) score++;

      buttons.forEach((b, bi) => {
        b.disabled = true;
        if (q.options[bi].correct) b.classList.add('correct');
        else if (bi === idx) b.classList.add('wrong');
      });

      const fb = document.getElementById('quizFeedback');
      fb.innerHTML = `<b>${chosen.correct ? 'Correct.' : 'Not quite.'}</b> ${q.feedback}`;
      fb.classList.add('show');

      const next = document.getElementById('quizNext');
      next.classList.add('show');
      next.textContent = i === QUESTIONS.length - 1 ? 'See my profile →' : 'Next →';
      next.onclick = () => {
        if (i === QUESTIONS.length - 1) renderResult();
        else { current++; renderQuestion(current); }
      };
    });
  });
}

function updateProgress(i) {
  [...progressEl.children].forEach((el, idx) => {
    el.classList.toggle('done', idx < i);
    el.classList.toggle('current', idx === i);
  });
}

function renderResult() {
  [...progressEl.children].forEach((el) => el.classList.add('done'));
  titleEl.textContent = 'Your Resilience Profile';
  introEl.textContent = '';

  const profile = PROFILES.find((p) => score >= p.min);

  card.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-score">${score}/${QUESTIONS.length}</div>
      <div class="quiz-result-profile">${profile.title}</div>
      <p class="quiz-result-blurb">${profile.blurb}</p>
      <a class="quiz-result-cta" href="index.html#pole">Ask me how it actually played out →</a>
    </div>
  `;
}

renderQuestion(current);
