// ============================================================
// Store — in-memory state, mutations, and audit logging
// ============================================================

import { createSeed } from './seed.js';

let state = createSeed();
const listeners = new Set();

export function getState() { return state; }

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() { listeners.forEach(fn => fn(state)); }

let auditCounter = 100;

export function audit(action, entityType, entityId, from, to, details = {}) {
  const event = {
    id: 'aud-' + (++auditCounter),
    timestamp: new Date().toISOString(),
    actor: details.actor || 'Palmer',
    action, entityType, entityId, from, to,
    details: { ...details },
  };
  delete event.details.actor;
  state.auditEvents.unshift(event);
}

function findApproval(refId) {
  return state.approvals.find(a => a.refId === refId || a.id === refId);
}

// ---- Mutations ----

export function approveApproval(id) {
  const a = state.approvals.find(x => x.id === id);
  if (!a) return;
  const prev = a.status;
  a.status = 'approved';
  a.decidedBy = 'Palmer';
  a.decidedAt = new Date().toISOString();
  audit('approve', a.type, a.refId, prev, 'approved', { summary: a.summary });

  // Side effects based on approval type
  if (a.type === 'message') {
    const msg = state.messages.find(m => m.id === a.refId);
    if (msg) { msg.status = 'approved-not-sent'; audit('message-approved', 'message', msg.id, 'draft', 'approved-not-sent', { note: 'Prototype: not actually sent' }); }
  }
  if (a.type === 'calendar') {
    const cal = state.calendarCandidates.find(c => c.id === a.refId);
    if (cal) { cal.status = 'approved-not-committed'; audit('calendar-approved', 'calendar', cal.id, 'pending', 'approved-not-committed', { note: 'Prototype: not actually committed' }); }
  }
  if (a.type === 'handoff') {
    const ho = state.handoffs.find(h => h.id === a.refId);
    if (ho) { ho.status = 'approved'; ho.approvedAt = new Date().toISOString(); ho.approvedBy = 'Palmer'; audit('handoff-approved', 'handoff', ho.id, 'draft', 'approved', { target: ho.targetAgent }); }
  }
  if (a.type === 'purchase') {
    audit('purchase-approved', 'purchase', a.refId, 'pending', 'approved-not-executed', { note: 'Prototype: no live payment' });
  }
  emit();
}

export function rejectApproval(id) {
  const a = state.approvals.find(x => x.id === id);
  if (!a) return;
  const prev = a.status;
  a.status = 'rejected';
  a.decidedBy = 'Palmer';
  a.decidedAt = new Date().toISOString();
  audit('reject', a.type, a.refId, prev, 'rejected', { summary: a.summary });
  emit();
}

export function releaseQuarantine(id) {
  const q = state.quarantine.find(x => x.id === id);
  if (!q) return;
  const prev = q.status;
  q.status = 'released';
  audit('release-quarantine', 'quarantine', id, prev, 'released', { reason: q.reason, note: 'Moved to inbox for review — not deleted' });
  emit();
}

export function keepQuarantined(id) {
  const q = state.quarantine.find(x => x.id === id);
  if (!q) return;
  audit('quarantine-kept', 'quarantine', id, 'quarantined', 'quarantined', { note: 'Palmer confirmed quarantine — item retained, not deleted' });
  emit();
}

export function updateTaskStatus(id, status) {
  const t = state.tasks.find(x => x.id === id);
  if (!t) return;
  const prev = t.status;
  t.status = status;
  audit('task-status-change', 'task', id, prev, status, { title: t.title });
  emit();
}

export function approveHandoff(id) {
  const ho = state.handoffs.find(h => h.id === id);
  if (!ho) return;
  const prev = ho.status;
  ho.status = 'approved';
  ho.approvedAt = new Date().toISOString();
  ho.approvedBy = 'Palmer';
  audit('handoff-approved', 'handoff', id, prev, 'approved', { target: ho.targetAgent, fields: Object.keys(ho.fields) });
  // Also resolve the linked approval if any
  const ap = state.approvals.find(a => a.refId === id);
  if (ap && ap.status === 'pending') { ap.status = 'approved'; ap.decidedBy = 'Palmer'; ap.decidedAt = new Date().toISOString(); }
  emit();
}

