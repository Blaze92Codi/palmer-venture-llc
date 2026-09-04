// Agent Gateway — cross-agent handoffs, policies, kill switch, policy tests
import { getState, toggleKillSwitch, approveHandoff, rejectHandoff, runPolicyTests } from '../core/store.js';
import { validateHandoff, runAllTests } from '../core/policy.js';
import { card, badge, kv, btn, statusBadge, fmtDateTime, sectionTitle, empty, confidenceBar } from '../core/ui.js';

export function render() {
  const s = getState();
  const gateways = s.gateways;
  const handoffs = s.handoffs;
  const policies = s.policies;

  // Gateway cards
  const gwHtml = gateways.map(gw => card({
    title: gw.name,
    subtitle: `${badge(gw.peerType.toUpperCase(), 'blue')} · ${badge(gw.status.toUpperCase(), 'gray')}`,
    accent: gw.killSwitchActive ? 'red' : 'gold',
    body: `
      ${kv('Endpoint', `<code>${gw.endpoint}</code>`)}
      ${kv('Credentials', gw.credentials)}
      ${kv('Signed Webhooks', gw.signedWebhooks ? badge('YES', 'green') : badge('NO', 'red'))}
      ${kv('Replay Checks', gw.replayChecks ? badge('YES', 'green') : badge('NO', 'red'))}
      ${kv('Rate Limit', gw.rateLimit)}
      ${kv('Packet Expiry', gw.expiry)}
      ${kv('Dual Audit', gw.dualAudit ? badge('YES', 'green') : badge('NO', 'red'))}
      ${kv('Kill Switch', gw.killSwitchActive ? badge('ACTIVE — ALL HANDOFFS BLOCKED', 'red') : badge('Inactive', 'green'))}
    `,
    actions: btn(gw.killSwitchActive ? 'Deactivate Kill Switch' : 'Activate Kill Switch', 'toggle-kill', gw.id, gw.killSwitchActive ? 'danger' : 'secondary'),
  })).join('');

  // County blocked notice
  const countyPolicy = policies.find(p => p.peerType === 'county');
  const countyHtml = card({
    title: 'County Systems — BLOCKED',
    subtitle: badge('NO ROUTE', 'red'),
    accent: 'red',
    body: `
      <div class="county-blocked">
        <p><strong>County <-> PVLLC has no route.</strong> Blocked by default. No exceptions.</p>
        <ul class="policy-rules">
          ${countyPolicy.rules.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    `,
  });

  // Personal JARVIS policy
  const personalPolicy = policies.find(p => p.peerType === 'personal-jarvis');
  const policyHtml = card({
    title: 'Personal JARVIS — Cross-Agent Policy',
    subtitle: badge('ALLOWED FIELDS ONLY', 'green'),
    accent: 'gold',
    body: `
      <div class="policy-section">
        <div class="policy-label">Allowed Fields:</div>
        <div class="policy-tags">${personalPolicy.allowed.map(f => badge(f, 'green')).join(' ')}</div>
      </div>
      <div class="policy-section">
        <div class="policy-label">Blocked Fields:</div>
        <div class="policy-tags">${personalPolicy.blocked.map(f => badge(f, 'red')).join(' ')}</div>
      </div>
      <div class="policy-section">
        <div class="policy-label">Rules:</div>
        <ul class="policy-rules">${personalPolicy.rules.map(r => `<li>${r}</li>`).join('')}</ul>
      </div>
    `,
  });

  // Handoff packets
  const handoffHtml = handoffs.length === 0
    ? empty('No handoff packets.')
    : handoffs.map(ho => {
      const validation = validateHandoff(ho);
      const fieldsHtml = Object.entries(ho.fields).map(([key, val]) => {
        const display = typeof val === 'object' ? JSON.stringify(val, null, 2) : val;
        return kv(key, `<code>${display}</code>`);
      }).join('');

      return card({
        title: `Handoff Packet ${ho.id}`,
        subtitle: `${badge(ho.targetAgent, 'blue')} · ${statusBadge(ho.status)}`,
        accent: ho.status === 'approved' ? 'green' : 'amber',
        body: `
          <div class="handoff-inspect">
            <div class="handoff-inspect-label">Palmer must inspect exactly what leaves the app:</div>
            ${fieldsHtml}
          </div>
          <div class="validation-box ${validation.valid ? 'validation-ok' : 'validation-fail'}">
            <strong>Policy Validation:</strong> ${validation.valid ? badge('PASSED', 'green') : badge('FAILED', 'red')}
            ${validation.violations.length > 0 ? `<ul class="validation-violations">${validation.violations.map(v => `<li>${v}</li>`).join('')}</ul>` : ''}
          </div>
        `,
        actions: ho.status === 'draft'
          ? `${btn('Approve Handoff', 'approve-handoff', ho.id, 'success')} ${btn('Reject', 'reject-handoff', ho.id, 'danger')}`
          : statusBadge(ho.status),
      });
    }).join('');

  // Policy tests
  const testResults = s.policyTestResults || runAllTests();
  const passed = testResults.filter(r => r.passed).length;
  const failed = testResults.filter(r => !r.passed).length;
  const testsHtml = testResults.map(r => `
    <div class="test-result ${r.passed ? 'test-pass' : 'test-fail'}">
      <span class="test-status">${r.passed ? '✓' : '✗'}</span>
      <span class="test-name">${r.name}</span>
      <span class="test-detail">${r.detail}</span>
    </div>`).join('');

  return `
    ${sectionTitle('Agent Gateway', 'Cross-agent handoff management. Personal JARVIS only. County blocked. Every handoff is a draft until Palmer approves.')}
    <div class="integration-banner">
      ${badge('TEST MODE', 'amber')} ${badge('DISCONNECTED', 'gray')}
      <span>Placeholder endpoint only. No live connections. Separate credentials. Signed webhooks with replay protection.</span>
    </div>
    <div class="grid-2">
      ${gwHtml}
      ${countyHtml}
    </div>
    ${policyHtml}
    <h3 class="subsection-title">Handoff Packets</h3>
    <div class="grid-2">${handoffHtml}</div>
    <h3 class="subsection-title">Policy Tests</h3>
    ${card({
      title: 'Automated Policy Tests',
      subtitle: `${badge(`${passed} passed`, 'green')} ${badge(`${failed} failed`, failed > 0 ? 'red' : 'gray')}`,
      accent: failed > 0 ? 'red' : 'green',
      body: testsHtml + `<div class="test-actions">${btn('Re-run Tests', 'run-policy-tests', '', 'secondary')}</div>`,
    })}
  `;
}
