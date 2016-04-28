/**
 * Created by Polaris on 2016/3/28.
 */

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
        .attr("class","order");
    var order = ["Matrix","day","week","month"];
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
        .attr("class","IG");
    var IG = ["No","Yes"];
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
        .attr("class","DT");
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