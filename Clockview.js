/**
 * Created by Polaris on 2016/3/20.
 */
legend_init("legend");
info_init("information");
option_init("option");
filter_init("filter");
$(".main").tabs();
var datepicker_data;

d3.csv("http://127.0.0.1:5000/data?date=2016-4-1",function(data){
	//console.log(data);
	d3.json("http://127.0.0.1:5000/view1_matrix",function(view1_data){
		//console.log(show_data);
		main_init(view1_data);
	});
	d3.json("http://127.0.0.1:5000/daily_data",function(daily_data){
		//console.log(daily_data);
		datepicker_data=daily_data;
		show_daily();
	});
});