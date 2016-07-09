var WebHDFS = require('webhdfs');
var hdfs = WebHDFS.createClient();
var fs = require('fs')

var localFilePath = "stupidfile.txt";
var remoteFilePath = "/user/cloudera/doesthiswork.txt";

var localFileStream = fs.createReadStream(localFilePath);
var remoteFileStream = hdfs.createWriteStream(remoteFilePath);

localFileStream.pipe(remoteFileStream);

console.log("opening stream to HDFS");

remoteFileStream.on('error', function onError (err) {
  // Do something with the error
console.log("it failed");
console.log(err);
});

remoteFileStream.on('finish', function onFinish () {
  // Upload is done
console.log("it is done!");
});
