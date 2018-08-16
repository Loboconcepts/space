# space

var rows = speeches.filter(ifTermExists);
		function ifTermExists(row) {
		  	return row.term == ui.toLowerCase().replace(/\?|\!|\./g,'');
		}
		
		if (rows[0]) {
			if (rows[0].act) {
				rows[0].act();
			}
			if (rows[0].functions && !weCruisin) {
				if (rows[0].functions[0]) {
					if (rows[0].functions[0].param3) {
						rows[0].functions[0].cb(rows[0].functions[0].param1,rows[0].functions[0].param2,rows[0].functions[0].param3);
					}
					else if (rows[0].functions[0].param2) {
						rows[0].functions[0].cb(rows[0].functions[0].param1,rows[0].functions[0].param2);
					}
					else if (rows[0].functions[0].param1) {
						rows[0].functions[0].cb(rows[0].functions[0].param1);
					}
					else {
						rows[0].functions[0].cb();	
					}
				}
				if (rows[0].functions[1]) {
					if (rows[0].functions[1].param2) {
						rows[0].functions[1].cb(rows[0].functions[1].param1,rows[0].functions[1].param2);
					}
					else if (rows[0].functions[1].param1) {
						rows[0].functions[1].cb(rows[0].functions[1].param1);
					}
					else {
						rows[0].functions[1].cb();	
					}
				}
			}
		return setTimeout(function(){ document.getElementById("shipConsole").innerHTML += rows[0].response + "<br>"; document.getElementById("shipConsole").scrollTop = document.getElementById("shipConsole").scrollHeight;}, 700);
		
		}

		else if (ui == "") {return}
		else {return setTimeout(function(){ document.getElementById("shipConsole").innerHTML += "Does not compute<br>"; document.getElementById("shipConsole").scrollTop = document.getElementById("shipConsole").scrollHeight;}, 700);};
	}

	var speeches = [
		{term:"yl",functions:[{cb:move,param1:movArrArr[0]},{cb:shipRotation,param1:'YAW',param2:-1}],response:"Yawing Left"},
		{term:"yaw left",functions:[{cb:move,param1:movArrArr[0]},{cb:shipRotation,param1:'YAW',param2:-1}],response:"Yawing Left"},
		{term:"yr",functions:[{cb:move,param1:movArrArr[1]},{cb:shipRotation,param1:'YAW',param2:1}],response:"Yawing Right"},
		{term:"yaw right",functions:[{cb:move,param1:movArrArr[1]},{cb:shipRotation,param1:'YAW',param2:1}],response:"Yawing Right"},
		{term:"pitch up",functions:[{cb:move,param1:movArrArr[2]},{cb:shipRotation,param1:'PITCH',param2:1}],response:"Pitching Up"},
		{term:"pu",functions:[{cb:move,param1:movArrArr[2]},{cb:shipRotation,param1:'PITCH',param2:1}],response:"Pitching Up"},
		{term:"pitch down",functions:[{cb:move,param1:movArrArr[3]},{cb:shipRotation,param1:'PITCH',param2:-1}],response:"Pitching Down"},
		{term:"pd",functions:[{cb:move,param1:movArrArr[3]},{cb:shipRotation,param1:'PITCH',param2:-1}],response:"Pitching Down"},
		{term:"roll left",functions:[{cb:rotateShape,param1:1,param2:'ROLL',param3:-1}],response:"Rolling Left"},
		{term:"rl",functions:[{cb:rotateShape,param1:1,param2:'ROLL',param3:-1}],response:"Rolling Left"},
		{term:"roll right",functions:[{cb:rotateShape,param1:-1,param2:'ROLL',param3:1}],response:"Rolling Right"},
		{term:"rr",functions:[{cb:rotateShape,param1:-1,param2:'ROLL',param3:1}],response:"Rolling Right"},
		{term:"accelerate",functions:[{cb:accelerate}],response:"Accelerating"},
		{term:"hi",response:"Hello"},
		{term:"hello",response:"Hello"},
		{term:"yo",response:"Hello"},
		{term:"help",response:"nav commands: accelerate, yaw left, yaw right, pitch up, pitch down, roll left, roll right, cruise control on, cruise control off, stop"},
		{term:"where am i",response:"We are currently at galacube " + currentLocation},
		{term:"where are we",response:"We are currently at galacube " + currentLocation},
		{term:"cruise control on",response:"Cruise control is enabled",act: function() {cruiseControl=true;}},
		{term:"cruise control off",response:"Cruise control is disabled",act: function() {cruiseControl=false;}},
		{term:"stop",response:"Cruise control is disabled",act: function() {cruiseControl=false;}}
	];