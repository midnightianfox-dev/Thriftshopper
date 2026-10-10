const CACHE='thrift-shop-dark-v2';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/','/manifest.webmanifest','/icon.svg']))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('thrift-max-')&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||u.pathname.startsWith('/api/'))return;if(e.request.mode==='navigate')e.respondWith(fetch(e.request).catch(()=>caches.match('/')));else if(['/icon.svg','/manifest.webmanifest'].includes(u.pathname))e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
