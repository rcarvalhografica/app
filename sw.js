"use strict";

importScripts("/javascripts/workbox/workbox-sw.js"),
  
workbox.setConfig({
  modulePathPrefix:"/javascripts/workbox",
    debug:!1});
var authUrl="/auth/",
    cacheVersion="1",
    discourseCacheName="discourse-"+cacheVersion,
    externalCacheName="external-"+cacheVersion;
workbox.routing.registerRoute((function(t){return t.url.origin===location.origin&&!t.url.pathname.startsWith(authUrl)}),
                              
new workbox.strategies.NetworkFirst({cacheName:discourseCacheName,
plugins:[new workbox.cacheableResponse.Plugin({statuses:[200]}),new workbox.expiration.Plugin({maxAgeSeconds:604800,maxEntries:250,purgeOnQuotaError:!0})]}));var cdnUrls=[];workbox.routing.registerRoute((function(t){return t.url.origin!==location.origin&&0===cdnUrls.filter((function(e){return t.url.href.startsWith(e)})).length}),new workbox.strategies.NetworkFirst({cacheName:externalCacheName,plugins:[new workbox.cacheableResponse.Plugin({statuses:[200]}),new workbox.expiration.Plugin({maxAgeSeconds:604800,maxEntries:250,purgeOnQuotaError:!0})]}));var idleThresholdTime=1e4,lastAction=-1;function isIdle(){return lastAction+idleThresholdTime<Date.now()}function showNotification(t,e,i,n,o,s,r){var a={body:e,icon:i,badge:n,data:{url:r,baseUrl:s},tag:o};return self.registration.showNotification(t,a)}self.addEventListener("push",(function(t){var e=t.data.json();if(!isIdle()&&e.hide_when_active)return!1;t.waitUntil(self.registration.getNotifications({tag:e.tag}).then((function(t){return t&&t.length>0&&t.forEach((function(t){t.close()})),showNotification(e.title,e.body,e.icon,e.badge,e.tag,e.base_url,e.url)})))})),self.addEventListener("notificationclick",(function(t){t.notification.close();var e=t.notification.data.url,i=t.notification.data.baseUrl;t.waitUntil(clients.matchAll({type:"window"}).then((function(t){if(!t.some((function(t){return t.url===i+e&&"focus"in t?(t.focus(),!0):"postMessage"in t&&"focus"in t&&(t.focus(),t.postMessage({url:e}),!0)}))&&clients.openWindow)return clients.openWindow(i+e)})))})),self.addEventListener("message",(function(t){"lastAction"in t.data&&(lastAction=t.data.lastAction)})),self.addEventListener("pushsubscriptionchange",(function(t){t.waitUntil(Promise.all(fetch("https://forum.bubble.io/push_notifications/subscribe",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},body:new URLSearchParams({"subscription[endpoint]":t.newSubscription.endpoint,"subscription[keys][auth]":t.newSubscription.toJSON().keys.auth,"subscription[keys][p256dh]":t.newSubscription.toJSON().keys.p256dh,send_confirmation:!1})}),fetch("https://forum.bubble.io/push_notifications/unsubscribe",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},body:new URLSearchParams({"subscription[endpoint]":t.oldSubscription.endpoint,"subscription[keys][auth]":t.oldSubscription.toJSON().keys.auth,"subscription[keys][p256dh]":t.oldSubscription.toJSON().keys.p256dh})})))}));
//# sourceMappingURL=/assets/service-worker-8995d9480122d0b76c04c56bfb6b8304bdfa5fed5af97ab28ab6c2df7796da6f.js.map
