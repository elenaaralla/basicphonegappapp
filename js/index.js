// The watch id variable is set as a
// reference to the current 'watchAcceleration'
var watchID = null;

// The radius for our circle object
var radius = 50;

// Device Event Listener
document.addEventListener("deviceready", onDeviceReady, false);

// debug - per provare senza ripple document.addEventListener("DOMContentLoaded", onDeviceReady, false);

var debug = new DebugLog();

function onDeviceReady() {
	
	$("#deviceInfo").html("Device info:<br />Device Cordova:"+device.cordova+"<br />Device Platform:"+device.platform+"<br />Device UUID:"+device.uuid+"<br />Device Version:"+device.version);     

	$("#startBtn").prop( "disabled", true);
	$("#stopBtn").prop( "disabled", true);

	var acceler = navigator.accelerometer || null;

	if(acceler != null)
	{
  		$("#startBtn").on("tap", startWatch );
  		$("#stopBtn").on("tap", stopWatch );	
		startWatch();
		//acceler.getCurrentAcceleration(onSuccess, onError);
	}
	else
	{
		$("#accelerometerData").html("No accelerometer!");
		console.log("No accelerometer!");
	}
}

// Watch the acceleration at regular
// intervals as set by the frequency
function startWatch() {
  // Set the frequency of updates
  // from the acceleration
  var options = { frequency: 100 };
  // Set attributes for control buttons
  $("#startBtn").prop( "disabled", true );
  $("#stopBtn").prop( "disabled", false );
  // Assign watchAcceleration to the watchID variable
  // and pass through the options array
  watchID = navigator.accelerometer.watchAcceleration(
            onSuccess, onError, options);
}

// Stop watching the acceleration
function stopWatch() {
  if (watchID) {
    navigator.accelerometer.clearWatch(watchID);
    watchID = null;
     
      $("#accelerometerData").html('No longer watching your acceleration.');
     
	// Set attributes for control buttons
	$("#startBtn").prop( "disabled", false );
	$("#stopBtn").prop( "disabled", true );
  }
}

function onSuccess(acceleration) {
   

	// Initial X Y positions
	var x = 0;
	var y = 0;

	// Velocity / Speed
	var vx = 0;
	var vy = 0;

	// Acceleration
	var accelX = 0;
	var accelY = 0;

	// Multiplier to create proper pixel measurements
	var vMultiplier = 100;

	accelX = acceleration.x;
	accelY = acceleration.y;
	   
	vy = vy + -(accelY);
	vx = vx + accelX;
	   
	y = parseInt(y + vy * vMultiplier);
	x = parseInt(x + vx * vMultiplier);

	if (x<0) { x = 0; vx = 0; }
	if (y<0) { y = 0; vy = 0; }
	if (x>document.documentElement.clientWidth-radius) {
		x = document.documentElement.clientWidth-radius; vx = 0;
	}
	if (y>document.documentElement.clientHeight-radius) {
		y = document.documentElement.clientHeight-radius; vy = 0;
	}

	$("#dot").css("top", y + "px").css("left", x + "px");

    var acclerationValue = "Acceleration X: " + acceleration.x +
		"<br />Acceleration Y: " + acceleration.y +
		"<br />Acceleration Z: " + acceleration.z +
		"<br />Timestamp: "      + acceleration.timestamp +   
		"<br />Move Top: "    + y + 
		"px <br />Move Left: "    + x + "px";

	$("#accelerometerData").html(acclerationValue);
}

function onError(error) {
    $("#accelerometerData").html('Sorry, I was unable to access the acceleration data.<br />' + error);
}

