// Example gscript template
// Title: Cross Platform Tcp checking Example
// Author: ahhh
// Purpose: gets checks if some key ports are open on multiple on multiple platforms 
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150

function Deploy() {  
    console.log("Starting TCP Checker");
    var port = [21, 22, 23, 80, 443, 445, 3389, 5900, 8080]
    for (i = 0; i < port.length; i++) {
        var response = G.net.CheckForInUseTCP(port[i]);
        console.log("TCP "+port[i]+": "+response[0]);
    }
    console.log("Done TCP Checker");
    return true;
  }
  