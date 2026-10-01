
(function () {
 var msg=document.getElementById('msgs');
 if (!firmwareGroup) { msg.textContent='This firmware is not listed. Open the page from a PS4 with a supported version.'; return; }
 if (['13.02','13.04','13.50','13.52'].indexOf(firmware)!==-1) { location.replace('ps4-13/index.html'); return; }
 var ac=window.applicationCache;
 var onlineMode=/(?:\?|&)online=1(?:&|$)/.test(location.search);
 if (!onlineMode && (!ac || ac.status === 0 || ac.status === 5)) {
   location.replace('cache-'+firmwareGroup+'.html'); return;
 }
 msg.textContent='Loading GoldHEN · '+firmware;
 document.getElementById('hint').textContent='Wait for the tool result. This message remaining on screen does not mean activation succeeded.';
 var s=document.createElement('script');
 s.onerror=function(){msg.textContent='Unable to load the launch files. Reopen the page with an internet connection.';};
 if(firmwareGroup==='900'){s.type='module';s.src='900/alert.js';}
 else if(firmwareGroup==='css'){
   try {localStorage.setItem('exploitChain','lapse');}catch(e){}
   s.src='css/main.js';s.onload=function(){setTimeout(function(){doJb();},500);};
 } else {
   s.type='module';
   var n=parseInt(firmware.split('.')[0],10)*100+parseInt(firmware.split('.')[1],10);
   s.src=n<=1202?'slopkit/chain_lapse.js':(n<=1300?'slopkit/chain_poops.js':'slopkit/jb.js?v=10');
 }
 document.head.appendChild(s);
})();
