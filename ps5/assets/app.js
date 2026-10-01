(function(){'use strict';
var supported=["9.00", "9.05", "9.20", "9.40", "9.60", "10.00", "10.01", "10.20", "10.40", "10.60", "11.00", "11.20", "11.40", "11.60", "12.00"], ua=navigator.userAgent||'', match=/PlayStation 5\/(\d+\.\d{2})(?!\d)/.exec(ua), firmware=match?match[1]:null;
var relapse=["12.02", "12.20", "12.40", "12.60", "12.70", "13.00", "13.20", "13.40", "13.42", "13.60"]; supported=supported.concat(relapse);
var select=document.getElementById('preview-firmware'), button=document.getElementById('launch');
function show(v){var ok=supported.indexOf(v)!==-1;
document.getElementById('route-title').textContent='PS5 Exploit · '+(v||'Unknown firmware');
document.getElementById('route-status').textContent=ok?'Files hosted by JABAKHANJI STORE':'Currently unavailable';
document.getElementById('route-detail').textContent=ok?(relapse.indexOf(v)!==-1?'Relapse — local files. After a successful launch, follow the visible R2 instructions to load the tools.':'Local PS5 files. Follow the instructions shown after launch.'):'This firmware is not supported by the current files. Launch will not start.';
button.disabled=!(firmware&&ok);
document.getElementById('launch-label').textContent=firmware?(ok?'Launch PS5 exploit':'Unavailable for this firmware'):'Open in a PS5 browser to launch';}
if(!firmware){document.getElementById('desktop-preview').hidden=false;show(select.value);select.onchange=function(){show(select.value);};}else{show(firmware);}
button.onclick=function(){if(firmware&&supported.indexOf(firmware)!==-1){window.location.href=(relapse.indexOf(firmware)!==-1?'relapse/index.html':'host/index.html');}};
})();
