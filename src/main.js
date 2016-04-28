/**
 * Created by Polaris on 2016/4/14.
 */
function main_init(show_data){
	//console.log(show_data);
	var svg=d3.select(".overview");
	svg.attr("width",1000)
		.attr("height",650);
	var zoom = d3.behavior.zoom()
		.scaleExtent([1, 10])
		.on("zoom", zoomed);
	function zoomed() {
		svgg.attr("transform",
			"translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	}
	var svgg=svg.append("g").call(zoom);

	var R=8;
	var pie=d3.layout.pie();
	var arc=d3.svg.arc().innerRadius(0).outerRadius(R);
	var dataset = [];
	for(var i=0;i<24;i++){
		dataset.push(1);
	}
	for(var x=0;x<64;x++){
		svgg.append("line")
			.attr("x1",20*x)
			.attr("x2",20*x)
			.attr("y1",0)
			.attr("y2",1000)
			.attr("stroke","grey")
			.attr("stroke-width",1);
	}
	for(var x=0;x<64;x++){
		svgg.append("line")
			.attr("x1",0)
			.attr("x2",1000)
			.attr("y1",x*20)
			.attr("y2",x*20)
			.attr("stroke","grey")
			.attr("stroke-width",1);
	}
	for(var x=0;x<64;x++){
		for(var y=0;y<64;y++){
			if(show_data[x+'.'+y]){
				var arcs = svgg.selectAll("#"+'x'+x+'y'+y)
					.data(pie(dataset))
					.enter()
					.append('g')
					.attr("transform","translate("+(R+x*20)+","+(R+y*20)+")");
				arcs.append("path")
					.attr("fill", function(d,i){
						if(show_data[x+'.'+y][i]==0) return "rgba(0,0,0,0)";
						else return getColor(+show_data[x+'.'+y][i]);
					})
					.attr("d",function(d,i){
						return arc(d);
					})
			}
		}
	}
}

function filter_data(data){
	var temp=[];
	var day = 1;
	for(var i in data){
		if(data[i]["date"]=="2016-4-"+day.toString()){
			var sip=data[i]["srcIP"].split(".");
			var dip=data[i]["distIP"].split(".");
			var time=data[i]["time"].split(":");
			var flow=+data[i]["flow"];
			if(sip[0]=="202"&&sip[1]=="120"){
				var ip=sip[2]+'.'+sip[3];
				if(temp[ip]){
					temp[ip][+time[0]]+=flow;
				}else{
					temp[ip]=[];
					for(var i=0;i<24;i++){
						temp[ip].push(0);
					}
					temp[ip][+time[0]]+=flow;
				}
			}
			if(dip[0]=="202"&&dip[1]=="120"){
				var ip=dip[2]+'.'+dip[3];
				if(temp[ip]){
					temp[ip][+time[0]]+=flow;
				}else{
					temp[ip]=[];
					for(var i=0;i<24;i++){
						temp[ip].push(0);
					}
					temp[ip][+time[0]]+=flow;
				}
			}
		}
	}
	//console.log(temp);
	return temp;
}

function filter_data2(data){
	var temp=[];
	var day = 1;
	for(var i in data){
		if(data[i]["date"]=="2016-4-"+day.toString()){
			var sip=data[i]["srcIP"].split(".");
			var dip=data[i]["distIP"].split(".");
			var time=data[i]["time"].split(":");
			var flow=+data[i]["flow"];
			if(sip[0]=="202"&&sip[1]=="120"){
				var ip=sip[2]+'.'+sip[3];
				if(temp[ip]){
					temp[ip][+time[0]]+=flow;
				}else{
					temp[ip]=[];
					for(var i=0;i<24;i++){
						temp[ip].push(0);
					}
					temp[ip][+time[0]]+=flow;
				}
			}
			if(dip[0]=="202"&&dip[1]=="120"){
				var ip=dip[2]+'.'+dip[3];
				if(temp[ip]){
					temp[ip][+time[0]]+=flow;
				}else{
					temp[ip]=[];
					for(var i=0;i<24;i++){
						temp[ip].push(0);
					}
					temp[ip][+time[0]]+=flow;
				}
			}
		}
	}
	//console.log(temp);
	return temp;
}