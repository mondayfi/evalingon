
window.addEventListener('load', function() {
  function applyStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    document.body.appendChild(style);
  }
  function hasCSS() {
    var test = document.createElement('div');
    test.className = 'mo-button';
    document.body.appendChild(test);
    var s = window.getComputedStyle(test);
    var result = s.position == 'absolute';
    document.body.removeChild(test);
    return result;
  }
  if (!hasCSS()) {
    var css = '.mo-button.fill::after{position:absolute;top:0;left:0;right:0;bottom:0;content:""}.mo-button.fill.active{border-radius:1000000px}.mo-button .ripple{position:absolute;border-radius:100%;background:currentColor;opacity:.2;transition:all .4s ease-out;width:0;height:0;pointer-events:none;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mo-button .ripple.held{opacity:.4}.mo-button .ripple.done{opacity:0}';
    applyStyle(css);
  }

  function startRipple(type, at) {
    var holder = at.target;
    var cl = holder.classList;
    if (!cl.contains('mo-button')) {
      return false;  // ignore
    }

    // Store the event use to generate this ripple on the holder: don't allow
    // further events of different types until we're done. Prevents double-
    // ripples from mousedown/touchstart.
    var prev = holder.getAttribute('data-event');
    if (prev && prev != type) {
      return false;
    }
    holder.setAttribute('data-event', type);

    // Create and position the ripple.
    var rect = holder.getBoundingClientRect();
    var x = at.offsetX;
    var y;
    if (x !== undefined) {
      y = at.offsetY;
    } else {
      x = at.clientX - rect.left;
      y = at.clientY - rect.top;
    }
    var ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    ripple.style.webkitTransform = ripple.style.transform;

    // Activate/add the element, forcing an animation (setTimeout).
    cl.add('active');
    holder.appendChild(ripple);
    window.setTimeout(function() {
      var max;
      if (rect.width == rect.height) {
        max = rect.width * 1.412;
      } else {
        max = Math.sqrt(rect.width * rect.width + rect.height * rect.height);
      }

      var dim = max*2 + 'px';
      var margin = -max + 'px';
      ripple.style.width = dim;
      ripple.style.height = dim;
      ripple.style.marginLeft = margin;
      ripple.style.marginTop = margin;
      ripple.classList.add('held');
    }, 20);

    var releaseEvent = (type == 'mousedown' ? 'mouseup' : 'touchend');
    var release = function(ev) {
      // TODO: We don't check for _our_ touch here. Releasing one finger
      // releases all ripples.
      document.removeEventListener(releaseEvent, release);
      ripple.classList.add('done');

      // larger than animation: duration in css
      window.setTimeout(function() {
        holder.removeChild(ripple);
        if (!holder.children.length) {
          cl.remove('active');
          holder.removeAttribute('data-event');
        }
      }, 650);
    };
    document.addEventListener(releaseEvent, release);
  }

  document.addEventListener('mousedown', function(ev) {
    if (ev.button == 0) {
      // trigger on left click only
      startRipple(ev.type, ev);
    }
  });
  document.addEventListener('touchstart', function(ev) {
    for (var i = 0; i < ev.changedTouches.length; ++i) {
      startRipple(ev.type, ev.changedTouches[i]);
    }
  });
});

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(object, eventType, callback){
  var timer;

  object.addEventListener(eventType, function(event) {
    clearTimeout(timer);
    timer = setTimeout(function(){
      callback(event);
    }, 500);
  }, false);
};

},{}],2:[function(require,module,exports){
var Util = require('./util');
var util = new Util();
var Vector2 = require('./vector2');
var Mover = require('./mover');
var debounce = require('./debounce');

var body_width  = document.body.clientWidth * 2;
var body_height = document.body.clientHeight * 2;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var fps = 60;
var last_time_render = Date.now();

var moversNum = 30;
var movers = [];

var init = function() {
  for (var i = 0; i < moversNum; i++) {
    var mover = new Mover();
    var radian = util.getRadian(util.getRandomInt(0, 360));
    var scalar = util.getRandomInt(20, 40);
    var fource = new Vector2(Math.cos(radian) * scalar, Math.sin(radian) * scalar);
    var x = util.getRandomInt(mover.radius, body_width - mover.radius);
    var y = util.getRandomInt(mover.radius, body_height - mover.radius);
    var x = body_width / 2;
    var y = body_height / 2;

    mover.radius = util.getRandomInt(body_width / 40, body_width / 20);
    mover.mass = mover.radius / 10;
    mover.position.set(x, y);
    mover.velocity.set(x, y);
    fource.divScalar(mover.mass);
    mover.applyFource(fource);
    movers[i] = mover;
  }

  setEvent();
  resizeCanvas();
  renderloop();
  debounce(window, 'resize', function(event){
    resizeCanvas();
  });
};

var updateMover = function() {
  for (var i = 0; i < movers.length; i++) {
    var mover = movers[i];
    var collision = false;

    mover.move();
    // 加速度が0になったときに再度力を加える。
    if (mover.acceleration.length() <= 1) {
      var radian = util.getRadian(util.getRandomInt(0, 360));
      var scalar = util.getRandomInt(40, 60);
      var fource = new Vector2(Math.cos(radian) * scalar, Math.sin(radian) * scalar);

      fource.divScalar(mover.mass);
      mover.applyFource(fource);
    }
    // 壁との衝突判定
    if (mover.position.y - mover.radius < 0) {
      var normal = new Vector2(0, 1);
      mover.velocity.y = mover.radius;
      collision = true;
    } else if (mover.position.y + mover.radius > body_height) {
      var normal = new Vector2(0, -1);
      mover.velocity.y = body_height - mover.radius;
      collision = true;
    } else if (mover.position.x - mover.radius < 0) {
      var normal = new Vector2(1, 0);
      mover.velocity.x = mover.radius;
      collision = true;
    } else if (mover.position.x + mover.radius > body_width) {
      var normal = new Vector2(-1, 0);
      mover.velocity.x = body_width - mover.radius;
      collision = true;
    }
    if (collision) {
      mover.rebound(normal);
    }
/*    for (var index = i + 1; index < movers.length; index++) {
      var distance = mover.velocity.distanceTo(movers[index].velocity);
      var rebound_distance = mover.radius + movers[index].radius;
      if (distance < rebound_distance) {
        var overlap = Math.abs(distance - rebound_distance);
        var normal = mover.velocity.clone().sub(movers[index].velocity).normalize();
        mover.velocity.sub(normal.clone().multScalar(overlap * -1));
        movers[index].velocity.sub(normal.clone().multScalar(overlap));
        mover.rebound(normal.clone().multScalar(-1));
        movers[index].rebound(normal.clone());
      }
    }*/
    if (mover.velocity.distanceTo(mover.position) >= 1) {
      mover.updatePosition();
    }
    mover.draw(ctx);
  }
};

var render = function() {
  ctx.clearRect(0, 0, body_width, body_height);
  updateMover();
};

var renderloop = function() {
  var now = Date.now();
  requestAnimationFrame(renderloop);
  if (now - last_time_render > 1000 / fps) {
    render();
    last_time_render = Date.now();
  }
};

var resizeCanvas = function() {
  body_width  = document.body.clientWidth * 2;
  body_height = document.body.clientHeight * 2;

  canvas.width = body_width;
  canvas.height = body_height;
  canvas.style.width = body_width / 2 + 'px';
  canvas.style.height = body_height / 2 + 'px';
};

var setEvent = function () {
  var eventTouchStart = function(x, y) {
  };

  var eventTouchMove = function(x, y) {
  };

  var eventTouchEnd = function(x, y) {
  };

  canvas.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  });

  canvas.addEventListener('selectstart', function (event) {
    event.preventDefault();
  });

  canvas.addEventListener('mousedown', function (event) {
    event.preventDefault();
    eventTouchStart(event.clientX, event.clientY);
  });

  canvas.addEventListener('mousemove', function (event) {
    event.preventDefault();
    eventTouchMove(event.clientX, event.clientY);
  });

  canvas.addEventListener('mouseup', function (event) {
    event.preventDefault();
    eventTouchEnd();
  });

  canvas.addEventListener('touchstart', function (event) {
    event.preventDefault();
    eventTouchStart(event.touches[0].clientX, event.touches[0].clientY);
  });

  canvas.addEventListener('touchmove', function (event) {
    event.preventDefault();
    eventTouchMove(event.touches[0].clientX, event.touches[0].clientY);
  });

  canvas.addEventListener('touchend', function (event) {
    event.preventDefault();
    eventTouchEnd();
  });
};