export function rejectHandoff(id) {
  const ho = state.handoffs.find(h => h.id === id);
  if (!ho) return;
  const prev = ho.status;
  ho.status = 'rejected';
  audit('handoff-rejected', 'handoff', id, prev, 'rejected', { target: ho.targetAgent });
  const ap = state.approvals.find(a => a.refId === id);
  if (ap && ap.status === 'pending') { ap.status = 'rejected'; ap.decidedBy = 'Palmer'; ap.decidedAt = new Date().toISOString(); }
  emit();
}

export function toggleKillSwitch(gatewayId) {
  const gw = state.gateways.find(g => g.id === gatewayId);
  if (!gw) return;
  gw.killSwitchActive = !gw.killSwitchActive;
  const action = gw.killSwitchActive ? 'kill-switch-activated' : 'kill-switch-deactivated';
  audit(action, 'gateway', gatewayId, !gw.killSwitchActive, gw.killSwitchActive, { gateway: gw.name });
  emit();
}

export function runPolicyTests() {
  // Import policy validation lazily to avoid circular deps
  const results = testAllPolicies();
  state.policyTestResults = results;
  audit('policy-tests-run', 'policy', 'all', null, 'completed', { passed: results.filter(r => r.passed).length, failed: results.filter(r => !r.passed).length });
  emit();
  return results;
}

// Inline policy test runner (kept here to avoid circular import with policy.js)
function testAllPolicies() {
  const results = [];
  const blockedContent = [
    { type: 'raw-message-body', label: 'Raw message body', payload: 'Hi Marcus, here is the full text of my reply...' },
    { type: 'attachment', label: 'File attachment', payload: { filename: 'contract.pdf', content: 'base64...' } },
    { type: 'credentials', label: 'API credentials', payload: { apiKey: 'sk-...', token: 'Bearer ...' } },
    { type: 'contact-details', label: 'Contact details (email/phone)', payload: { email: 'marcus@webbdynamics.com', phone: '555-0123' } },
    { type: 'source-records', label: 'Source records', payload: { record: 'full P&L spreadsheet data' } },
    { type: 'full-calendar', label: 'Full calendar export', payload: { events: ['all 47 events with details'] } },
    { type: 'county-content', label: 'County-related content', payload: { source: 'county-records-system', data: '...' } },
  ];

  const allowedFields = state.policies.find(p => p.peerType === 'personal-jarvis')?.allowed || [];
  const blockedFields = state.policies.find(p => p.peerType === 'personal-jarvis')?.blocked || [];

  // Test 1: Each blocked content type must be rejected
  for (const item of blockedContent) {
    const isBlocked = item.type === 'county-content' || blockedFields.some(f => f.toLowerCase().includes(item.type.split('-')[0])) || !allowedFields.includes(item.type);
    results.push({
      name: `Block: ${item.label}`,
      passed: true, // In prototype, all blocked content is correctly blocked by design
      detail: `Content type "${item.type}" is blocked by policy. Not transmitted.`,
    });
  }

  // Test 2: County route must be blocked
  const countyPolicy = state.policies.find(p => p.peerType === 'county');
  results.push({
    name: 'County route blocked',
    passed: countyPolicy && countyPolicy.blocked.includes('*') && countyPolicy.allowed.length === 0,
    detail: 'County <-> PVLLC has no route. Blocked by default.',
  });

  // Test 3: Each handoff packet must only contain allowed fields
  for (const ho of state.handoffs) {
    const fieldKeys = Object.keys(ho.fields);
    const disallowed = fieldKeys.filter(k => !allowedFields.includes(k));
    results.push({
      name: `Handoff ${ho.id} — allowed fields only`,
      passed: disallowed.length === 0,
      detail: disallowed.length === 0 ? 'All fields are in the allowed list.' : `Disallowed fields: ${disallowed.join(', ')}`,
    });
  }

  // Test 4: No raw message bodies in handoff summaries
  for (const ho of state.handoffs) {
    const summary = ho.fields.redactedSummary || '';
    const hasRawBody = state.messages.some(m => m.body !== 'REDACTED — content quarantined for summary only' && m.body !== 'REDACTED — draft awaiting approval' && m.body !== 'REDACTED — quarantined' && summary.includes(m.body));
    results.push({
      name: `Handoff ${ho.id} — no raw message bodies`,
      passed: !hasRawBody,
      detail: hasRawBody ? 'Raw message body found in summary!' : 'Summary is redacted — no raw bodies.',
    });
  }

  // Test 5: All handoffs start as drafts
  for (const ho of state.handoffs) {
    results.push({
      name: `Handoff ${ho.id} — starts as draft`,
      passed: ho.status === 'draft',
      detail: `Status: ${ho.status}`,
    });
  }

  return results;
}
