// Opportunities — qualification, expected value, effort, risk, recommendation, next step
import { getState } from '../core/store.js';
import { card, badge, confidenceBar, riskBadge, kv, btn, fmtMoney, sectionTitle, empty } from '../core/ui.js';

export function render() {
  const s = getState();
  const opps = s.opportunities;

  if (opps.length === 0) return sectionTitle('Opportunities', 'No opportunities yet.') + empty('None.');

  const cards = opps.map(o => {
    const contact = s.contacts.find(c => c.id === o.contactId);
    const recVariant = o.recommendation === 'accept' ? 'green' : o.recommendation === 'defer' ? 'red' : o.recommendation === 'pursue' ? 'blue' : 'amber';

    return card({
      title: o.title,
      subtitle: `${contact ? contact.name : 'Unknown'} · ${badge(o.stage, 'blue')}`,
      accent: o.recommendation === 'accept' ? 'green' : o.recommendation === 'defer' ? 'red' : 'gold',
      body: `
        ${kv('Qualification', o.qualification)}
        ${kv('Expected Value', `${fmtMoney(o.expectedValue)} ${o.valuePeriod}`)}
        ${kv('Effort', badge(o.effort.toUpperCase(), o.effort === 'low' ? 'green' : o.effort === 'medium' ? 'amber' : 'red'))}
        ${kv('Risk', riskBadge(o.risk))}
        <div class="kv"><span class="kv-label">Confidence</span><span class="kv-value">${confidenceBar(o.confidence)}</span></div>
        <div class="recommendation-box">
          <div class="recommendation-label">JARVIS Recommends</div>
          <div class="recommendation-value">${badge(o.recommendation.toUpperCase(), recVariant)}</div>
          <div class="recommendation-note">JARVIS recommends this based on available data. Palmer makes the final decision.</div>
        </div>
        ${kv('Next Step', o.nextStep)}
      `,
      actions: btn('View Decision Brief', 'navigate', 'decisions', 'secondary'),
    });
  }).join('');

  return `
    ${sectionTitle('Opportunities', 'Qualified business opportunities with JARVIS recommendations.')}
    <div class="grid-2">${cards}</div>
  `;
}
