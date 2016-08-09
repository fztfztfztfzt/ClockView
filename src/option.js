/**
 * Created by Polaris on 2016/3/28.
 */
var o_order=0;
var o_internal=0;
var o_type=0;
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
        .text("Order:")
        .attr("class","option_text");
    d3.select(".option_fieldset")
        .append("select")
        .attr("class","order")
        .on("change",order_change);
    var order = ["day","week","month"];
    d3.select(".order")
        .selectAll("option")
        .data(order)
        .enter()
        .append("option")
        .text(function(d){return d;})
        .attr("value",function(d,i){return i;});
    //$(".order").selectmenu({width:100});

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
        .attr("value",function(d,i){return i;});
    //$(".IG").selectmenu({width:100});

}

function InternalGraph_change(){
    var selectedValue = d3.event.target.value;
    o_internal=selectedValue;
    var link = d3.selectAll(".link");
    link.style("opacity",1-selectedValue);
}

function get_option(){
    return [o_order,o_internal,o_type];
}

function data_type_change(){
    var selectedValue = d3.event.target.value;
    console.log(selectedValue);
}

function order_change(){
    var selectedValue = d3.event.target.value;
    console.log(selectedValue);
}