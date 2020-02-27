# Buttplug Tampermonkey Scripts and Utilities

This repo houses scripts and utilties for using
[buttplug-js](https://github.com/buttplugio/buttplug-js) (the
javascript implementation of the [Buttplug Intimate Hardware Control
Protocol](https://buttplug.io)) with the [Tampermonkey user script
plugin](https://www.tampermonkey.net/). It contains both site specific
scripts, as well as utilities for adding device enumeration and
selection UI to new scripts.

## Installable Scripts

- [Chaturbate Vibrate On
  Tip](https://github.com/buttplugio/buttplug-tampermonkey/raw/master/scripts/chaturbate-tips-buttplug.user.js) -
  Causes local vibrating toys to vibrate on tip notifications in Chaturbate
  chats. Toys vibrate for 0.1s per token (So 10 tokens vibrates for
  1s, 100 tokens for 10s, etc...)

## Using Buttplug UI in new scripts

This repo also contains a simple UI that can be injected into sites
using tampermonkey. To add the UI to your script, add the following
@require lines:

```
// @require https://cdn.jsdelivr.net/npm/buttplug@0.12.2/dist/web/buttplug.min.js
// @require https://raw.githubusercontent.com/buttplugio/buttplug-tampermonkey/master/utils/buttplug-tampermonkey-ui.js
```

Things to note:
- The version of buttplug may change. Check the latest version of
  buttplug-js at [the
  repo](https://github.com/buttplugio/buttplug-js). You can also use
  "buttplug@latest", but note that it may break in the future
  depending on what has been added/changed.
- It may be good to pin the version of the tampermonkey-ui file to a
  tag instead of to the master branch, to avoid breakage in the future. This
  would mean using something like

```
// @require https://raw.githubusercontent.com/buttplugio/buttplug-tampermonkey/v1/utils/buttplug-tampermonkey-ui.js
```
