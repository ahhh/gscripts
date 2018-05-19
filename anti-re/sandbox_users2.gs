// Example gscript template
// Title: Sandbox_Users2
// Author: ahhh
// Purpose:  Gets the computer's Users, checks against a dynamic list of well known sandbox users
// Gscript version: 0.1.2
// 

//priority:30
//timeout:75

function BeforeDeploy() {
  LogInfo("Testing Sandbox Users 2!");
  var obj = Getuser();
  var user = (obj.username).toUpperCase();
  LogInfo(user);
  if (user == "MALTEST" || user == "TEQUILABOOMBOOM" || user == "WILBER" || user == "PSPUBWS") 
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
  LogInfo("Done Testing Users 2!");
  return true;
}