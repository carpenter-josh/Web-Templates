
//THIS FILE DEFINES THE VR ANIMATIONS

AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
      // Fade out image.
      data.target.emit('set-image-fade');
      // Wait for fade to complete.
      setTimeout(function () {
        // Set image.
        data.target.setAttribute('material', 'src', data.src);
      }, data.dur);
    });
  },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
  }
});

/* 
window.addEventListener("vrdisplayconnect", ...) <== When you connect a display headset
window.addEventListener("vrdisplaydisconnect", ...) <== When the display is disconnected from the headset
window.addEventListener("vrdisplayactivate", ...) <== When the user has the headset on
window.addEventListener("vrdisplaydeactivate", ...) <==

navigator.getVRDisplays().then(function(displays) {
    var display = display[0];
    var name = display.displayName;
    ==> The POSE is where the headset is looking at
    var pose = display.getPose();
    var roomX = display.stageParameters.sizeX;
    var leftEye = display.getEyeParameters ("left");
    var rightEye = display.getEyeParameters ("right");
});

VR 3D EXPERIENCES
  <body>
    <a-scene>
      <a-sphere position="0 1.25" <== position="x, y, z"
      color="#EF2D5E" />
      <a-sky color="ECECEC" />
    </a-scene>
  </body>

*/