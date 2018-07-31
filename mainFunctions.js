const fs = require('fs');

demoP = document.getElementById("showApplications");


function alert(info)
{
  document.getElementById("warningAlert").innerHTML = '<div class="alert alert-danger" role="alert"><p>' + info + '</p></div>';
}

function runApplication(executablePath)
  {
    console.log(executablePath);
    var child = require('child_process').execFile;

    child(executablePath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }

        console.log(data.toString());
    });
  }
//--------------------------------ARRAY FUNCTIONS-------------------------------------------


var applicationList = [];

function listApplications()
{
  var application;
  demoP.innerHTML = "";
  loadToArray();
  for(var index = 0; index < applicationList.length; index++)
  {
    application = applicationList[index];

      demoP.innerHTML = demoP.innerHTML +  '<tr><th>' + (index + 1) + '</th><td>' + application[0] + '</td><td>' + application[1] + '</td><td><button type="button" onClick="runApplication(\'' + application[2] + '\')" class="btn btn-success">Run Application</button></td></tr>';
  }
}

function addApplicationToArray(name, description, path)
{
  path = path.replace(/\\/g,"/");
  applicationList.push([name,description,  path]);
  console.log("Added " + path);
  saveToArray();

  listApplications();
}

function removeApplicationToArray(id)
{
  console.log("Remove " + id);
  applicationList.splice(id-1, 1);
  saveToArray();

  listApplications();
}

function saveToArray()
{

  var file = fs.createWriteStream('array.txt');
  applicationList.forEach(function(v) {file.write(v.join(',') + '\n'); });

  file.end();
}

function loadToArray()
{
  var tempArray = fs.readFileSync("array.txt").toString().split("\n");
  for(var i = 0; i < tempArray.length - 1; i++)
  {
    applicationList.push(tempArray[i].split(","));
  }
}
