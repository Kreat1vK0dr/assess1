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
  // it("should ", function(){
  //   var result = assess.;
  //   assert.deepEqual(result, );
  // });


});
