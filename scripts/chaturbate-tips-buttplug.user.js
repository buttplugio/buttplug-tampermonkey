// ==UserScript==
// @name Chaturbate Tips to Buttplug.io
// @description Uses buttplug-js to cause local sex toys to work when a tip appears in a chaturbate chat
// @author buttplugio
// @version 0.5
// @homepage https://buttplugio.github.io/buttplug-tampermonkey
// @updateurl https://github.com/buttplugio/buttplug-tampermonkey/raw/master/scripts/chaturbate-tips-buttplug.user.js
// @downloadurl https://github.com/buttplugio/buttplug-tampermonkey/raw/master/scripts/chaturbate-tips-buttplug.user.js
// @include http*://chaturbate.com/*/
// @include http*://*.chaturbate.com/*/
// @include http*://cb.dev/*/
// @include http*://*.cb.dev/*/
// @exclude http*://chaturbate.com
// @exclude http*://serve.ads.chaturbate.com/*
// @exclude http*://support.chaturbate.com/*
// @exclude http*://*.*/tipping/*
// @exclude http*://*.*/my_collection/*
// @exclude http*://*.*/tags/*
// @exclude http*://*.*/tag/*
// @exclude http*://*.*/*-cams/*
// @exclude http*://*.*/supporter/*
// @exclude http*://*.*/tipping/*
// @exclude http*://*.*/terms/*
// @exclude http*://*.*/sitemap/*
// @exclude http*://*.*/jobs/*
// @exclude http*://*.*/affiliates/*
// @exclude http*://*.*/contest/*
// @exclude http*://*.*/apps/*
// @exclude http*://*.*/security/*
// @exclude http*://*.*/billingsupport/*
// @exclude http*://*.*/law_enforcement/*
// @exclude http*://*.*/privacy/*
// @exclude http*://*.*/2257/*
// @exclude http*://*.*/photo_videos/*
// @require https://cdn.jsdelivr.net/npm/buttplug@0.12.2/dist/web/buttplug.min.js
// @require https://raw.githubusercontent.com/buttplugio/buttplug-tampermonkey/master/utils/buttplug-tampermonkey-ui.js
// @copyright MIT
// ==/UserScript==

function newTipsOccurred(tips) {
  console.log('Received new tips');
  console.log(tips);
}
window.addEventListener('load', async function() {
  (function() {
    let chatbox = $('.chat-box')[0];
    let lastTipCount = 0;
    chatbox.addEventListener('DOMNodeInserted', async function(event){
      let tips = Array
          .apply(null, $('.chat-box span.emoticonImage')
                 .closest('div:not([data-nick]):has(span[style])'))
          .filter(x => x.querySelector('span.emoticonImage').innerHTML.match(/tipped \d+ token(s)?/))
          .map(x => {
            return {
              donation: x.firstChild.innerHTML,
              amount: parseInt(x.lastChild.innerHTML.match(/tipped (\d+) token(s)?/)[1])
            };
          });
      let newTips = tips.slice(lastTipCount);
      lastTipCount = tips.length;
      if (newTips.length) {
        newTipsOccurred(newTips);
        // window.buttplug_devices is defined in the buttplug-tampermonkey-ui.js
        // file, and contains a list of all devices we've added. This is a
        // Buttplug.ButtplugClientDevice object, API is at
        // https://buttplug-js.docs.buttplug.io/classes/buttplugclientdevice.html
        for (const device of window.buttplug_devices) {
          if (device.AllowedMessages.includes("VibrateCmd")) {
            await window.buttplug_devices[0].SendVibrateCmd(1.0);
            setTimeout(() => window.buttplug_devices[0].SendVibrateCmd(0), newTips[0].amount * 100);
          }
        }
      }
    });
  })();
}, false);