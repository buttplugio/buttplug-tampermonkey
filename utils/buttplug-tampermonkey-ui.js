window.addEventListener("load", function (e) {
  let style = document.createElement("style");
  style.innerHTML = `
     #buttplug-top-container h3, li {
       font-family:Arial;
	     font-size:15px;
     }
     #buttplug-top-container ul {
       list-style-type: none;
       column-count: 2;
     }
     .buttplug-button {
	     box-shadow:inset 0px 1px 3px 0px #91b8b3;
	     background:linear-gradient(to bottom, #768d87 5%, #6c7c7c 100%);
	     background-color:#768d87;
	     border-radius:5px;
	     border:1px solid #566963;
	     display:inline-block;
	     cursor:pointer;
	     color:#ffffff;
	     font-family:Arial;
	     font-size:15px;
	     font-weight:bold;
	     padding:11px 23px;
	     text-decoration:none;
	     text-shadow:0px -1px 0px #2b665e;
       margin: 5px;
     }
     .buttplug-button:hover {
	     background:linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%);
	     background-color:#6c7c7c;
     }
     .buttplug-button:active {
	     position:relative;
	     top:1px;
     }

     #buttplug-top-container {
       position: fixed;
       top: 0;
       right: 0;
       width: 100%;
       height: 100%;
       overflow: hidden;
       background: rgba(0, 0, 0, 0.8);
       display: none;
     }

     #buttplug-dialog {
       width: 50%;
       min-height: 200px;
       position: absolute;
       top: 0;
       left: 0;
       left: 0;
       right: 0;
       margin: auto;
       background: #888888;
       cursor: move;
       border-radius: 3px;
     }

     .close {
       background: #000;
       cursor: pointer;
       width: 10px;
       height: 10px;
       border-radius: 2px;
     }

     #close-top-left {
       position: absolute;
       top: 0;
       left: 0;
     }

     #close-top-right {
       position: absolute;
       top: ;
       right: 0;
     }

     #close-bottom-left {
       position: absolute;
       bottom: 0;
       left: 0;
     }

     #close-bottom-right {
       position: absolute;
       bottom: 0;
       right: 0;
     }

     body {
       width: 100%;
       height: 100%;
     }

     .open {
       width: 50px;
       height: 50px;
       background-image: url("data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 290.56 293.08'%3E%3Cdefs%3E%3Cstyle%3E.cls-1,.cls-3%7Bfill:none;%7D.cls-1%7Bstroke:%23fff;stroke-miterlimit:10;%7D.cls-2%7Bfill:%23fff;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3Ebuttplug-logo-1%3C/title%3E%3Crect x='0.5' y='0.5' width='289.56' height='292.08' rx='32' ry='32'/%3E%3Crect class='cls-1' x='0.5' y='0.5' width='289.56' height='292.08' rx='32' ry='32'/%3E%3Crect class='cls-2' x='10.63' y='10.72' width='269.29' height='271.63' rx='25' ry='25'/%3E%3Crect class='cls-1' x='10.63' y='10.72' width='269.29' height='271.63' rx='25' ry='25'/%3E%3Crect x='17.37' y='17.51' width='255.83' height='258.05' rx='20' ry='20'/%3E%3Crect class='cls-1' x='17.37' y='17.51' width='255.83' height='258.05' rx='20' ry='20'/%3E%3Cline class='cls-3' x1='156.1' y1='152.66' x2='142.44' y2='162.32'/%3E%3Cpath class='cls-2' d='M325.32,383.36a3.07,3.07,0,0,1-1.71-5.64,107.76,107.76,0,0,1,14.2-9.47l2.32-1.36c2.57-1.54,5.24-3,7.83-4.36a95,95,0,0,0,13.73-8.38c1.9-1.49,2.33-6.94,2.59-10.2v-.12c.86-10.76,1-22.09-7.83-32-9.93-11.24-8.63-25.63-6.06-38.22,3-14.72,5.94-29.72,8.78-44.22,3.34-17.09,6.8-34.76,10.41-52.11,1.82-8.76,6.31-14.55,12.3-15.88a20.85,20.85,0,0,1,6.58,0c6,1.33,10.48,7.12,12.3,15.88,3.61,17.35,7.07,35,10.41,52.12,2.83,14.5,5.77,29.49,8.78,44.21,2.58,12.59,3.87,27-6.06,38.22-8.79,10-8.69,21.29-7.83,32v.12c.26,3.26.69,8.71,2.6,10.2a95.08,95.08,0,0,0,13.73,8.38c2.58,1.39,5.26,2.82,7.83,4.36l2.32,1.36a108,108,0,0,1,14.2,9.47,3.07,3.07,0,0,1-1.81,5.64H325.32Zm2.69-4H442.34a109.85,109.85,0,0,0-11.81-7.65l-2.37-1.39c-2.48-1.49-5.11-2.9-7.66-4.26a98.21,98.21,0,0,1-14.31-8.76c-3.28-2.57-3.75-8.37-4.12-13v-.12c-.93-11.61-1-23.88,8.83-35,8.74-9.9,7.63-22.56,5.14-34.77-3-14.73-5.95-29.74-8.79-44.25-3.34-17.08-6.79-34.75-10.4-52.07-1.49-7.15-4.86-11.81-9.25-12.79a9.39,9.39,0,0,0-2.27-.17H385a9.32,9.32,0,0,0-2.27.17c-4.39,1-7.76,5.64-9.25,12.79-3.61,17.32-7.06,35-10.4,52.06-2.84,14.51-5.77,29.52-8.79,44.25-2.5,12.21-3.61,24.87,5.14,34.77,9.83,11.13,9.75,23.4,8.82,35v.12c-.37,4.66-.83,10.46-4.12,13a98.14,98.14,0,0,1-14.31,8.76c-2.54,1.36-5.17,2.77-7.66,4.26l-2.37,1.39A109.88,109.88,0,0,0,328,379.35Z' transform='translate(-239.9 -125.68)'/%3E%3C/svg%3E%0A");
       display: none;
       z-index:999;
     }

     #open-top-left {
       position: fixed;
       top: 0;
       left: 0;
     }

     #open-top-right {
       position: fixed;
       top: 0;
       right: 0;
     }

     #open-bottom-left {
       position: fixed;
       bottom: 0;
       left: 0;
     }

     #open-bottom-right {
       position: fixed;
       bottom: 0;
       right: 0;
       display: block;
     }

     #buttplug-container {
       margin: 10px;
       display: flex;
     }

     #buttplug-connector {
       display: block;
     }

     #buttplug-enumeration {
       display: none;
     }
     /* .squaredFour */
     /* Taken from https://codepen.io/bbodine1/pen/novBm */
     .squaredFour {
       width: 20px;
       position: relative;
       margin: 20px auto;
     }
     .squaredFour label {
       width: 20px;
       height: 20px;
       cursor: pointer;
       position: absolute;
       top: 0;
       left: 0;
       background: #fcfff4;
       background: -webkit-gradient(linear, left top, left bottom, from(#fcfff4), color-stop(40%, #dfe5d7), to(#b3bead));
       background: linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
       border-radius: 4px;
       box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0, 0, 0, 0.5);
     }
     .squaredFour label:after {
       content: '';
       width: 9px;
       height: 5px;
       position: absolute;
       top: 4px;
       left: 4px;
       border: 3px solid #333;
       border-top: none;
       border-right: none;
       background: transparent;
       opacity: 0;
       -webkit-transform: rotate(-45deg);
       transform: rotate(-45deg);
     }
     .squaredFour label:hover::after {
       opacity: 0.5;
     }
     .squaredFour input[type=checkbox] {
       visibility: hidden;
     }
     .squaredFour input[type=checkbox]:checked + label:after {
       opacity: 1;
     }
`;
  // Manipulating body innerHTML to get this block inserted does VERY BAD THINGS
  // to a lot of websites, so we just append elements.
  const body = document.querySelector('body');
  body.appendChild(style);
  for (const vert of ["top", "bottom"]) {
    for (const horz of ["left", "right"]) {
      let open_element = document.createElement('div');
      open_element.id = `open-${vert}-${horz}`;
      open_element.classList.add("open");
      body.appendChild(open_element);
    }
  }
  let container_div = document.createElement('div');
  container_div.innerHTML = `
  <div id="buttplug-dialog">
        <div id="close-top-left" class="close"></div>
        <div id="close-top-right" class="close"></div>
        <div id="close-bottom-left" class="close"></div>
        <div id="close-bottom-right" class="close"></div>
        <div id="buttplug-container">
          <div id="buttplug-connector">
            <a href="#" class="buttplug-button" id="buttplug-connect-browser">Connect in Browser</a>
            <br/>
            <a href="#" class="buttplug-button" id="buttplug-connect-intiface">Connect to Intiface Desktop</a>
            <br/>
          </div>
          <div id="buttplug-enumeration">
            <a href="#" class="buttplug-button" id="buttplug-scanning">Start Scanning</a>
            <a href="#" class="buttplug-button" id="buttplug-disconnect">Disconnect</a>
            <br/>
            <h3>Devices</h3>
            <ul id="buttplug-device-list">
              <li>
              </li>
            </ul>
          </div>
        </div>
      </div>`;
  container_div.id = "buttplug-top-container";
  body.appendChild(container_div);

  // We need the buttplug_devices to be global, so that tampermonkey user
  // scripts can work with it. Hang it off window.
  window.buttplug_devices = [];

  setTimeout(() =>
             (function () {
               // Set up Buttplug
               const buttplug_client = new Buttplug.ButtplugClient("Tutorial Client");
               const connector_div = document.getElementById("buttplug-connector");
               const enumeration_div = document.getElementById("buttplug-enumeration");
               const scanning_button = document.getElementById("buttplug-scanning");
               const connect_browser_button = document.getElementById("buttplug-connect-browser");
               const connect_intiface_button = document.getElementById("buttplug-connect-intiface");
               const disconnect_button = document.getElementById("buttplug-disconnect");
               const device_list = document.getElementById("buttplug-device-list");
               buttplug_client.addListener('deviceadded', async (device) => {
                 const element_id = `buttplug-device-${device.Index}`;
                 const input = document.createElement("li");
                 input.id = element_id;
                 const checkbox = document.createElement("input");
                 const checkbox_id = `${element_id}-checkbox`
                 checkbox.type = "checkbox";
                 checkbox.id = checkbox_id;
                 checkbox.addEventListener("change", async (event) => {
                   if (checkbox.checked) {
                     window.buttplug_devices.push(device);
                   } else {
                     const index = window.buttplug_devices.indexOf(device);
                     if (index > -1) {
                       await device.SendStopDeviceCmd();
                       window.buttplug_devices.splice(index, 1);
                     }
                   }
                 });
                 let label = document.createElement("label");
                 label.for = `${element_id}-checkbox`;
                 label.innerHTML = device.Name;
                 input.appendChild(checkbox);
                 input.appendChild(label);
                 device_list.appendChild(input);
               });

               buttplug_client.addListener('deviceremoved', async (device) => {
                 const element_id = `buttplug-device-${device.Index}`;
                 var element = document.getElementById(element_id);
                 element.parentNode.removeChild(element);
               });

               connect_browser_button.addEventListener("click", async (event) => {
                 const connector = new Buttplug.ButtplugEmbeddedClientConnector();
                 await buttplug_client.Connect(connector);
                 connector_div.style.display = "none";
                 enumeration_div.style.display = "block";
               }, false);

               connect_intiface_button.addEventListener("click", async (event) => {
                 const connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://localhost:12345/");
                 await buttplug_client.Connect(connector);
                 connector_div.style.display = "none";
                 enumeration_div.style.display = "block";
               }, false);

               disconnect_button.addEventListener("click", async (event) => {
                 await buttplug_client.Disconnect();
                 enumeration_div.style.display = "none";
                 connector_div.style.display = "block";
               }, false);

               scanning_button.addEventListener('click', async () => {
                 await buttplug_client.StartScanning();
               });

               let container = document.querySelector("#buttplug-top-container");
               let dragItem = document.querySelector("#buttplug-dialog");

               for (const vert of ["top", "bottom"]) {
                 for (const horz of ["left", "right"] ) {
                   let close = document.getElementById(`close-${vert}-${horz}`);
                   let open = document.getElementById(`open-${vert}-${horz}`);
                   close.addEventListener("click", () => {
                     container.style.display = "none";
                     open.style.display = "block";
                   }, false);

                   open.addEventListener("dblclick", () => {
                     open.style.display = "none";
                     container.style.display = "block";
                   }, false);
                 }
               }

               let active = false;
               let currentX;
               let currentY;
               let initialX;
               let initialY;
               let xOffset = 0;
               let yOffset = 0;

               container.addEventListener("touchstart", dragStart, false);
               container.addEventListener("touchend", dragEnd, false);
               container.addEventListener("touchmove", drag, false);

               container.addEventListener("mousedown", dragStart, false);
               container.addEventListener("mouseup", dragEnd, false);
               container.addEventListener("mousemove", drag, false);

               function dragStart(e) {
                 if (e.type === "touchstart") {
                   initialX = e.touches[0].clientX - xOffset;
                   initialY = e.touches[0].clientY - yOffset;
                 } else {
                   initialX = e.clientX - xOffset;
                   initialY = e.clientY - yOffset;
                 }

                 if (e.target === dragItem) {
                   active = true;
                 }
               }

               function dragEnd(e) {
                 initialX = currentX;
                 initialY = currentY;

                 active = false;
               }

               function drag(e) {
                 if (active) {
                   e.preventDefault();
                   if (e.type === "touchmove") {
                     currentX = e.touches[0].clientX - initialX;
                     currentY = e.touches[0].clientY - initialY;
                   } else {
                     currentX = e.clientX - initialX;
                     currentY = e.clientY - initialY;
                   }

                   xOffset = currentX;
                   yOffset = currentY;

                   setTranslate(currentX, currentY, dragItem);
                 }
               }

               function setTranslate(xPos, yPos, el) {
                 el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
               }
             })(), 0);

}, false);
