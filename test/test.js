var assert = require('assert');
var assess = require('../assess');

describe("ASSESSMENT 1", function(){

  it(".getAppData should return an array of length the same as number of users", function(){
    var result = assess.getAppData("apptext").length;
    assert.equal(result, 4);
  });

  it(".allocateData should return an array of length equal to number of users.", function(){
    var appData = assess.getAppData("apptext");
    var result = assess.allocateData(appData,"datatext").length;
    assert.equal(result, 4);
  });

  it(".getAppData should read app string from file and return an array of objects", function(){
    console.log(assess.getAppData("apptext")[0]);
    var result = assess.getAppData("apptext")[0];
    assert.deepEqual(result, {user: "Walter", apps: ["Faceblock", "Instantgam"]});
  });


  it(".allocateData should take mapped App Data and data string and return object", function(){
    var appData = assess.getAppData("apptext");
    var result = assess.allocateData(appData,"datatext")[0];
    assert.deepEqual(result, {user: "Walter", apps: ["Faceblock", "Instantgam"], data: 67});
  });
  //
  //
  it(".leastApps should return user details with least apps", function(){
    var appData = assess.getAppData("apptext");
    var result = assess.leastApps(appData);
    assert.deepEqual(result, [{user: "Walter", apps: ["Faceblock","Instantgam"]},{user: "Gus", apps: ["Tooter","Instantgam"]}]);
  });
  //
  it(".mostApps should return user details with most apps", function(){
    var appData = assess.getAppData("apptext");
    var result = assess.mostApps(appData);
    assert.deepEqual(result, [{user: "Jesse", apps: ["Tooter", "Faceblock", "Instantgam", "Snaptalk"]}]);
  });

  it(".leastUsage should return details of user with least data usage", function(){
    var appData = assess.getAppData("apptext");
    var all = assess.allocateData(appData,"datatext");
    var result = assess.leastUsage(all);
    assert.deepEqual(result, {user: "Walter", apps: ["Faceblock", "Instantgam"], data: 67});
  });
  //
  it(".mostUsage should return details of user with most data usage", function(){
    var appData = assess.getAppData("apptext");
    var all = assess.allocateData(appData,"datatext");
    var result = assess.mostUsage(all);
    assert.deepEqual(result, {user: "Jesse", apps: ["Tooter", "Faceblock", "Instantgam", "Snaptalk"], data: 300});
  });

  //
  it(".useFaceblock should return users that use Faceblock when first parameter==='yes'", function(){
    var appData = assess.getAppData("apptext");
    var result = assess.useFaceblock("yes",appData);
    assert.deepEqual(result, ["Walter","Saul","Jesse"]);
  });

  //
  it(".useFaceblock should return users that don't use Faceblock when first parameter==='no'", function(){
    var appData = assess.getAppData("apptext");
    var result = assess.useFaceblock("no",appData);
    assert.deepEqual(result, ["Gus"]);
  });
  //
  it(".getRatio should take the app name as parameter and return its estimated data usage ratio", function(){
    var result = assess.getRatio("Faceblock");
    assert.equal(result, 2);
  });
  it(".createRatios should take an array of app names as parameter and return list of ratios associated with the app names", function(){
    var result = assess.createRatios(["Faceblock","Tooter","Snaptalk"]);
    assert.deepEqual(result, [2,2,6]);
  });
  it(".calcAppUsage should return a list of users each with the details of the data usage of the respective application that they use.", function(){
    var appData = assess.getAppData("apptext");
    var all = assess.allocateData(appData,"datatext");
    var result = assess.calcAppUsage(all)[0];
    assert.deepEqual(result, {user: "Walter", usage: [{app: "Faceblock", usage: 26.8},{app: "Instantgam", usage: 40.2}]});
  });
  it(".updateMappedData should take previously mapped AppData and new uninstall file and remove applications that have been uninstalled from each user", function(){
    var appData = assess.getAppData("apptext");
    var result = assess.updateMappedData(appData, "uninstalledtext");
    assert.deepEqual(result, [ { user: 'Walter', apps: [ 'Faceblock' ]},{ user: 'Saul', apps: [ 'LankedOn', 'Faceblock' ]},{ user: 'Jesse',apps: [ 'Tooter', 'Faceblock', 'Instantgam', 'Snaptalk' ]},{ user: 'Gus', apps: [ 'Instantgam' ]}]);
  });


});
