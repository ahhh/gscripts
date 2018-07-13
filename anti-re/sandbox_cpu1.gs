// Example gscript template
// Title: Sandbox_CPU_1
// Author: ahhh
// Purpose: Gets the computer's CPU count, if the machine only has one cpu we consider it a sandbox
// Tactic: Has a low priority to run first and kill the process if it detects a sandbox
// Gscript version: 1.0.0

//go_import:runtime as funtime


//priority:50
//timeout:75

  function Deploy() {  
    console.log("Testing Sandbox CPUs!");

    var cpucount = funtime.NumCPU();
      if (cpucount == 1) {
        console.log("Detected a single CPU, likly a sandbox!");
        G.os.TerminateSelf();
        return false;
      } else {
        return true;
      }

    console.log("Done Testing Sandbox CPUs!");
    
    return true;
}
  