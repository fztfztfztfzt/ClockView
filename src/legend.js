/**
 * Created by Polaris on 2016/3/20.
 */

color_table = ["#ffffff","#ffeeee","#ffdddd","#ffcccc",
    "#ffbbbb","#ffaaaa","#ff9999","#ff8888",
    "#ff7777","#ff4444","#ff1111"];
color_text = [["1-10","1"],["11-100","2"],["101-200","3"],["201-300","4"],
    ["301-500","5"],["501-1000","6-7"],["1001-2000","8-10"],["2001-3000","11-15"],
    ["3001-5000","16-20"],["5001-10000","21-30"],["10000+","30+"]];
function legend_init(divclass){
    var $div = $("div");
    $div = $div.find("."+divclass);
    d3.select("div."+divclass)
        .append("fieldset")
        .attr("class","legend_fieldset")
        .append("legend")
        .attr("class","flegend")
        .text("Legend");
    var legend_svg = d3.select(".legend_fieldset")
        .append("svg")
        .attr("class","legend_svg")
        //.attr("fill","black")
        .attr("height",$div.height()-50)
        .attr("width",$div.width()-10);
    legend_svg.selectAll(".legend_color")
        .data(color_table)
        .enter()
        .append("rect")
        .attr("x",0)
        .attr("y",function(d,i){
            return i*20+45;
        })
        .attr("height",20)
        .attr("width",$div.width()-10)
        .attr("fill", function(d){
            return d;
        })
        .attr("class","legend_color");
    legend_svg.selectAll(".legend_text_hour")
        .data(color_text)
        .enter()
        .append("text")
        .text(function(d){return d[0];})
        .attr('x',10)
        .attr('y', function(d,i){
            return i*20+60;
        })
        .attr("font-family", "Courier New")
        .attr("font-size", "15px");
    legend_svg.selectAll(".legend_text_minute")
        .data(color_text)
        .enter()
        .append("text")
        .text(function(d){return d[1];})
        .attr('x',130)
        .attr('y', function(d,i){
            return i*20+60;
        })
        .attr("font-family", "Courier New")
        .attr("font-size", "15px");
    legend_svg.append("text")
        .text("per hour")
        .attr("x",10)
        .attr("y",40)
        .attr("font-family", "Courier New")
        .attr("font-size", "15px");
    legend_svg.append("text")
        .text("per minute")
        .attr("x",130)
        .attr("y",40)
        .attr("font-family", "Courier New")
        .attr("font-size", "15px");
    legend_svg.append("text")
        .text("Flows:")
        .attr("x",10)
        .attr("y",20)
        .attr("font-family", "Courier New")
        .attr("font-size", "20px");
}

function getColor(flow){
    var n;
    if(flow<=10) n=0;
    else if(flow<=100) n=1;
    else if(flow<=200) n=2;
    else if(flow<=300) n=3;
    else if(flow<=500) n=4;
    else if(flow<=1000) n=5;
    else if(flow<=2000) n=6;
    else if(flow<=3000) n=7;
    else if(flow<=5000) n=8;
    else if(flow<=10000) n=9;
    else n=10;
    return color_table[n];
}