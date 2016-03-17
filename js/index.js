// The watch id variable is set as a
// reference to the current 'watchAcceleration'
var watchID = null;

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
  var options = { frequency: 3000 };
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
    var acclerationValue = "Acceleration X: " + acceleration.x +
          "<br />Acceleration Y: " + acceleration.y +
          "<br />Acceleration Z: " + acceleration.z +
          "<br />Timestamp: "      + acceleration.timestamp;

	$("#accelerometerData").html(acclerationValue);
}

function onError(error) {
    $("#accelerometerData").html('Sorry, I was unable to access the acceleration data.<br />' + error);
}

