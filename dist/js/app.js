$(document).ready(function(){$(".mo-button").mousedown(function(e){var t=e.target,o=t.getBoundingClientRect(),l=t.querySelector(".ripple");$(l).remove(),l=document.createElement("span"),l.className="ripple",l.style.height=l.style.width=Math.max(o.width,o.height)+"px",t.appendChild(l);var n=e.pageY-o.top-l.offsetHeight/2-document.body.scrollTop,p=e.pageX-o.left-l.offsetWidth/2-document.body.scrollLeft;return l.style.top=n+"px",l.style.left=p+"px",!1})});