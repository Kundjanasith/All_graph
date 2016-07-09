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
  temp =  result;
 });
 console.log("T"+temp);
}
