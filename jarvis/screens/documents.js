// Documents — references/metadata only in prototype
import { getState } from '../core/store.js';
import { card, badge, kv, fmtDate, sectionTitle, empty } from '../core/ui.js';

export function render() {
  const s = getState();
  const docs = s.documents;

  if (docs.length === 0) return sectionTitle('Documents', 'No document references.') + empty('None.');

  const cards = docs.map(d => card({
    title: d.title,
    subtitle: badge(d.type, 'blue'),
    accent: 'gray',
    body: `
      ${kv('Format', d.metadata.format)}
      ${kv('Size', d.metadata.size)}
      ${kv('Author', d.metadata.author)}
      ${kv('Modified', fmtDate(d.metadata.modifiedAt))}
      <div class="doc-note">Prototype: metadata reference only. No file content stored or accessible.</div>
    `,
  })).join('');

  return `
    ${sectionTitle('Documents', 'Document references with metadata only. No file content is stored or transmitted.')}
    <div class="grid-2">${cards}</div>
  `;
}
