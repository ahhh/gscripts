// Example gscript template
// Title: Ensure_Admin
// Author: ahhh
// Purpose: Gets the current user's name, if it's Administrator or root we can continue other wise shuts down the gscript binary
// Gscript version: 0.1.2
// 

//priority:40
//timeout:40

function BeforeDeploy() {
  LogInfo("Testing Admin Users!");
  var well = GetUser();
  LogInfo("Our user is: "+well.username);
  if ((well.username == "Administrator") || (well.username == "root")) {
    return true;
  } else {
    LogInfo("Detected a non admin / root user!");
    KillSelf();
    return false;
  }
  return true; 
}

function Deploy() {  
  return true;
}

function AfterDeploy() {
  LogInfo("Done ensuring admin users!");
  return true;
}