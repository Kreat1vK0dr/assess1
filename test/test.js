var assert = require('assert');
var assess = require('../assess');

describe("ASSESSMENT 1", function(){

  it("should take both app and data string and return object", function(){
    var result = assess.allocateData("apptext","datatext")[0];
    assert.deepEqual(result, {user: "Walter", apps: ["Faceblock", "Instantgam"], data: 67});
  });

});
