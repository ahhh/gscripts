// Example gscript template
// Title: Sandbox_Users2
// Author: ahhh
// Purpose:  Gets the computer's Users, checks against a dynamic list of well known sandbox users
// Gscript version: 1.0.0

//go_import:os/user as user2

//priority:30
//timeout:75

function Deploy() {  
    console.log("Testing Sandbox Users 2!");
    // Whoami
    var myuser = user2.Current();
    console.log("user: "+Dump(myuser[0]));
    var user = (myuser[0]).toUpperCase();
    console.log(user);
    if (user == "MALTEST" || user == "TEQUILABOOMBOOM" || user == "WILBER" || user == "PSPUBWS") 
    {
      console.log("Sandbox detected, exiting");
      G.os.TerminateSelf();
      return false;
    }
    return true; 
  }