/**
 * Created by Polaris on 2016/4/14.
 */
var svgg,ddd,svg2;
var R=8;
var R2 = 38;
var arc=d3.svg.arc().innerRadius(0).outerRadius(R);
var arc2=d3.svg.arc().innerRadius(0).outerRadius(R2);
var data_line;
var selected_matrix_x;
var selected_matrix_y;

function main_init(view1_data){
	//console.log(show_data);
	data_line = view1_data['line'];
	show_data = view1_data['matrix'];
	var svg=d3.select(".overview");
	svg.attr("width",1000)
		.attr("height",650);
	svg.append("rect")
		.attr("x",0).attr("y",0)
		.attr("width",1000).attr("height",650)
		.attr("fill","#4F4F4F");
	var zoom = d3.behavior.zoom()
		.scaleExtent([0.1, 10])
		.on("zoom", zoomed);
	function zoomed() {
		svgg.attr("transform",
			"translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	}
	svgg=svg.append("g").call(zoom);


	var pie=d3.layout.pie();

	var dataset = [];
	for(var i=0;i<24;i++){
		dataset.push(1);
	}
	for(var x=0;x<64;x++){
		svgg.append("line")
			.attr("x1",20*x-2)
			.attr("x2",20*x-2)
			.attr("y1",0)
			.attr("y2",1000)
			.attr("stroke","grey")
			.attr("stroke-width",1);
	}
	for(var x=0;x<64;x++){
		svgg.append("line")
			.attr("x1",0)
			.attr("x2",1000)
			.attr("y1",x*20-2)
			.attr("y2",x*20-2)
			.attr("stroke","grey")
			.attr("stroke-width",1);
	}
	for(var x=0;x<64;x++){
		for(var y = 0; y<64; y++){
			if(show_data[x+'.'+y]){
				var arcs_g = svgg.append("g")
					.classed('L'+x+'L'+y,true)
					.on("click", function(){
						/*
						var L = d3.select(this).attr("class").split("L");
						x = L[1];
						y = L[2];
						d3.selectAll(".link").attr("stroke", "rgba(255,255,255,0.2)");
						d3.selectAll(".link"+x+'_'+y)
							.attr("stroke", "blue");*/
						var t = d3.selectAll('.view1_link');
						t.remove();
						var L = d3.select(this).attr("class").split("L");
						x = L[1];
						y = L[2];
						selected_matrix_x = x;
						selected_matrix_y = y;
						//console.log('aaa');
						//console.log(data_line);
						//console.log(data_line[x+'.'+y]);
						if(data_line[x+'.'+y]){
							//console.log('bbb');
							a = data_line[x+'.'+y].split('|');
							for(var i in a){
								//console.log('ccc');
								var dip =a[i].split(".");
								svgg.append("line")
									.attr("x1",20*x+R)
									.attr("x2",20*dip[0]+R)
									.attr("y1",20*y+R)
									.attr("y2",20*dip[1]+R)
									.attr("stroke","blue")
									.attr("stroke-width",1)
									.attr("class","link")
									.classed("link"+x+'_'+y,true)
									.classed("link"+dip[0]+'_'+dip[1],true)
									.classed("view1_link",true)
									.style("opacity",1-o_internal);
							}
						}
						var data = [];
						data["IP1"] = [];
						data["IP1"]["IP"] = "202.120."+x+"."+y;
						info_show(data);
						detail_show(view1_data['matrix'][x+'.'+y]);
					});
				arcs_g.append("title").text("202.120."+x+'.'+y);
				ddd = pie(dataset);
				for(var t=0;t<24;t++){
					if(show_data[x+'.'+y][t]!=0){
						arcs_g.append('g')
							.attr("transform", "translate("+(R+x*20)+","+(R+y*20)+")")
							.attr("class",function(){
								return "matrix_"+x+'_'+y+'_'+t;
							})
							.append("path")
							.attr("fill", function(){
								if(show_data[x+'.'+y][t]==0) return "rgba(0,0,0,0)";
								else return getColor(+show_data[x+'.'+y][t]);
							})
							.attr("d", function(){
								return arc(ddd[t]);
							});
					}
				}
			}
		}
	}
	/*
	show_data = view1_data['line'];
	for(var x=0;x<64;x++){
		for(var y=0;y<64;y++){
			if(show_data[x+'.'+y]){
				a = show_data[x+'.'+y].split('|');
				for(var i in a){
					var dip =a[i].split(".");
					svgg.append("line")
						.attr("x1",20*x+R)
						.attr("x2",20*dip[0]+R)
						.attr("y1",20*y+R)
						.attr("y2",20*dip[1]+R)
						.attr("stroke","rgba(255,255,255,0.2)")
						.attr("stroke-width",1)
						.attr("class","link")
						.classed("link"+x+'_'+y,true)
						.classed("link"+dip[0]+'_'+dip[1],true)
						.classed("view1_link",true)
						.style("opacity",0);
				}
			}
		}
	}*/
	svg2=d3.select(".HostOverview");
	svg2.attr("width",1000)
		.attr("height",650);
	$("#HostButton" ).button().click(function(){
		IP = IP1["IP"].text().split(' ')[2];
		d3.json("http://127.0.0.1:5000/view2_matrix?IP="+IP,function(view2_data){
			view2_update(view2_data);
		});
	});
	for(var x=0;x<8;x++){
		svg2.append("line")
			.attr("x1",80*x)
			.attr("x2",80*x)
			.attr("y1",0)
			.attr("y2",560)
			.attr("stroke","grey")
			.attr("stroke-width",1);
	}
	for(var x=0;x<8;x++){
		svg2.append("line")
			.attr("x1",0)
			.attr("x2",560)
			.attr("y1",x*80)
			.attr("y2",x*80)
			.attr("stroke","grey")
			.attr("stroke-width",1);
	}
}
function detail_show(data){
	//console.log(data);
	var R3=80;
	var arc3=d3.svg.arc().innerRadius(0).outerRadius(R3);
	var dsvg = d3.select('.detail_svg');
	var dataset3 = [];
	for(var i=0;i<24;i++){
		dataset3.push(1);
	}
	var pie=d3.layout.pie();
	var ddd3 = pie(dataset3);
	d3.select(".detail_arc").remove();
	var arcs_g = dsvg.append("g").classed("detail_arc",true);
	for(var t=0;t<24;t++){
		if(data[t]!=0){
			arcs_g.append('g')
				.attr("transform", "translate("+(R3+30)+","+(R3+10)+")")
				.attr("class",function(){
					return "detail_arcs_"+t;
				})
				.append("path")
				.attr("fill", function(){
					if(data[t]==0) return "rgba(0,0,0,0)";
					else return getColor(+data[t]);
				})
				.attr("d", function(){
					return arc3(ddd3[t]);
				})
				.append('title')
				.text(t+':00-'+(t+1)+':00 FLOW:'+data[t]);
		}
	}

}
function view1_update(view1_data){
	data_line = view1_data['line'];
	t = d3.selectAll('.view1_link');
	t.remove();
	x = selected_matrix_x;
	y = selected_matrix_y;
	if(data_line[x+'.'+y]){
		//console.log('bbb');
		a = data_line[x+'.'+y].split('|');
		for(var i in a){
			//console.log('ccc');
			var dip =a[i].split(".");
			svgg.append("line")
				.attr("x1",20*x+R)
				.attr("x2",20*dip[0]+R)
				.attr("y1",20*y+R)
				.attr("y2",20*dip[1]+R)
				.attr("stroke","blue")
				.attr("stroke-width",1)
				.attr("class","link")
				.classed("link"+x+'_'+y,true)
				.classed("link"+dip[0]+'_'+dip[1],true)
				.classed("view1_link",true)
				.style("opacity",1-o_internal);
		}
	}
	/*
	t = d3.selectAll('.view1_link');
	t.remove();
	show_data = view1_data['line'];
	for(var x=0;x<64;x++){
		for(var y=0;y<64;y++){
			if(show_data[x+'.'+y]){
				a = show_data[x+'.'+y].split('|');
				for(var i in a){
					var dip =a[i].split(".");
					svgg.append("line")
						.attr("x1",20*x+R)
						.attr("x2",20*dip[0]+R)
						.attr("y1",20*y+R)
						.attr("y2",20*dip[1]+R)
						.attr("stroke","rgba(255,255,255,0.2)")
						.attr("stroke-width",1)
						.attr("class","link")
						.classed("link"+x+'_'+y,true)
						.classed("link"+dip[0]+'_'+dip[1],true)
						.classed("view1_link",true);
				}
			}
		}
	}*/
	var link = d3.selectAll(".link");
	link.style("opacity",1-o_internal);
	show_data = view1_data['matrix'];
	//console.log(show_data)
	for(var x=0;x<64;x++){
		for(var y = 0; y<64; y++){
			if(show_data[x+'.'+y]){
				var arcs_g = svgg.select('.L'+x+'L'+y);
				//console.log(arcs_g)
				for(var t=0;t<24;t++){
					arcs_g.select(".matrix_"+x+'_'+y+'_'+t).remove();
					if(show_data[x+'.'+y][t]!=0){
						//console.log(1);
						arcs_g.append('g')
							.attr("transform", "translate("+(R+x*20)+","+(R+y*20)+")")
							.attr("class",function(){
								return "matrix_"+x+'_'+y+'_'+t;
							})
							.append("path")
							.attr("fill", function(){
								if(show_data[x+'.'+y][t]==0) return "rgba(0,0,0,0)";
								else return getColor(+show_data[x+'.'+y][t]);
							})
							.attr("d", function(){
								return arc(ddd[t]);
							});
					}
				}
			}
		}
	}

	console.log('ok');

}


function view2_update(view2_data){
	//console.log(view2_data);
	aaaa = [];
	aaaa["connected1"] = view2_data["Host"];
	aaaa["connected2"] = view2_data["Outgoing"];
	info_show(aaaa);
	view2_data = view2_data["data"];
	for(var x=1;x<32;x++){
		if(view2_data['2016-4-'+x]){
			d3.select(".view2_"+x).remove();
			var arcs_g = svg2.append("g")
				.classed("view2_"+x, true);
			arcs_g.append("title").text("2016-4-"+x);
			for(var t = 0; t<24; t++){
				if(view2_data['2016-4-'+x][t]!=0){
					arcs_g.append('g')
						.attr("transform", "translate("+(R2+(Math.round((x-1)%7))*80)+","+(R2+parseInt((x-1)/7)*80)+")")
						.attr("class", function(){
							return "view2_matrix_"+t;
						})
						.append("path")
						.attr("fill", function(){
							return getColor(+view2_data["2016-4-"+x][t]);
						})
						.attr("d", function(){
							return arc2(ddd[t]);
						});
				}
			}
		}
	}
}

function show_daily(){
	data = datepicker_data;
	var a = $("table.ui-datepicker-calendar").children("tbody").children("tr").children("td");
	for(var d = 5; d<35; d++){
		a.eq(d).attr('bgcolor',getColor(data[d-4]));
		a.eq(d).children("a").removeClass("ui-state-default");
	}
	//console.log(a);
}