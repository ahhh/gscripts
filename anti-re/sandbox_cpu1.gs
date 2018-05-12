// Example gscript template
// Title: Sandbox_CPU_1
// Author: ahhh
// Purpose: Gets the computer's CPU count, if the machine only has one cpu we consider it a sandbox
// Gscript version: 0.1.2
// 

//priority:50
//timeout:75

function BeforeDeploy() {
  LogInfo("Testing Sandbox CPUs!");
  var well = CheckIfCPUCountIsHigherThanOne();
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
  LogInfo("Done Testing Sandbox CPUs!");
  return true;
}