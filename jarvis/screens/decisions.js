// Decisions — Palmer approval queue with options and recommendation
import { getState, approveApproval, rejectApproval } from '../core/store.js';
import { getRecommendation } from '../core/agent.js';
import { card, badge, confidenceBar, kv, btn, statusBadge, fmtDateTime, sectionTitle, empty } from '../core/ui.js';

export function render() {
  const s = getState();
  const pendingApprovals = s.approvals.filter(a => a.status === 'pending');
  const briefs = s.decisionBriefs;

  const approvalHtml = pendingApprovals.length === 0
    ? empty('No decisions pending. All caught up.')
    : pendingApprovals.map(a => `
      <div class="list-item list-item--approval">
        <div class="list-item-main">
          ${badge(a.type.toUpperCase(), 'amber')}
          <span class="list-item-title">${a.summary}</span>
          <span class="list-item-sub">Requested ${fmtDateTime(a.requestedAt)}</span>
        </div>
        <div class="list-item-actions">
          ${btn('Approve', 'approve', a.id, 'success')}
          ${btn('Reject', 'reject', a.id, 'danger')}
        </div>
      </div>`).join('');

  const briefsHtml = briefs.map(b => {
    const rec = getRecommendation(b.id);
    const optionsHtml = b.options.map(opt => `
      <div class="option-box ${opt.label === b.recommendation ? 'option-box--recommended' : ''}">
        <div class="option-header">
          <span class="option-label">${opt.label}</span>
          ${opt.label === b.recommendation ? badge('RECOMMENDED', 'gold') : ''}
        </div>
        <div class="option-grid">
          <div class="option-pros"><strong>Pros:</strong> ${opt.pros}</div>
          <div class="option-cons"><strong>Cons:</strong> ${opt.cons}</div>
          <div class="option-cost"><strong>Cost:</strong> ${opt.cost}</div>
          <div class="option-risk"><strong>Risk:</strong> ${opt.risk}</div>
        </div>
      </div>`).join('');

    const missingDataHtml = b.missingData.length > 0
      ? `<div class="missing-data"><strong>Missing Data:</strong> ${b.missingData.map(d => badge(d, 'amber')).join(' ')}</div>`
      : '';

    return card({
      title: b.title,
      subtitle: `${badge(b.type.toUpperCase(), 'blue')} · ${statusBadge(b.status)}`,
      accent: 'gold',
      body: `
        <p class="brief-what">${b.what}</p>
        ${optionsHtml}
        <div class="recommendation-box">
          <div class="recommendation-label">JARVIS Recommends</div>
          <div class="recommendation-value">${b.recommendation}</div>
          ${confidenceBar(b.confidence)}
          <div class="recommendation-note">${rec.note}</div>
        </div>
        ${missingDataHtml}
        <div class="kv-group">
          ${kv('Risks', b.risks.join('; '))}
          ${kv('Costs', b.costs)}
          ${kv('Next Action', b.nextAction)}
        </div>
      `,
      actions: b.status === 'pending'
        ? btn('Approve Decision', 'approve-brief', b.id, 'success')
        : statusBadge(b.status),
    });
  }).join('');

  return `
    ${sectionTitle('Decisions', 'Palmer approval queue. JARVIS presents options and recommends — Palmer decides.')}
    ${card({ title: 'Approval Queue', accent: 'amber', body: approvalHtml })}
    <div class="grid-2">${briefsHtml}</div>
  `;
}
