// Example gscript template
// Title: Salt Example
// Author: ahhh
// Purpose: Drtops salt installer, executes it, sets up minion config, restarts minion. WIP.
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150

//import:salt.minion
//import:bootstrap-salt.sh

//go_import:os as os

function Deploy() {  
    console.log("Starting to drop salt.minion config");
    // Getting our asset
    var saltBin = GetAssetAsBytes("salt.minion");
    console.log("errors: "+Dump(saltBin[1]));
    var saltInstaller = GetAssetAsBytes("bootstrap-salt.sh")
    console.log("errors: "+Dump(saltInstaller[1]));
    
    // Write and Run installer
    installpath = "/tmp/install.sh";
    console.log("file name: "+ installpath);
    Ierrors = G.file.WriteFileFromBytes(installpath, saltInstaller[0]);
    console.log("Ierrors: "+Dump(Ierrors));
    var run = G.exec.ExecuteCommand("sh", [installpath, "-P"]);
    console.log("errors: "+Dump(run[1]));

    if (run[1] == "") {
        // Write our config file
        fullpath = "/etc/salt/minion";
        console.log("file name: "+ fullpath);
        errors = G.file.WriteFileFromBytes(fullpath, saltBin[0]);
        console.log("errors: "+Dump(errors));
        // restart
        var running = G.exec.ExecuteCommand("service", ["salt-minion", "restart"]);
        console.log("errors: "+Dump(running[1]));
    }

    return true
}
