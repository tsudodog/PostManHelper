# Code Snippit

Add this to the Test section of Postman

```
// The data to be written to file
let dataToFile = {
    requestName: request.name || request.url,
    fileExtension: 'json',
    responseData: pm.response.text(),
    collectionName: 'Write_Responses_To_File'
};

pm.sendRequest({
    url: 'http://localhost:3000/writeRBAC',
    method: 'POST',
    header: 'Content-Type:application/json',
    body: {
        mode: 'raw',
        raw: JSON.stringify(dataToFile)
    }
}, function(err, res) {
    console.log(res);
});
```
