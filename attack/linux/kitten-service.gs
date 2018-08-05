// Kittenz Service
// Title: Kittenz Service
// Author: VitaPluvia
// Purpose: Persistently copies kitten.jpg into /tmp
// Gscript version: 1.0.0

//import:./kitten.jpg

function Deploy () {
  var systemKitten = '/tmp/kitten.jpg';
  var kittenBytes = GetAssetAsBytes('kitten.jpg');

  while (1) {
    var kittenExists = G.file.CheckExists(systemKitten);

    if (!kittenExists) {
      G.file.WriteFileFromBytes(systemKitten, kittenBytes[0]);
    }
    Sleep(3);
  }

  return true;
}
