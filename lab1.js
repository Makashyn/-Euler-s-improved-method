var calculateFunctionValue = function(x,y){
	var currentResult = 0;
	currentResult = y/x*Math.log(y/x);
	return currentResult;
}
var calculateKoef = function(x,y,h){
	return h/2*calculateFunctionValue(x,y);
}

// y0 = 0.74, a = 2, b = 3, h = 0.5
var calculateValue = function(x,h){

	var  b = 3;
	var y = 0.74;
	arrayX = [2];
	arrayY = [0.74];
	accurateArrayX = [];
	accurateArrayY = [];

	while(x <= b+ 0.00001){
		y = y + h*calculateFunctionValue(x+h/2,y+calculateKoef(x,y,h));
		arrayX.push(Math.round((x)*1000)/1000);
		arrayY.push(Math.round((y)*1000)/1000);
		x += h;
	}
	x = 2;
	y = 0.74;
	while(x <= b + 0.00001){
		y = x*Math.pow(Math.E,1-x);
		accurateArrayY.push(Math.round((y)*1000)/1000);
		accurateArrayX.push(Math.round((x)*1000)/1000);
		x += h;
	}
}
var graph = function(ctx,animationTime){
	var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'line',

	    // The data for our dataset
	    data: {
	        labels: arrayX,
	        datasets: [{
	            label: "Наближені значення",
	            borderColor: 'rgb(255, 99, 132)',
	            data: arrayY,
	        },
	        {
	        	label: "Точні значення",
	            borderColor: 'blue',
	            data: accurateArrayY,
	        }]
	    },
	    // Configuration options go here
	    options: {
	    	animation:{
	    		duration: animationTime,
	    	}
	  }
	});
}
/*var drowTable = function(class1,class2,id1,id2,id3,id4){
	var table1 = document.getElementsByClassName(class1)[0];
	var xRow = document.getElementById(id1);
	arrayX.forEach(function(item){
		var td = document.createElement('td');
		td.innerHTML = item;
		xRow.appendChild(td);
	});
	var yRow = document.getElementById(id2);

	arrayY.forEach(function(item){
		var td = document.createElement('td');
		td.innerHTML = Math.round((item)*100)/100;
		yRow.appendChild(td);
	});	
	var table2 = document.getElementsByClassName(class2)[0];
	var xRow = document.getElementById(id3);
	accurateArrayX.forEach(function(item){
		var td = document.createElement('td');
		td.innerHTML = item;
		xRow.appendChild(td);
	});
	var yRow = document.getElementById(id4);
	accurateArrayY.forEach(function(item){
		var td = document.createElement('td');
		td.innerHTML = Math.round((item)*100)/100;
		yRow.appendChild(td);
	});
}*/
var ViewModel = function(getStep){
	this.getStep = getStep;
	this.step = ko.observable('');
	this.rememberValue = function(){
		this.getStep.addStep(this.step());
		this.step('');
	}
}

var getStep = {
	step: 0,
	addStep: function(inputStep){
		step = +inputStep;		
		showResult(step);
	} 
}

var arrayX = [2];
var arrayY = [0.74];
var accurateArrayX = [];
var accurateArrayY = [];
var showResult = function(step){
	var x = 2;
	calculateValue(x+step,step);
	var ctx = document.getElementById("myChart").getContext('2d');
	graph(ctx,2000);	
}
ko.applyBindings(new ViewModel(getStep));
/*drowTable('table-1','table-2','X','Y','accourateX','accourateY');
arrayX = [2];
arrayY = [0.74];
accurateArrayX = [];
accurateArrayY = [];
calculateValue(x+h/5,h/5);
ctx = document.getElementById("myChart-2").getContext('2d');
graph(ctx,12000);
drowTable('table-3','table-4','X2','Y2','accourateX2','accourateY2');
arrayX = [2];
arrayY = [0.74];
accurateArrayX = [];
accurateArrayY = [];
calculateValue(x+h/21,h/21);
ctx = document.getElementById("myChart-3").getContext('2d');
graph(ctx,20000);
//drowTable('table-5','table-6','X3','Y3','accourateX3','accourateY3');
*/
