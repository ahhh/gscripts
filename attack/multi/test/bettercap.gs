// Example gscript template
// Title: Cross Platform Besttercap tests
// Author: ahhh
// Purpose: 
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150

//go_import:net as net
//go_import:github.com/bettercap/bettercap/network as bcap

function Deploy() {  
    var ifaces = net.Interfaces()
    console.log(ifaces);
    console.log(ifaces[0][0].Name);
    for (var i=0; i < ifaces[0].length; i++) {        
        console.log(ifaces[0][i].Name);
        var arpTable = bcap.ArpUpdate(ifaces[0][i].Name);
        console.log(Dump(arpTable));
    }
    return true;
}