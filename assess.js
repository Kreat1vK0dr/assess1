
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

function allocateData(mappedAppData, usageDataFile) {
  // var apptext = fs.readFileSync(folderPath+appFile+".csv", "utf8");
  var data = mappedAppData;
  var datatext = fs.readFileSync(folderPath+dataFile+".csv", "utf8");
  var userRX = /(\w+(?= sent))/gi;

  // console.log(appArr);
  var dataArr = datatext.split('\n');
  var dataRX = /(\d+)(?=MB)/g;
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
function leastUsage(mappedData) {
  var most = mappedData.sort(function(a,b) {return a.data - b.data;});
  return most[0];
}
function mostUsage(mappedData) {
  var most = mappedData.sort(function(a,b) {return a.data - b.data;});
  return most[most.length-1];
}

function leastApps(mappedData) {
  var most = mappedData.sort(function(a,b) {return a.apps.length - b.apps.length;});
  return most.filter(function(a) {return a.apps.length === most[0].apps.length});
}

function mostApps(mappedData) {
  var most = mappedData.sort(function(a,b) {return a.apps.length - b.apps.length;});
  return most.filter(function(a) {return a.apps.length === most.length-1});
}

function useFaceBlock(yesNo, mappedData) {
  switch (yesNo) {
    case "yes" : return mappedData.filter(function(a){return a.apps.indexOf("Faceblock")!==-1;});
    case "no" : return mappedData.filter(function(a){return a.apps.indexOf("Faceblock")===-1;});
    default : return false;
  }
}

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

function createRatios(appArray) {
  return appArray.map(function(a){
    return getRatio(a);
  });
}

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

function updateMappedData(mappedData, uninstallFile){
  var contentText = fs.readFileSync(folderPath+uninstallFile+".csv", "utf8");
  var content = contentText.split('\n');
  var userRX = /(\w+(?= sent))/gi;

  var appRX = /(Faceblock|Instantgam|Tooter|Snaptalk|LankedOn)/gi;
var data = mappedData;
  var removeApps = [];

  content.forEach(function(string) {
    if (string!=="") {
        var user = string.match(userRX)[0];
        var apps = string.match(appRX);
        removeApps.push({user: user, remove: apps});
      }
  });

return  data.map(function(a) {

    var find = removeApps.find(function(name) {return name.user===user;});
    var track = a.apps;
    a.apps = [];
    for (var i = 0; i<track.length; i++) {
      if (find.remove.indexOf(track[i])===-1) {
        a.apps.push(track[i]);
      }
    }
  });

}

var appdata = getAppData("apptext");
var all = allocateData(appdata, "updatedDataText");
// var all = allocateData(appdata, "datatext");

console.log(calcAppUsage(all)[0]);
