// Example gscript template
// Title: Sandbox_Hostname
// Author: ahhh
// Purpose: Gets the computers hostname, converts it to caps, then checks against a list of well known sandbox hostnames
// Gscript version: 1.0.0
// 
//go_import:os as os2

//priority:30
//timeout:75

function Deploy() {  
    console.log("Testing Sandbox Hostname!");
    var hostnam = os2.Hostname();
    var hostnamez = hostnam[0].toUpperCase();
    console.log("Our hostname is: "+ hostnamez);
    if (hostnamez == "TEQUILABOOMBOOM" || hostnamez == "SANDBOX" || hostnamez == "VIRUS" || hostnamez == "MALWARE" || hostnamez == "MALTEST" || hostnamez == "PC" || hostnamez == "PSPUBWS-PC") 
    {
        console.log("Sandbox detected, exiting");
        G.os.TerminateSelf();
        return false;
    }
    console.log("Done Testing Hostname!");
    return true; 
  }
  
