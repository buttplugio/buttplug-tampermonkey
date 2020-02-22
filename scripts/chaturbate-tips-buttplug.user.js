// ==UserScript==
// @name Chaturbate Tips to Buttplug.io
// @namespace https://raw.github.com/buttplugio/buttplug-chaturbate/master/scripts/chaturbate-tips-buttplug.user.js
// @version 0.1
// @description injects code to read tips from chatubrate.com and translate them into vibration
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
// @require https://cdn.jsdelivr.net/npm/buttplug@0.12.2/dist/web/buttplug.min.js
// @copyright MIT
// ==/UserScript==

function newTipsOccurred(tips) {
  console.log('Received new tips');
  console.log(tips);
}
window.addEventListener('load', async function() {
  let buttplug_client = new Buttplug.ButtplugClient("Tutorial Client");
  let buttplug_devices = [];
  buttplug_client.addListener('deviceadded', async (device) => {
    buttplug_devices.push(device);
    await buttplug_client.StopScanning();
  });
  const connector = new Buttplug.ButtplugEmbeddedClientConnector();
  await buttplug_client.Connect(connector);


  let button = document.createElement("button");
  button.innerHTML = "Click to vibrate";
  button.addEventListener('click', async () => {
    await buttplug_client.StartScanning();
  });
  document.getElementById("header").appendChild(button);
  (function() {
    let chatbox = $('#chat-box')[0];
    let lastTipCount = 0;
    chatbox.addEventListener('DOMNodeInserted', async function(event){
      let tips = Array
          .apply(null, $('#chat-box span.emoticonImage')
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
        if (buttplug_devices.length > 0) {
          await buttplug_devices[0].SendVibrateCmd(1.0);
          setTimeout(() => buttplug_devices[0].SendVibrateCmd(0), newTips[0].amount * 100);
        }
        /*
          for d of buttplug_devices {
          await d.SendVibrateCmd(1.0);
          setTimeout(() => d.SendVibrateCmd(0), newTips[0].amount * 100);
          }
        */
      }
    });
  })();
}, false);