init();

},{"./debounce":1,"./mover":3,"./util":4,"./vector2":5}],3:[function(require,module,exports){
var Util = require('./util');
var util = new Util();
var Vector2 = require('./vector2');

var exports = function(){
  var Mover = function() {
    this.radius = 0;
    this.mass = 0;
    this.position = new Vector2();
    this.velocity = new Vector2();
    this.acceleration = new Vector2();
    this.direction = 0;
    this.r = util.getRandomInt(60, 120);
    this.g = util.getRandomInt(120, 180);
    this.b = util.getRandomInt(180, 220);
  };

  Mover.prototype = {
    move: function() {
      this.applyFriction();
      this.velocity.add(this.acceleration);
      if (this.velocity.distanceTo(this.position) >= 1) {
        this.direct(this.velocity);
      }
    },
    updatePosition: function() {
      this.position.copy(this.velocity);
    },
    applyFource: function(vector) {
      this.acceleration.add(vector);
    },
    applyFriction: function() {
      var friction = this.acceleration.clone();
      friction.multScalar(-1);
      friction.normalize();
      friction.multScalar(0.1);
      this.applyFource(friction);
    },
    direct: function(vector) {
      var v = vector.clone().sub(this.position);
      this.direction = Math.atan2(v.y, v.x);
    },
    rebound: function(vector) {
      var dot = this.acceleration.clone().dot(vector);
      this.acceleration.sub(vector.multScalar(2 * dot));
      this.acceleration.multScalar(0.8);
    },
    draw: function(context) {
      context.lineWidth = 8;

      context.fillStyle = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
      context.beginPath();
      context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI / 180, true);
      // context.shadowColor = '#333'
      // context.shadowOffsetX = 0;
      // context.shadowOffsetY = 0;
      // context.shadowBlur = 200;
      context.fill();

      // context.strokeStyle = '#ffffff';
      // context.beginPath();
      // context.moveTo(this.position.x, this.position.y);
      // context.lineTo(this.position.x + Math.cos(this.direction) * this.radius, this.position.y + Math.sin(this.direction) * this.radius);
      // context.stroke();
    }
  };

  return Mover;
};

module.exports = exports();

},{"./util":4,"./vector2":5}],4:[function(require,module,exports){
var exports = function(){
  var Util = function() {};

  Util.prototype.getRandomInt = function(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
  };

  Util.prototype.getDegree = function(radian) {
    return radian / Math.PI * 180;
  };

  Util.prototype.getRadian = function(degrees) {
    return degrees * Math.PI / 180;
  };

  Util.prototype.getSpherical = function(rad1, rad2, r) {
    var x = Math.cos(rad1) * Math.cos(rad2) * r;
    var z = Math.cos(rad1) * Math.sin(rad2) * r;
    var y = Math.sin(rad1) * r;
    return [x, y, z];
  };

  return Util;
};

module.exports = exports();

},{}],5:[function(require,module,exports){
//
// このVector2クラスは、three.jsのTHREE.Vector2クラスの計算式の一部を利用しています。
// https://github.com/mrdoob/three.js/blob/master/src/math/Vector2.js#L367
//

var exports = function(){
  var Vector2 = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  };

  Vector2.prototype = {
    set: function (x, y) {
      this.x = x;
      this.y = y;
      return this;
    },
    copy: function (v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    },
    add: function (v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    },
    addScalar: function (s) {
      this.x += s;
      this.y += s;
      return this;
    },
    sub: function (v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    },
    subScalar: function (s) {
      this.x -= s;
      this.y -= s;
      return this;
    },
    mult: function (v) {
      this.x *= v.x;
      this.y *= v.y;
      return this;
    },
    multScalar: function (s) {
      this.x *= s;
      this.y *= s;
      return this;
    },
    div: function (v) {
      this.x /= v.x;
      this.y /= v.y;
      return this;
    },
    divScalar: function (s) {
      this.x /= s;
      this.y /= s;
      return this;
    },
    min: function (v) {
      if ( this.x < v.x ) this.x = v.x;
      if ( this.y < v.y ) this.y = v.y;
      return this;
    },
    max: function (v) {
      if ( this.x > v.x ) this.x = v.x;
      if ( this.y > v.y ) this.y = v.y;
      return this;
    },
    clamp: function (v_min, v_max) {
      if ( this.x < v_min.x ) {
        this.x = v_min.x;
      } else if ( this.x > v_max.x ) {
        this.x = v_max.x;
      }
      if ( this.y < v_min.y ) {
        this.y = v_min.y;
      } else if ( this.y > v_max.y ) {
        this.y = v_max.y;
      }
      return this;
    },
    floor: function () {
      this.x = Math.floor( this.x );
      this.y = Math.floor( this.y );
      return this;
    },
    ceil: function () {
      this.x = Math.ceil( this.x );
      this.y = Math.ceil( this.y );
      return this;
    },
    round: function () {
      this.x = Math.round( this.x );
      this.y = Math.round( this.y );
      return this;
    },
    roundToZero: function () {
      this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
      this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
      return this;
    },
    negate: function () {
      this.x = - this.x;
      this.y = - this.y;
      return this;
    },
    dot: function (v) {
      return this.x * v.x + this.y * v.y;
    },
    lengthSq: function () {
      return this.x * this.x + this.y * this.y;
    },
    length: function () {
      return Math.sqrt(this.lengthSq());
    },
    normalize: function () {
      return this.divScalar(this.length());
    },
    distanceTo: function (v) {
      var dx = this.x - v.x;
      var dy = this.y - v.y;
      return Math.sqrt(dx * dx + dy * dy);
    },
    setLength: function (l) {
      var oldLength = this.length();
      if ( oldLength !== 0 && l !== oldLength ) {
        this.multScalar(l / oldLength);
      }
      return this;
    },
    clone: function () {
      return new Vector2(this.x, this.y);
    }
  }

  return Vector2;
};

module.exports = exports();

},{}]},{},[2])