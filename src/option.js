/**
 * Created by Polaris on 2016/3/28.
 */
var option = ['Both','absolute',0,250000];
var o_internal;
function option_init(divclass){
    var $div = $("div");
    $div = $div.find("."+divclass);
    d3.select("div."+divclass)
        .append("fieldset")
        .attr("class","option_fieldset")
        .append("legend")
        .attr("class","flegend")
        .text("Option");

    d3.select(".option_fieldset")
        .append("text")
        .text("InternalGraph:")
        .attr("class","option_text");
    d3.select(".option_fieldset")
        .append("select")
        .attr("class","IG")
        .on("change",InternalGraph_change);
    var IG = ["Yes","No"];
    d3.select(".IG")
        .selectAll("option")
        .data(IG)
        .enter()
        .append("option")
        .text(function(d){return d;})
        .attr("value",function(d,i){return i;});
    //$(".IG").selectmenu({width:100});
    d3.select(".option_fieldset")
        .append("text")
        .attr("class","traffic_type")
        .text("Traffic Type:");
    d3.select(".option_fieldset")
        .append("select")
        .attr("class","traffic_type_select")
        .on("change",traffic_type_change);
    var TT = ["Both","incoming","outgoing"];
    d3.select(".traffic_type_select")
        .selectAll("option")
        .data(TT)
        .enter()
        .append("option")
        .text(function(d){return d;})
        .attr("value",function(d,i){return i;});
/*
    d3.select(".option_fieldset")
        .append("text")
        .text("Data type:")
        .attr("class","option_text");
    d3.select(".option_fieldset")
        .append("select")
        .attr("class","DT")
        .on("change",data_type_change);
    var DT = ["absolute","%"];
    d3.select(".DT")
        .selectAll("option")
        .data(DT)
        .enter()
        .append("option")
        .text(function(d){return d;})
        .attr("value",function(d,i){return i;});*/
    //$(".IG").selectmenu({width:100});

	d3.select(".option_fieldset")
		.append("text")
		.attr("class","flow_slider_text")
		.text("Flow:  0--250000");
	d3.select(".option_fieldset")
		.append("div")
		.attr("class","flow_slider");
	$(".flow_slider").slider({
		range:true,
		min: 0,
		max:250000,
		values:[0,250000]
	}).bind('slidestop',function(event, ui){
		option[2] = ui.values[0];
		option[3] = ui.values[1];
		d3.select('.flow_slider_text')
			.text("Flow:  "+option[2]+"--"+option[3]);
		temp = "?traffic_type="+option[0]+'&data_type='+option[1]+'&flowFrom='+option[2]+'&flowTo='+option[3];
		d3.json("http://127.0.0.1:5000/view1_matrix"+temp,function(view1_data){
			console.log(view1_data)
			view1_update(view1_data);
		});
	});

	//d3.select(".flow_slider").slider();

}

function InternalGraph_change(){
    var selectedValue = d3.event.target.value;
    o_internal=selectedValue;
    var link = d3.selectAll(".link");
    link.style("opacity",1-selectedValue);
}

function traffic_type_change(){
	var selectedValue = d3.event.target.value;
	aaaa = [];
	aaaa["traffic"] = selectedValue;
	info_show(aaaa);
	temp  = ['Both','incoming','outgoing'];
	option[0] = temp[selectedValue];
	temp = "?traffic_type="+option[0]+'&data_type='+option[1]+'&flowFrom='+option[2]+'&flowTo='+option[3];
	d3.json("http://127.0.0.1:5000/view1_matrix"+temp,function(view1_data){
		view1_update(view1_data);
	});
}

function data_type_change(){
    var selectedValue = d3.event.target.value;
    console.log(selectedValue);
	temp  = ['absolute','percentage'];
	option[0] = temp[selectedValue];
	temp = "?traffic_type="+option[0]+'&data_type='+option[1]+'&flowFrom='+option[2]+'&flowTo='+option[3];
	d3.json("http://127.0.0.1:5000/view1_matrix"+temp,function(view1_data){
		view1_update(view1_data);
	});
}

