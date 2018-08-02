// Example gscript template
// Title: Cross Platform Strings Test
// Author: ahhh
// Purpose: 
// Gscript version: 1.0.0
// ATT&CK: 

//priority:150
//timeout:150

//go_import:strings as strings

function Deploy() {  
    console.log(strings.Split("what.is.this", ".")[1]);
    return true;
  }
  