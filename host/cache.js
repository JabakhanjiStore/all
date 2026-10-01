
(function(){
 var msg=document.getElementById('msgs'), hint=document.getElementById('hint'), button=document.getElementById('continue');
 if(!firmwareGroup){msg.textContent='This firmware is not listed.';return;}
 var expected=document.documentElement.getAttribute('data-group');
 if(firmwareGroup!==expected){location.replace('cache-'+firmwareGroup+'.html');return;}
 var ac=window.applicationCache;
 function ready(){msg.textContent='Launch files cached';hint.textContent='Press Continue to launch. Save the JABAKHANJI STORE site address for next time.';button.hidden=false;button.focus();}
 function failed(){msg.textContent='Offline caching did not complete';hint.textContent='You can continue with an internet connection, or reload the page and try again.';button.href='index.html?online=1';button.hidden=false;}
 if(!ac){failed();return;}
 msg.textContent='Caching launch files…';
 ac.addEventListener('progress',function(e){if(e.total)msg.textContent='Caching files: '+Math.round(e.loaded/e.total*100)+'%';},false);
 ac.addEventListener('cached',ready,false);
 ac.addEventListener('noupdate',ready,false);
 ac.addEventListener('updateready',function(){try{ac.swapCache();}catch(e){}ready();},false);
 ac.addEventListener('error',failed,false);
 ac.addEventListener('obsolete',failed,false);
 if(ac.status===1)ready();
 if(ac.status===4){try{ac.swapCache();}catch(e){}ready();}
})();
