// Example gscript template
// Title: Sandbox_RAM
// Author: ahhh
// Purpose: Gets the computer's allocated RAM, if the machine only has one 1GB or less we call it a sandbox
// Gscript version: 0.1.2
// 

//priority:50
//timeout:100

function BeforeDeploy() {
  LogInfo("Testing Sandbox RAM!");
  var well = CheckIfRAMAmountIsBelow1GB();
    if (well.areWeInASandbox) {
      LogInfo("Detected a single CPU, likly a sandbox!");
      KillSelf();
      return false;
    } else {
      return true;
    }
  return true; 
}

function Deploy() {  
  return true;
}

function AfterDeploy() {
  LogInfo("Done Testing Sandbox RAM!");
  return true;
}