// Example gscript template
// Title: Enable RDP
// Author: ahhh
// Purpose: Enable RDP
// Gscript version: 1.0.0
// ATT&CK: 

//priority:98
//timeout:150

//go_import:github.com/ahhh/winsvc as winsvc

function Deploy() {
    console.log("Starting Enable RDP");

	  winsvc.StartService("TermService")

    console.log("Done Enable RDP");
    return true;
}
  
