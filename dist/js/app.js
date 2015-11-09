
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



function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime){
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.counter__days');
  var hoursSpan = clock.querySelector('.counter__hours');
  var minutesSpan = clock.querySelector('.counter__minutes');
  var secondsSpan = clock.querySelector('.counter__seconds');

  function updateClock(){
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if(t.total<=0){
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock,1000);
}

var deadline = 'Marsch 16 2016 07:00:50 UTC+0200';
initializeClock('counter', deadline);