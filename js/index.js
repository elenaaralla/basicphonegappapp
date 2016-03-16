// Device Event Listener
document.addEventListener("deviceready", onDeviceReady, false);

// debug - per provare senza ripple document.addEventListener("DOMContentLoaded", onDeviceReady, false);

var debug = new DebugLog();

function onDeviceReady() {

    console.log("Device ready!");
	$("#deviceInfo").html("Device Name: "+device.name+"<br />Device Cordova:"+device.cordova+"<br />Device Platform:"+device.platform+"<br />Device UUID:"+device.uuid+"<br />Device Version:"+device.version);     

	var acceler = navigator.accelerometer || null;

	if(acceler)
	{
		acceler.getCurrentAcceleration(onSuccess, onError);
	}
	else
	{
		console.log("accelerometer");
	}
}

function onSuccess(acceleration) {
    alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
}

function onError() {
    alert('onError!');
}

