
var fs = require('fs');
var folderPath = "./";

function getAppData(appFile) {
  var apptext = fs.readFileSync(folderPath+appFile+".csv", "utf8");
  var appArr = apptext.split("\n");

  var userRX = /(\w+(?= sent))/gi;

  var appRX = /(Faceblock|Instantgam|Tooter|Snaptalk|LankedOn)/gi;

  var data = [];

  appArr.forEach(function(string) {
    if (string!=="") {
        var user = string.match(userRX)[0];
        var apps = string.match(appRX);
        data.push({user: user, apps: apps});
      }
  });
return data;
}

exports.getAppData = function(appFile) {
  return getAppData(appFile);
};

function allocateData(mappedAppData, usageDataFile) {
  // var apptext = fs.readFileSync(folderPath+appFile+".csv", "utf8");
  var data = mappedAppData;
  var datatext = fs.readFileSync(folderPath+usageDataFile+".csv", "utf8");
  var userRX = /(\w+(?= sent))/gi;

  // console.log(appArr);
  var dataArr = datatext.split('\n');
  var dataRX = /(\d+)/g;
  // console.log(appArr);
  dataArr.forEach(function(string) {

    if (string!=="") {
    var user = string.match(userRX)[0];
    var usage = Number(string.match(dataRX)[0]);
    var find = data.find(function(name) {return name.user===user;});
    find.data = usage;
  // }
  }
  });
  return data;
}

exports.allocateData = function(appFile, dataFile) {
  return allocateData(appFile, dataFile);
};

// allocateData("apptext","datatext");
// console.log(allocateData("apptext","datatext"));
//
exports.leastUsage = function(mappedData) {
  var most = mappedData.sort(function(a,b) {return a.data - b.data;});
  return most[0];
};

exports.mostUsage = function(mappedData) {
  var most = mappedData.sort(function(a,b) {return a.data - b.data;});
  return most[most.length-1];
};

exports.leastApps = function(mappedData) {
  var most = mappedData.sort(function(a,b) {return a.apps.length - b.apps.length;});
  return most.filter(function(a) {return a.apps.length === most[0].apps.length});
};

exports.mostApps = function(mappedData) {
  var most = mappedData.sort(function(a,b) {return a.apps.length - b.apps.length;});
  return most.filter(function(a) {return a.apps.length === most.length-1});
}

function useFaceblock(yesNo, mappedData) {
  switch (yesNo) {
    case "yes" : return mappedData.filter(function(a){return a.apps.indexOf("Faceblock")!==-1;});
    case "no" : return mappedData.filter(function(a){return a.apps.indexOf("Faceblock")===-1;});
    default : return false;
  }
}

exports.useFaceblock = function(yesNo, mappedData) {
  return useFaceblock(yesNo, mappedData);
};

function getRatio(app) {
  switch(app) {
    case "Faceblock" : return 2;
    case "Tooter" : return 2;
    case "Instantgam" : return 3;
    case "Snaptalk" : return 6;
    case "LankedOn" : return 1;
    default : return null;
  }
}

exports.getRatio = function(app) {
  return getRatio(app);
};

function createRatios(appArray) {
  return appArray.map(function(a){
    return getRatio(a);
  });
}

exports.createRatios = function(appArray) {
  return createRatios(appArray);
};

function calcAppUsage(mappedData) {
  return mappedData.map(function(a) {
    var ratios = createRatios(a.apps);
    var sumRatios = ratios.reduce(function(a,b){return a+b;});
    var dataF = a.data/sumRatios;
    return {
              user: a.user,
              appUsage: a.apps.map(function(a){
                          return {app: a, usage: Number((dataF*getRatio(a)).toFixed(2))};
                        })
    }
  });
}

exports.calcAppUsage = function(mappedData) {
  return calcAppUsage(mappedData);
};

function updateMappedData(mappedAppData, uninstallFile){
  var contentText = fs.readFileSync(folderPath+uninstallFile+".csv", "utf8");
  var content = contentText.split('\n');
  var userRX = /(\w+(?= sent))/gi;

  var appRX = /(Faceblock|Instantgam|Tooter|Snaptalk|LankedOn)/gi;
  var data = mappedAppData;
  var removeApps = [];

  content.forEach(function(string) {
    if (string!=="") {
        var user = string.match(userRX)[0];
        var apps = string.match(appRX);
        removeApps.push({user: user, remove: apps});
      }
  });

return  data.map(function(a) {
    var user = a.user;
    var find = removeApps.find(function(name) {return name.user===user;});
// console.log(find);
    var track = a.apps;
    a.apps = [];
    for (var i = 0; i<track.length; i++) {
      if (find.remove!==null) {
      if (find.remove.indexOf(track[i])===-1) {
        a.apps.push(track[i]);
      }
    } else {
      a.apps.push(track[i]);
    }
  }
  return a;
  });

}

exports.updateMappedData = function(mappedAppData, uninstallFile) {
  return updateMappedData(mappedAppData, uninstallFile);
};

var appdata = getAppData("apptext");
var updatedAppData = updateMappedData(appdata, "uninstalledtext");
var all = allocateData(appdata, "updatedDataText");
var allUpdated = allocateData(updatedAppData, "updatedDataText");
// var all = allocateData(appdata, "datatext");

// console.log(allUpdated);
