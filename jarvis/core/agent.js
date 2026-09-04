// ============================================================
// Agent — triage, recommendation, and command summary logic
// All logic is rule-based on synthetic seed data.
// JARVIS recommends; Palmer decides.
// ============================================================

import { getState } from './store.js';

export function triage() {
  const s = getState();
  const business = s.messages.filter(m => m.category === 'business');
  const spam = s.messages.filter(m => m.category === 'spam');
  const quarantined = s.quarantine.filter(q => q.status === 'quarantined');
  const drafts = s.messages.filter(m => m.status === 'draft');
  const awaitingReply = s.threads.filter(t => t.status === 'awaiting-reply');
  const waitingOnOther = s.threads.filter(t => t.status === 'waiting-on-other');

  return {
    businessInbox: business.length,
    promotionsAndSpam: spam.length + quarantined.length,
    quarantined: quarantined.length,
    draftsPending: drafts.length,
    awaitingReply: awaitingReply.length,
    waitingOnOther: waitingOnOther.length,
  };
}

export function getCommandSummary() {
  const s = getState();
  const triageResult = triage();

  const urgentItems = [];
  // Urgent: high-priority pending tasks
  s.tasks.filter(t => t.priority === 'high' && (t.status === 'pending' || t.status === 'in-progress')).forEach(t => {
    urgentItems.push({ type: 'task', label: t.title, due: t.dueDate, id: t.id });
  });
  // Urgent: calendar conflicts
  s.calendarCandidates.filter(c => c.conflicts.length > 0 && c.status === 'pending').forEach(c => {
    urgentItems.push({ type: 'calendar-conflict', label: c.title, due: c.start, id: c.id });
  });

  const decisionsNeeded = s.approvals.filter(a => a.status === 'pending');
  const peopleAwaitingReply = s.threads.filter(t => t.status === 'awaiting-reply').map(t => {
    const contact = s.contacts.find(c => c.id === t.contactId);
    return { thread: t, contact };
  });
  const opportunities = s.opportunities;
  const calendarConflicts = s.calendarCandidates.filter(c => c.conflicts.length > 0 || c.duplicates.length > 0);
  const waitingOnOthers = s.tasks.filter(t => t.status === 'waiting');
  const quarantined = s.quarantine.filter(q => q.status === 'quarantined');
  const handledDrafts = s.messages.filter(m => m.status === 'approved-not-sent' || m.status === 'handled');

  return {
    triage: triageResult,
    urgentItems,
    decisionsNeeded,
    peopleAwaitingReply,
    opportunities,
    calendarConflicts,
    waitingOnOthers,
    quarantined,
    handledDrafts,
  };
}

export function getRecommendation(briefId) {
  const s = getState();
  const brief = s.decisionBriefs.find(b => b.id === briefId);
  if (!brief) return null;
  return {
    recommendation: brief.recommendation,
    confidence: brief.confidence,
    missingData: brief.missingData,
    nextAction: brief.nextAction,
    note: 'JARVIS recommends this option based on available data. Palmer makes the final decision.',
  };
}
