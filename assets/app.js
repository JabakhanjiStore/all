(function () {
  'use strict';
  var ua = navigator.userAgent || '';
  var found = /PlayStation\s+4[\/ ](\d+)\.(\d{1,2})(?!\d)/i.exec(ua);
  var firmware = found ? String(parseInt(found[1], 10)) + '.' + (found[2].length === 1 ? '0' : '') + found[2] : null;
  var isPS4 = /PlayStation\s+4/i.test(ua);
  var preview = '13.52';
  var selected = null;
  var launching = false;
  var goldenFirmwares = ['9.00','9.03','9.04','9.50','9.51','9.60','10.00','10.01','10.50','10.70','10.71','11.00','11.02','11.50','11.52','12.00','12.02','12.50','12.52','13.00'];
  function el(id) { return document.getElementById(id); }
  function text(id, value) { el(id).textContent = value; }
  function inList(list, value) { for (var i = 0; i < list.length; i++) { if (list[i] === value) return true; } return false; }
  function inRange(fw) {
    if (typeof fw !== 'string' || !/^\d+\.\d{2}$/.test(fw)) return false;
    var parts = fw.split('.');
    var version = parseInt(parts[0], 10) * 100 + parseInt(parts[1], 10);
    return version >= 900 && version <= 1352;
  }
  function routeFor(fw) {
    var listed = ["9.00", "9.03", "9.04", "9.50", "9.51", "9.60", "10.00", "10.01", "10.50", "10.70", "10.71", "11.00", "11.02", "11.50", "11.52", "12.00", "12.02", "12.50", "12.52", "13.00", "13.02", "13.04", "13.50", "13.52"];
    if (!inRange(fw) || !inList(listed,fw)) return null;
    return {name:'GoldHEN · '+fw,status:'Files hosted by JABAKHANJI STORE',url:'host/index.html',detail:'Opens the launch files inside the JABAKHANJI STORE site. Follow the save-file instructions and review the tool result.'};
  }
  function render() {
    var fw = firmware || (!isPS4 ? preview : null);
    var outsideRange = fw && !inRange(fw);
    selected = routeFor(fw);
    el('desktop-preview').hidden = isPS4;
    text('route-title', selected ? selected.name : (outsideRange ? 'Outside supported range' : 'Firmware not listed'));
    text('route-status', selected ? selected.status : 'Launch unavailable');
    text('route-detail', selected ? selected.detail : (outsideRange ? 'This portal supports only listed firmware versions from 9.00 to 13.52. Launch will not start for this version.' : 'No launch route is configured for this firmware, even if it is within the range. Check the system version; do not choose a different one.'));
    el('launch').disabled = !isPS4 || !selected || !firmware || launching;
    text('launch-label', !isPS4 ? 'Open in a PS4 browser to launch' : (!selected ? 'Firmware not listed' : (launching ? 'Opening launch files…' : 'Launch GoldHEN')));
    text('launch-caption', selected ? 'Launch runs inside the JABAKHANJI STORE site and stays on the same origin.' : 'An incompatible launch method will not start.');
  }
  el('preview-firmware').addEventListener('change', function () { preview = this.value; render(); });
  el('launch').addEventListener('click', function () {
    if (launching || !isPS4 || !firmware) return;
    var target = routeFor(firmware);
    if (!target) return;

    launching = true;
    render();
    text('action-message','Opening launch files inside the JABAKHANJI STORE site…');
    window.location.assign(target.url);
  });
  window.addEventListener('pageshow',function () { launching = false; text('action-message',''); render(); });
  document.addEventListener('keydown', function (event) {
    var key = event.keyCode || event.which;
    if (key !== 38 && key !== 40) return;
    if (document.activeElement && /SELECT|INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    var elements = document.querySelectorAll('a[href],button:not([disabled]),select');
    var items = [], current = -1;
    for (var i=0;i<elements.length;i++) { if (elements[i].offsetWidth || elements[i].offsetHeight) items.push(elements[i]); }
    for (var j=0;j<items.length;j++) { if (items[j] === document.activeElement) current = j; }
    if (!items.length) return;
    var next = current < 0 ? 0 : (current + (key === 40 ? 1 : -1) + items.length) % items.length;
    event.preventDefault(); items[next].focus();
  });
  render();
  if (isPS4 && selected) el('launch').focus();
  var context = document.modelContext;
  if (context && typeof context.registerTool === 'function') {
    try {
      var registration = context.registerTool({
        name:'get_ps4_launch_route',title:'Read PS4 launch route',
        description:'Read the firmware route shown by the JABAKHANJI STORE portal. Does not start a jailbreak or navigate.',
        inputSchema:{type:'object',properties:{},additionalProperties:false},
        annotations:{readOnlyHint:true,untrustedContentHint:false},
        execute:function (input) {
          if (input && Object.keys(input).length) throw new Error('This read-only tool accepts no arguments.');
          return {isPS4:isPS4,detectedFirmware:firmware,previewFirmware:!isPS4?preview:null,route:selected?{name:selected.name,status:selected.status,url:selected.url}:null,launchEnabled:!el('launch').disabled};
        }
      });
      if (registration && typeof registration.catch === 'function') registration.catch(function () {});
    } catch (ignore) {}
  }
})();
