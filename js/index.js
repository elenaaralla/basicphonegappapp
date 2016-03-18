// The watch id variable is set as a
// reference to the current 'watchAcceleration'
var watchID = null;

// The radius for our circle object
var radius = 50;

var accelerometerHeader = "";
var geolocationHeader = "";

// Device Event Listener
document.addEventListener("deviceready", onDeviceReady, false);

// debug - per provare senza ripple document.addEventListener("DOMContentLoaded", onDeviceReady, false);

var debug = new DebugLog();

function onDeviceReady() {
	
	$("#deviceInfo").html("<strong>Device info</strong>:<br />Cordova:" + 
	device.cordova+"<br />Platform:"+device.platform+"<br />UUID:"+device.uuid+
	"<br />Version:"+device.version);     

	$("#startBtn").prop( "disabled", true);
	$("#stopBtn").prop( "disabled", true);

	var acceler = navigator.accelerometer || null;

	accelerometerHeader = "<br /><br /><strong>Accelerometer</strong>:";

	if(acceler != null)
	{
  		$("#startBtn").on("tap", startWatch );
  		$("#stopBtn").on("tap", stopWatch );	
  		$("#startBtn").show();
  		$("#stopBtn").show();
		startWatch();
		//acceler.getCurrentAcceleration(onSuccess, onError);
	}
	else
	{
  		$("#startBtn").hide();
  		$("#stopBtn").hide();		
		$("#accelerometerData").html(accelerometerHeader + "<br />No accelerometer!");
		console.log("No accelerometer!");
	}

	var geoloc = navigator.geolocation || null;

	geolocationHeader = "<br /><br /><strong>Geolocation</strong>:";

	if(geoloc != null)
	{
		geoloc.getCurrentPosition(onSuccessGeo, onErrorGeo);
	}
	else
	{
		$("#geolocationData").html(geolocationHeader+ "<br />No geolocation!");
		console.log("No geolocation!");
	}

	getAllContacts();
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
     
      $("#accelerometerData").html(accelerometerHeader+'<br />No longer watching your acceleration.');
     
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

    var acclerationValue = "<br />Acceleration X: " + acceleration.x +
		"<br />Acceleration Y: " + acceleration.y +
		"<br />Acceleration Z: " + acceleration.z +
		"<br />Timestamp: "      + acceleration.timestamp +   
		"<br />Move Top: "    + y + 
		"px <br />Move Left: "    + x + "px";

	$("#accelerometerData").html(accelerometerHeader+acclerationValue);
}

function onError(error) {
    $("#accelerometerData").html(accelerometerHeader+'<br />Sorry, I was unable to access the acceleration data.<br />' + error);
}

// Run after successful transaction
// Let's display the position data
function onSuccessGeo(position) {
  $("#geolocationData").html(geolocationHeader + "<br />Latitude: "  + position.coords.latitude +
      "<br />Longitude: " + position.coords.longitude + 
      "<br />Altitude: "  + position.coords.altitude + 
      "<br />Accuracy: "  + position.coords.accuracy +
      "<br />Altitude Accuracy: " + position.coords.altitudeAccuracy  +
      "<br />Heading: " + position.coords.heading  +
      "<br />Speed: "   + position.coords.speed  +
      "<br />Timestamp: " + position.timestamp);
}


// Run if we face an error
// obtaining the position data
function onErrorGeo(error) {
       
  var errString = "";
       
  // Check to see if we have received an error code  
  if(error.code) {
    // If we have, handle it by case
    switch(error.code)
    {
      case 1: // PERMISSION_DENIED
      errString =
          'Unable to obtain the location information ' +
          'because the device does not have permission '+
          'to the use that service.';
      break;
      case 2: // POSITION_UNAVAILABLE
        errString =
          'Unable to obtain the location information ' +
          'because the device location could not ' +
          'be determined.';
      break;
      case 3: // TIMEOUT
        errString =
          'Unable to obtain the location within the ' +
          'specified time allocation.';
      break;
      default: // UNKOWN_ERROR
        errString =
          'Unable to obtain the location of the ' +
          'device due to an unknown error.';
      break;
    }
       
  }
       
  // Handle any errors we may face
  $("#geolocationData").html(geolocationHeader + "<br />" + errString);
}


function getAllContacts() {
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;
	var fields = ["name", "phoneNumbers", "birthday", "emails"];
	if(navigator.contacts)
	{
		alert("ok");
		$("#contacts").show();
		navigator.contacts.find(fields, onAllSuccess, onErrorContact, options);
	}
	else
	{
		$("#contacts").hide();
		console.log("No contacts");
		alert("No contacts");
	}
}


var arrContactDetails = new Array();

function onAllSuccess(contacts) {
	if(contacts.length) {
		alert("contacts.length: " + contacts.length);
		for(var i=0; i<contacts.length; ++i){
			if(contacts[i].name){
				arrContactDetails.push(contacts[i]);
			}
		}
	
		arrContactDetails.sort(alphabeticalSort);
	// more code to go here
	} else {
		$('#contactList').append('<li><h3>Sorry, no contacts were found</h3></li>');
	} 
	
	$('#contactList').listview("refresh");
}

function alphabeticalSort(a, b) {
	if (a.name.formatted < b.name.formatted){
		return -1;
	}else if (a.name.formatted > b.name.formatted){
		return  1;
	}else{
		return 0;
	}
}    

var alphaHeader = "";

if(arrContactDetails.length > 0)
{
	alert("arrContactDetails.length:" + arrContactDetails.length);
	arrContactDetails[0].name.formatted[0];
}

for(var i=0; i<arrContactDetails.length; ++i) {
	var contactObject = arrContactDetails[i];
	
	if( alphaHeader != contactObject.name.formatted[0] ) {
		alphaHeader = contactObject.name.formatted[0];
		$('#contactList').append('<li data-role="list-divider">'+ alphaHeader + '</li>');
		$('#contactList').append('<li class="contact_list_item" id="' + contactObject.id + '"><a href="#contact-info">' + contactObject.name.formatted + ' (' +contactObject.id + ')</a></li>');
	} else {
		if( i == 0 ) {
			$('#contactList').append('<li data-role="list-divider">'+ alphaHeader + '</li>');
		}
		
		$('#contactList').append('<li class="contact_list_item" id="'+ contactObject.id + '"><a href="#contact-info">' + contactObject.name.formatted + ' (' + contactObject.id + ')</a></li>');
	}              
}

function onErrorContact(error) {
	alert('An error has occurred: ' + error.code);
}