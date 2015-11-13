// Device Event Listener
document.addEventListener("deviceready", onDeviceReady, false);

// debug - per provare senza ripple document.addEventListener("DOMContentLoaded", onDeviceReady, false);

var debug = new DebugLog();

function onDeviceReady() {

	$("#result").append("Start filetransfer");

	apiURL = "http://192.168.0.10/asxmob/api/attachments/0/test";

    uri = encodeURI(apiURL);   
    fileName = "VOLANTINO 2015 pdf.pdf";
    fileURL = "cdvfile://localhost/persistent/" + fileName;

    try
    {
		var fileTransfer = new FileTransfer();

    	alert("FileTransfer exists!!");
    	$("#result").append("<br>FileTransfer exists!!");
    	debug.log("ERROR","OK - FileTransfer exists!!");

    	fileTransfer.download(uri, fileURL,
        function (entry) {
            alert("download complete! ")
            $("#result").append("<br>download complete!");
            debug.log("ERROR","download complete: " + entry.toURL());
        },
        function (error) {
            alert("errore");
            $("#result").append("<br>errore:" + error);
            debug.log("ERROR",error);
        });
    }
    catch(err) 
    {
        debug.log("ERROR","No device detected; it's a browser test; chatch error=" + err);
         $("#result").append("<br>No device detected; it's a browser test; chatch error=" + err);
        document.location.href =  apiURL;
    }
}
