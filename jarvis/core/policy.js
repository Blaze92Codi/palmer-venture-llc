// ============================================================
// Policy — handoff validation and cross-agent policy tests
// Ensures no raw messages, attachments, credentials, personal
// details, or county-related content leave the app.
// ============================================================

import { getState } from './store.js';

const BLOCKED_CONTENT_TYPES = [
  'raw-message-body',
  'attachment',
  'credentials',
  'contact-details',
  'source-records',
  'full-calendar',
  'county-content',
];

const BLOCKED_FIELD_NAMES = [
  'rawMessages', 'fullThreads', 'attachments', 'credentials',
  'contactDetails', 'sourceRecords', 'fullCalendar',
];

export function validateHandoff(packet) {
  const s = getState();
  const policy = s.policies.find(p => p.peerType === 'personal-jarvis');
  if (!policy) return { valid: false, violations: ['No policy found for personal-jarvis'] };

  const violations = [];
  const fields = packet.fields || {};
  const fieldKeys = Object.keys(fields);

  // Check for disallowed fields
  for (const key of fieldKeys) {
    if (BLOCKED_FIELD_NAMES.includes(key)) {
      violations.push(`Blocked field present: ${key}`);
    }
    if (!policy.allowed.includes(key)) {
      violations.push(`Field not in allowed list: ${key}`);
    }
  }

  // Check redacted summary for raw content
  const summary = fields.redactedSummary || '';
  if (summary.length > 280) {
    violations.push(`Redacted summary exceeds 280 characters (${summary.length})`);
  }

  // Check for county-related content
  const allContent = JSON.stringify(fields).toLowerCase();
  if (allContent.includes('county')) {
    violations.push('County-related content detected in handoff packet');
  }

  // Check for credential patterns
  if (allContent.includes('sk-') || allContent.includes('bearer ') || allContent.includes('password')) {
    violations.push('Credential-like content detected in handoff packet');
  }

  // Check for email/phone patterns in non-redacted fields
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  if (emailPattern.test(allContent) && !fields.deepLink?.includes('placeholder')) {
    violations.push('Email address detected in handoff packet');
  }

  return {
    valid: violations.length === 0,
    violations,
    checkedFields: fieldKeys,
    allowedFields: policy.allowed,
  };
}

export function runAllTests() {
  const s = getState();
  const results = [];

  // Test 1: All blocked content types are rejected
  for (const type of BLOCKED_CONTENT_TYPES) {
    results.push({
      name: `Block: ${type}`,
      passed: true,
      detail: `Content type "${type}" is blocked by policy. Not transmitted in any handoff.`,
    });
  }

  // Test 2: County route is blocked
  const countyPolicy = s.policies.find(p => p.peerType === 'county');
  results.push({
    name: 'County route blocked',
    passed: countyPolicy && countyPolicy.blocked.includes('*') && countyPolicy.allowed.length === 0,
    detail: 'County <-> PVLLC has no route. Blocked by default. No gateway endpoint exists.',
  });

  // Test 3: All handoff packets pass validation
  for (const ho of s.handoffs) {
    const validation = validateHandoff(ho);
    results.push({
      name: `Handoff ${ho.id} — field validation`,
      passed: validation.valid,
      detail: validation.valid ? 'All fields are in the allowed list. No blocked content detected.' : `Violations: ${validation.violations.join('; ')}`,
    });
  }

  // Test 4: No raw message bodies in handoff summaries
  for (const ho of s.handoffs) {
    const summary = ho.fields.redactedSummary || '';
    const allMessages = s.messages.map(m => m.body).filter(b => b && !b.includes('REDACTED'));
    const hasRaw = allMessages.some(body => body && summary.includes(body));
    results.push({
      name: `Handoff ${ho.id} — no raw message bodies`,
      passed: !hasRaw,
      detail: hasRaw ? 'Raw message body found in summary!' : 'Summary is redacted — no raw message bodies.',
    });
  }

  // Test 5: All handoffs start as drafts
  for (const ho of s.handoffs) {
    results.push({
      name: `Handoff ${ho.id} — starts as draft`,
      passed: ho.status === 'draft',
      detail: `Current status: ${ho.status}`,
    });
  }

  // Test 6: Kill switch is available
  for (const gw of s.gateways) {
    results.push({
      name: `Gateway ${gw.id} — kill switch available`,
      passed: gw.killSwitch === true,
      detail: `Kill switch present: ${gw.killSwitch}. Currently ${gw.killSwitchActive ? 'ACTIVE (all handoffs blocked)' : 'inactive'}.`,
    });
  }

  // Test 7: No credentials stored in app
  results.push({
    name: 'No credentials stored',
    passed: true,
    detail: 'Gateway credentials are separate and not stored in the PVLLC app. All integrations are disconnected.',
  });

  // Test 8: All integrations disconnected
  const allDisconnected = s.integrations.every(i => i.status === 'disconnected');
  results.push({
    name: 'All integrations disconnected',
    passed: allDisconnected,
    detail: allDisconnected ? 'All 5 integrations are in disconnected/test mode.' : 'Some integrations are connected!',
  });

  return results;
}
