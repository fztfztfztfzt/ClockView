/**
 * Created by Polaris on 2016/3/20.
 */
var info_svg;
var IP1 = [];
var IP2 = [];
var port = [];
var traffic_type;
function info_init(divclass){
    var $div = $("div");
    $div = $div.find("."+divclass);
    info_svg=d3.select('div.'+divclass)
        .append("svg")
        .attr("height",$div.height())
        .attr("width",$div.width());
    IP1["IP"] = info_svg.append("text")
        .text("Ip 1:")
        .attr('x',0)
        .attr('y',10)
        .attr("font-family", "Courier New")
        .attr("font-size", "15px");
    IP1["connected1"] = info_svg.append("text")
        .text("Connected to -- hosts")
        .attr('x',10)
        .attr('y',70)
        .attr("font-family", "Courier New")
        .attr("font-size", "15px");
    IP1["connected2"] = info_svg.append("text")
        .text("(-- outgoing)")
        .attr('x',10)
        .attr('y',90)
        .attr("font-family", "Courier New")
        .attr("font-size", "15px");
    /*
    IP2["IP"] = info_svg.append("text")
        .text("Ip 2:")
        .attr("x",0)
        .attr("y",110)
        .attr("font-family", "Courier New")
        .attr("font-size", "15px");
    port[0] = info_svg.append("text")
        .text("Port 1:--")
        .attr("x",0)
        .attr("y",130)
        .attr("font-family", "Courier New")
        .attr("font-size", "15px");
    port[1] = info_svg.append("text")
        .text("Port 2:--")
        .attr("x",0)
        .attr("y",150)
        .attr("font-family", "Courier New")
        .attr("font-size", "15px");*/
    protocol = info_svg.append("text")
        .text("Protocol:--")
        .attr("x",0)
        .attr("y",170)
        .attr("font-family", "Courier New")
        .attr("font-size", "15px");
    traffic_type = info_svg.append("text")
        .text("Traffic:Incoming+Outgoing")
        .attr("x",0)
        .attr("y",190)
        .attr("font-family", "Courier New")
        .attr("font-size", "15px");
}
function change_type(n){
    if(n==0)
        traffic_type.text("Traffic:Incoming+Outgoing");
    else if(n==1)
        traffic_type.text("Traffic:Incoming");
    else
        traffic_type.text("Traffic:Outgoing");
}
function info_show(data){
    var a;
    if(data["IP1"]){
        a=data["IP1"];
        if(a["IP"]) IP1["IP"].text("IP 1: "+a["IP"]);
    }
    /*if(data["IP2"]){

    }*/
	if(data["connected1"]) IP1["connected1"].text("Connected to "+data["connected1"]+" hosts");
	if(data["connected2"]) IP1["connected2"].text("("+data["connected2"]+" outgoing)");
    if(data["traffic"]){
        change_type(data["traffic"]);
    }
    if(data["Protocol"]){
	    protocol.text("Protocol:"+data["Protocol"]);
    }
}