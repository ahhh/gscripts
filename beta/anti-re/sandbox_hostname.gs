// Example gscript template
// Title: Sandbox_Hostname
// Author: ahhh
// Purpose: Gets the computers hostname, converts it to caps, then checks against a list of well known sandbox hostnames
// Gscript version: 0.1.2
// 

//priority:30
//timeout:75

function BeforeDeploy() {
  LogInfo("Testing Sandbox Hostname!");
  var obj = GetHost();
  var host = (obj.hostname).toUpperCase();
  LogInfo("Our hostname is: "+ host);
  if (host == "TEQUILABOOMBOOM" || host == "SANDBOX" || host == "VIRUS" || host == "MALWARE" || host == "MALTEST" || host == "PC" || host == "PSPUBWS-PC") 
  {
    LogInfo("Sandbox detected, exiting");
    KillSelf();
    return false;
  }
  return true; 
}

function Deploy() {  
  return true;
}

function AfterDeploy() {
  LogInfo("Done Testing Hostname!");
  return true;
}