const ALLOWED_ORIGIN = 'https://tiennn3.github.io';

function json(body, status = 200, origin = '') {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...(origin === ALLOWED_ORIGIN ? {
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Vary': 'Origin',
      } : {}),
    },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const url = new URL(request.url);
    if (url.pathname !== '/api/state') return json({ error: 'Not found' }, 404, origin);
    if (origin && origin !== ALLOWED_ORIGIN) return json({ error: 'Forbidden origin' }, 403);
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type',
          'Access-Control-Max-Age': '86400',
          'Vary': 'Origin',
        },
      });
    }
    if (request.headers.get('Authorization') !== `Bearer ${env.GROUP_TOKEN}`) {
      return json({ error: 'Sai mã truy cập nhóm' }, 401, origin);
    }
    if (request.method === 'GET') {
      const row = await env.DB.prepare('SELECT revision, data FROM app_state WHERE id = 1').first();
      return json(row ? { revision: row.revision, state: JSON.parse(row.data) } : { revision: 0, state: null }, 200, origin);
    }
    if (request.method !== 'PUT') return json({ error: 'Method not allowed' }, 405, origin);
    const length = Number(request.headers.get('Content-Length') || 0);
    if (length > 200000) return json({ error: 'Dữ liệu quá lớn' }, 413, origin);
    let payload;
    try { payload = await request.json(); } catch { return json({ error: 'JSON không hợp lệ' }, 400, origin); }
    const { revision, state } = payload || {};
    if (!Number.isSafeInteger(revision) || revision < 0 || !state ||
        typeof state !== 'object' || Array.isArray(state) ||
        !state.menu || !Array.isArray(state.orders) || !Array.isArray(state.combos) || !state.settings) {
      return json({ error: 'Dữ liệu không hợp lệ' }, 400, origin);
    }
    const data = JSON.stringify(state);
    if (data.length > 200000) return json({ error: 'Dữ liệu quá lớn' }, 413, origin);
    const result = await env.DB.prepare(`
      INSERT INTO app_state (id, revision, data) VALUES (1, 1, ?)
      ON CONFLICT(id) DO UPDATE SET revision = app_state.revision + 1, data = excluded.data
      WHERE app_state.revision = ?
    `).bind(data, revision).run();
    if (result.meta.changes === 0) {
      const row = await env.DB.prepare('SELECT revision, data FROM app_state WHERE id = 1').first();
      return json({ error: 'Conflict', revision: row?.revision || 0, state: row ? JSON.parse(row.data) : null }, 409, origin);
    }
    const row = await env.DB.prepare('SELECT revision FROM app_state WHERE id = 1').first();
    return json({ revision: row.revision }, 200, origin);
  },
};
