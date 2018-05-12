// Example gscript template
// Title: Sandbox_Users
// Author: ahhh
// Purpose: Gets the computer's Users, checks against a list of well known sandbox users
// Gscript version: 0.1.2
// 

//priority:50
//timeout:80

function BeforeDeploy() {
  LogInfo("Testing Sandbox Users!");
  var well = CheckSandboxUsernames();
    if (well.areWeInASandbox) {
      LogInfo("Detected Common Sandbox Users!");
      KillSelf();
      return false;
    } else {
      return true;
    }
  return true; 
}

function Deploy() {  
  return true;
}

function AfterDeploy() {
  LogInfo("Done Testing Users!");
  return true;
}