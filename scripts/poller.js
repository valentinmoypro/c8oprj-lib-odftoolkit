// Polling a sequence with interval value returned by an Ajax request
/**/
window.onload = function(){
	window.setTimeout(function(){
		var xhttp = new XMLHttpRequest();
		  xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		    	var frq = 60000;
		    	var o = JSON.parse(this.responseText);
		    	var tmpFRQ = parseInt(o.FRQ, 10);
		    	if(tmpFRQ > 10000){
		    		frq = tmpFRQ;
		    	}
		    	xhttp = null;
		    	var xhttp2 = new XMLHttpRequest();
		    	window.polTimer = window.setInterval(function(){
					xhttp2.open("GET", ".pxml?__sequence=stayinAlive", true);
					xhttp2.timeout=5000
					xhttp2.send();
				}, frq);
		    }
		  };
		  xhttp.open("GET", ".jsonp?__sequence=stayinAlive", true);
		  xhttp.send();
	}, 3000);
}
/**/