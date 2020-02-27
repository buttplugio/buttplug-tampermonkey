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
       position: absolute;
       top: 0;
       right: 0;
       width: 100%;
       height: 100%;
       overflow: hidden;
       background: rgba(0, 0, 0, 0.8);
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
       /* background: url("buttplug.svg"); */
       background: #000;
       display: none;
     }

     #open-top-left {
       position: absolute;
       top: 0;
       left: 0;
     }

     #open-top-right {
       position: absolute;
       top: 0;
       right: 0;
     }

     #open-bottom-left {
       position: absolute;
       bottom: 0;
       left: 0;
     }

     #open-bottom-right {
       position: absolute;
       bottom: 0;
       right: 0;
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
  let body = document.querySelector('body');
  body.innerHTML += `
    <div id="open-top-left" class="open"></div>
    <div id="open-top-right" class="open"></div>
    <div id="open-bottom-left" class="open"></div>
    <div id="open-bottom-right" class="open"></div>
    <div id="buttplug-top-container">
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
      </div>
    </div>
`;

  (function () {
    // Set up Buttplug
    const buttplug_client = new Buttplug.ButtplugClient("Tutorial Client");
    const buttplug_usable_devices = [];
    const connector_div = document.getElementById("buttplug-connector");
    const enumeration_div = document.getElementById("buttplug-enumeration");
    const scanning_button = document.getElementById("buttplug-scanning");
    const connect_browser_button = document.getElementById("buttplug-connect-browser");
    const connect_intiface_button = document.getElementById("buttplug-connect-intiface");
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
          buttplug_usable_devices.push(device);
        } else {
          const index = buttplug_usable_devices.indexOf(device);
          if (index > -1) {
            await device.SendStopDeviceCmd();
            buttplug_usable_devices.splice(index, 1);
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

    /* let button = document.createElement("button");
     * button.innerHTML = "Click to vibrate"; */
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
  })();

});

