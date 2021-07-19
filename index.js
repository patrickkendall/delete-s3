const express = require("express");
var request = require('request').defaults({ encoding: null });
const bodyParser = require("body-parser")
const AWS = require("aws-sdk")

const app = express();

app.use(express.json())

app.use(bodyParser.urlencoded({
	extended: true
  }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(5000, () => {
	console.log("Server has started on port 5000")
})

app.post("/delete", async(req,res) => { 
    const s3 = new AWS.S3({
        accessKeyId: req.body.s3.accessKeyId,  
        secretAccessKey: req.body.s3.secretAccessKey,
        Bucket: req.body.s3.Bucket
    });
    {
        return new Promise((resolve, reject) => {
            s3.createBucket({
                Bucket: "cm-test-bucket-01"       
            }, function () {
                s3.deleteObject(req.body.params, function (err, data) {
                    if (err) console.log(err);
                    else
                        console.log(
                            "Successfully deleted file from bucket"
                        );
                    console.log(data);
                });
            });
        });
    };
})