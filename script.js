const express = require('express'),
  app = express(),
  fs = require('fs'),
  shell = require('shelljs'),

   // Modify the folder path in which responses need to be stored
  folderPath = './Responses/',
  folderPathRBAC = './ResponsesRBAC/'
  defaultFileExtension = 'json', // Change the default file extension
  bodyParser = require('body-parser'),
  path = require('path');

// Create the folder path in case it doesn't exist
shell.mkdir('-p', folderPath);
shell.mkdir('-p', folderPathRBAC);

 // Change the limits according to your response size
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); 

app.get('/', (req, res) => res.send('Hello, I write data to file. Send them requests!'));

const endpointBody =(dir)=> (req, res) => {
  let newName = `${req.body.collectionName}_${req.body.requestName}`
  console.log(dir)
console.log(newName)
  let extension = req.body.fileExtension || defaultFileExtension,
    filePath = `${path.join(dir, newName)}.${extension}`;

  fs.writeFile(filePath, newName, (err) => {
    if (err) {
      console.log(err);
      res.send('Error');
    }
    else {
      res.send('Success');
    }
  });
}

const oldFunc = endpointBody(folderPath)
app.post('/write', oldFunc );
const rbacFunc = endpointBody(folderPathRBAC)
app.post('/writeRBAC',rbacFunc) 

app.listen(3000, () => {
  console.log('ResponsesToFile App is listening now! Send them requests my way!');
  console.log(`Data is being stored at location: ${path.join(process.cwd(), folderPath)}`);
});