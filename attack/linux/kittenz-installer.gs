// Kittenz Service Installer
// Title: Kittenz Service Installer
// Author: VitaPluvia
// Purpose: Installs kitten-service placing kitten.jpg in /tmp persistently
// Gscript version: 1.0.0

//import:/root/kitten-service
//go_import:github.com/gen0cide/gscript/x/svc as svc

var SERVICE_NAME = 'kittenz';
var SERVICE_DIR = '/usr/bin/';
var SERVICE_PATH = SERVICE_DIR + SERVICE_NAME;
var PLACING_KITTENZ_MSG = 'Placing kitten-service into ' + SERVICE_PATH + '...';
var CREATE_SERVICE_MSG = 'Creating Service...';
var SERVICE_SANITY_MSG = 'Checking Service Health...';
var INSTALLING_SERVICE_MSG = 'Installing kittenz Service!';
var STARTING_SERVICE_MSG = 'Starting kittenz!';
var SERVICE_COMPLETE = 'Service Started.';

var settings = {
  name: SERVICE_NAME,
  display_name: "kittenz",
  description: "kittenz are in your system!",
  arguments: [],
  executable_path: SERVICE_PATH,
  working_directory: SERVICE_DIR,
  options: {}
};

function handleError (obj) {
  if (obj) {
    DebugConsole();
    console.log(obj.Error());
    throw new Error('Error: ', obj.Error());
  }
}

function Deploy () {
  var kittenService = GetAssetAsBytes('kitten-service');

  console.log(PLACING_KITTENZ_MSG);
  var writeError = G.file.WriteFileFromBytes(SERVICE_PATH, kittenService[0]);
  if (writeError) {
    console.log(writeError);
    return false;
  }

  console.log(CREATE_SERVICE_MSG);
  var svcRes = svc.NewFromJSON(settings);
  var svcObj = svcRes[0];
  handleError(svcRes[1]);

  console.log(SERVICE_SANITY_MSG);
  var svcCheckRes = svcObj.CheckConfig(true);
  handleError(svcCheckRes[1]);

  console.log(INSTALLING_SERVICE_MSG);
  handleError(svcObj.Install(true));

  console.log(STARTING_SERVICE_MSG);
  handleError(svcObj.Start());

  console.log(SERVICE_COMPLETE);

  return true;
}
