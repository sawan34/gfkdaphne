function handleFiles(files) {
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead) {
	var reader = new FileReader();
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8      
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var csv = event.target.result;
	processData(csv);             
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }
	drawOutput(lines);
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}

function drawOutput(lines){
    //Clear previous data
    var totalData =  lines.length - 2;

    if(totalData < 1 || lines[0][0].toLowerCase() != "date;id;answer") {
        alert("Something Wrong");
        return;
    }


     var _arr= [],_rr = [];
    for(var i = 1; i <=totalData; i++  ){
      // console.log(lines[i]);  
       var c  =  lines[i][0].split(";");

       if(_arr.indexOf(c[0]) >= 0 ){
        if(c[2].toLowerCase() == "yes"){
              _rr[_arr.indexOf(c[0])]++
        }            
       }else{
         _arr.push(c[0]);
         if(c[2].toLowerCase() == "yes"){
            _rr.push(1);
         }else{
            _rr.push(0);
         }
       }
       
        
       //console.log(typeof c[1]);
    }

    _rr =  _rr.map(function(item,index){
        return ((item*100)/totalData);
    });
    loadGraph(_arr,_rr);
}

//loadGraph();
function loadGraph(_arr,_rr){
    var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: _arr,
               
                datasets: [{
                    label: 'Yes',
                    data:_rr,
                    labels: _arr,
                    fill: false,
					backgroundColor: "blue",
					borderColor:"blue",
                }]
            },
            options: {
				responsive: true,
				title: {
					display: true,
					text: 'Answer 3'
				},
				scales: {
                    xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Date'
						}
					}],
					yAxes: [{
						ticks: {
							// the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
							suggestedMin: 5,

							// the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
							suggestedMax: 30
                        },
                        scaleLabel: {
							display: true,
							labelString: 'Percentage'
						}
					}]
				}
			}
        });
}


function randomScalingFactor () {
		return Math.round(Samples.utils.rand(-100, 100));
	}