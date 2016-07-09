var formidable = require('formidable');
var http = require('http');
var util = require('util');
var fs = require('fs');
var os = require('os');
var multer = require('multer');

var app = http.createServer(
 function(req, res){
  switch(req.method){
   case 'GET':
    showPage(req, res);
    break;
   case 'POST':
    upload(req, res);
    break;
  }
 }
);
app.listen(1919);

//Display my IP
var networkInterfaces=os.networkInterfaces();

for (var interface in networkInterfaces) {

    networkInterfaces[interface].forEach(
        function(details){

            if (details.family=='IPv4'
                && details.internal==false) {
                    console.log(interface, details.address);
        }
    });
}

function showPage(req, res){
 fs.readFile(__dirname + '/index.html',
  function (err, data) {
   if (err) {
    res.writeHead(500);
    return res.end('Error loading index.html');
   }

   res.writeHead(200);
   res.end(data);
  });
}


function upload(req, res){

 var form = new formidable.IncomingForm();

 var temp;
  form.parse(req, function(err, fields, files) {
  res.writeHead(200, {'content-type': 'text/plain'});
  res.end('File uploaded!');
  console.log("A"+"Upload completed");
  var x = util.inspect(files);
  console.log("B"+x);
  //var obj = eval("(" + x + ')');
  var s = x.indexOf("path");
  var e = x.indexOf("name");
  console.log("S"+s);
  console.log("E"+e);
  var o = x.substring(s,e);
  console.log("OO"+o);
  var p = o.substring(7,(o.length-6));
  console.log("P"+p);
  var y = p.indexOf(",");
  console.log(y);
  var result = p.substring(0,y-1);
  console.log("PA"+result);
  var path =  result;

var WebHDFS = require('webhdfs');

var hdfs = WebHDFS.createClient({
  user: 'hdfs', // Hadoop user
  host: 'sandbox.hortonworks.com', // Namenode host
  port: 50070, // Namenode port
  path: '/webhdfs/v1'
});

var fs = require('fs');
var localFileStream = fs.createReadStream(path);
console.log(localFileStream);
console.log(localFileStream.name);
var pointPath = path.substring(path.indexOf("tmp"),path.length);
console.log("PoitnPath"+pointPath);
var pathHDFS = '/user/tem/server/'+pointPath;
var remoteFileStream = hdfs.createWriteStream(pathHDFS);
localFileStream.pipe(remoteFileStream);

remoteFileStream.on('error', function onError (err) {
  // Do something with the error
  console.log("Err"+err);
});

remoteFileStream.on('finish', function onFinish () {
  // Upload is done
  console.log("Fin");
});


  //var b = JSON.parse("\""+x+"\"");
  //console.log("G"+b);
  //console.log("TME"+b);
 });
 console.log("T"+temp);
}

/*
var WebHDFS = require('webhdfs');

var hdfs = WebHDFS.createClient({
  user: 'hdfs', // Hadoop user
  host: 'sandbox.hortonworks.com', // Namenode host
  port: 50070, // Namenode port
  path: '/webhdfs/v1'
});

var fs = require('fs');
var localFileStream = fs.createReadStream(path);
console.log(localFileStream.name)
var pointPath = path.substring(path.indexOf("/tmp/"),path.length);
var remoteFileStream = hdfs.createWriteStream('/user/tem/server/'+pointPath);
localFileStream.pipe(remoteFileStream);

remoteFileStream.on('error', function onError (err) {
  // Do something with the error
  console.log("E
});

remoteFileStream.on('finish', function onFinish () {
  // Upload is done
});


*/
