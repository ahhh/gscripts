// Example gscript template
// Title: Cross Platform UDP checking Example
// Author: ahhh
// Purpose: gets checks if some key ports are open on multiple on multiple platforms 
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150

function Deploy() {  
    console.log("Starting UDP Checker");
    var port = [53, 67, 68, 69, 123, 161, 162, 389, 636]
    for (i = 0; i < port.length; i++) {
        var response = G.CheckForInUseUDP(port[i]);
        console.log("UDP "+port[i]+": "+response[0]);
    }
    console.log("Done UDP Checker");
    return true;
  }
  