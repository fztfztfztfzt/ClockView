/**
 * Created by Polaris on 2016/3/30.
 */

function filter_init(divclass){
    var $div = $("div");
    $div = $div.find("."+divclass);
    d3.select("div."+divclass)
        .append("fieldset")
        .attr("class","filter_fieldset1")
        .append("legend")
        .attr("class","flegend")
        .text("Global Filter");
    d3.select("div."+divclass)
        .append("fieldset")
        .attr("class","filter_fieldset2")
        .append("legend")
        .attr("class","flegend")
        .text("Global Port Filter");

    d3.select(".filter_fieldset1")
        .append("text")
        .attr("class","traffic_type")
        .text("Traffic Type:");
    d3.select(".filter_fieldset1")
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

    d3.select(".filter_fieldset1")
        .append("text")
        .attr("class","protocol_text")
        .text("Protocol:");
    d3.select(".filter_fieldset1")
        .append("select")
        .attr("class","protocol_select")
        .on("change",protocol_change);
    var PS = ["All","TCP","UDP"];
    d3.select(".protocol_select")
        .selectAll("option")
        .data(PS)
        .enter()
        .append("option")
        .text(function(d){return d;})
        .attr("value",function(d,i){return i;});

    d3.select(".filter_fieldset1")
        .append("text")
        .attr("class","flow_slider_text")
        .text("Flow:  0--10000");
    d3.select(".filter_fieldset1")
        .append("div")
        .attr("class","flow_slider");
    $(".flow_slider").slider({
        range:true,
        max:10000,
        values:[0,10000]
    });

    //d3.select(".flow_slider").slider();
}

function traffic_type_change(){
    var selectedValue = d3.event.target.value;
    console.log(selectedValue);
}
function protocol_change(){
    var selectedValue = d3.event.target.value;
    console.log(selectedValue);
}


