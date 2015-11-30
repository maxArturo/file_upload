'use strict';
const multiparty = require('multiparty');
const http = require('http');
const util = require('util');

http.createServer((req, res) => {
  if (req.url === '/upload' && req.method === 'POST') {
    // parse a file upload
    let form = new multiparty.Form({autoFiles: true, uploadDir: './upload_files'});

    form.parse(req, (err, fields, files) => {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      // Object.keys(files).forEach((f) => )
      res.end(util.inspect({fields: fields, files: files}));
    });

    return;
  }

    // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8081);
