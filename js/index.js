// Device Event Listener
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log("Device ready!");
	$("#deviceInfo").html("Device Name: "+device.name+"<br />Device Cordova:"+device.cordova+"<br />Device Platform:"+device.platform+"<br />Device UUID:"+device.uuid+"<br />Device Version:"+device.version);     
}