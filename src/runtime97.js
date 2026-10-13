/* New modules subscribe here instead of adding navigation/render wrapper chains. */
window.Game97 = (() => {
  const listeners = new Map();
  const api = {ready:false, hydrating:false, rendering:0};
  api.on = (name, fn) => {
    if (!listeners.has(name)) listeners.set(name, new Set());
    listeners.get(name).add(fn);
  };
  api.emit = (name, value) => { for (const fn of listeners.get(name) || []) fn(value); };
  const navigate = renderNavTab, render = renderAll, hydrate = hydrateState;
  // Capture fresh defaults before any campaign is loaded. Never migrate against
  // the currently played campaign: missing legacy fields must start fresh.
  const defaults = JSON.parse(JSON.stringify(serializableState()));
  api.freshState = () => JSON.parse(JSON.stringify(defaults));
  const mergeDefaults = (base, value) => {
    if (!base || !value || Array.isArray(base) || Array.isArray(value) || typeof base !== 'object' || typeof value !== 'object') return value;
    const result = {...base};
    for (const [key, entry] of Object.entries(value)) result[key] = Object.hasOwn(base,key) ? mergeDefaults(base[key],entry) : entry;
    return result;
  };
  renderNavTab = function(id) {
    if (!document.getElementById(id)?.classList.contains('tab')) return false;
    const result = navigate(id);
    api.emit('navigate', {id, internal:api.rendering>0 || api.hydrating});
    return result;
  };
  renderAll = function() {
    api.rendering++;
    try { return render(); }
    finally { api.rendering--; if (!api.rendering) api.emit('render'); }
  };
  hydrateState = function(value, label) {
    api.hydrating = true;
    try {
      const fresh = api.freshState();
      fresh.base = {...SPECIES[value.species]?.c};
      fresh.chars = {...SPECIES[value.species]?.c};
      fresh.skills = {...SPECIES[value.species]?.free};
      if(!value.ep15)fresh.ep15.initialized=false; // Migrate the imported legacy scene, never the previous campaign.
      const migrated = mergeDefaults(fresh,JSON.parse(JSON.stringify(value)));
      for (const key of Object.keys(S)) delete S[key];
      Object.assign(S,fresh);
      const result = hydrate(migrated, label); api.emit('hydrate', value); return result;
    }
    finally { api.hydrating = false; }
  };
  api.boot = () => {
    api.emit('install'); renderAll(); api.ready = true; api.emit('ready');
  };
  return api;
})();
