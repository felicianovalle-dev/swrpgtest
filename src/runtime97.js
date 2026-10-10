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
    try { const result = hydrate(value, label); api.emit('hydrate', value); return result; }
    finally { api.hydrating = false; }
  };
  api.boot = () => {
    api.emit('install'); renderAll(); api.ready = true; api.emit('ready');
  };
  return api;
})();
