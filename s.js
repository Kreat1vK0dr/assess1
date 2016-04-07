exports.getAppData = function(appFile) {
  return getAppData(appFile);
};
exports.allocateData = function(appFile, dataFile) {
  return allocateData(appFile, dataFile);
};
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
exports.useFaceblock = function(yesNo, mappedData) {
  return useFaceblock(yesNo, mappedData);
};
exports.getRatio = function(app) {
  return getRatio(app);
};
exports.createRatios = function(appArray) {
  return createRatios(appArray);
};
exports.calcAppUsage = function(mappedData) {
  return calcAppUsage(mappedData);
};
exports.updateMappedData = function(mappedAppData, uninstallFile);
