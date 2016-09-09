/**
 * Created by Polaris on 2016/3/30.
 */
var filter = ['','2016-4-1','',''];
function filter_init(divclass){
    var $div = $("div");
    $div = $div.find("."+divclass);
    d3.select("div."+divclass)
        .append("fieldset")
        .attr("class","filter_fieldset1")
        .append("legend")
        .attr("class","flegend")
        .text("Global Filter");

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
		.append('div')
		.attr("id",'datepicker');
	$( "#datepicker" ).datepicker({
		inline: false,
		defaultDate: '04/01/2016',
		onSelect: function(dateText, inst){
			a = dateText.split('/');
			year = a[2];
			month = parseInt(a[0]);
			day = parseInt(a[1]);
			temp = year+'-'+month+'-'+day;
			filter[1] = temp;
			temp = '?date='+filter[1]+'&protocol='+filter[0]+'&IP1='+filter[2]+'&IP2='+filter[3];
			d3.csv("http://127.0.0.1:5000/data"+temp,function(data){
				temp = "?traffic_type="+option[0]+'&data_type='+option[1]+'&flowFrom='+option[2]+'&flowTo='+option[3];
				d3.json("http://127.0.0.1:5000/view1_matrix"+temp,function(view1_data){
					view1_update(view1_data);
				});
			});
		}
	});
}


function protocol_change(){
    var selectedValue = d3.event.target.value;
    temp = ['','TCP','UDP'];
	filter[0] = temp[selectedValue];
	aaaa = [];
	aaaa["Protocol"] = filter[0];
	info_show(aaaa);
    temp = '?date='+filter[1]+'&protocol='+filter[0]+'&IP1='+filter[2]+'&IP2='+filter[3];
    d3.csv("http://127.0.0.1:5000/data"+temp,function(data){
	    temp = "?traffic_type="+option[0]+'&data_type='+option[1]+'&flowFrom='+option[2]+'&flowTo='+option[3];
	    d3.json("http://127.0.0.1:5000/view1_matrix"+temp,function(view1_data){
		    view1_update(view1_data);
	    });
    });
}


