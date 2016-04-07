var s = 'Saul sent: “I think 283MB. That’s what the guy at the store said. I think it means MegaBites.”'



var dataRX = /(\d+)MB/g;

var usage = dataRX.exec(s);


console.log(usage);
