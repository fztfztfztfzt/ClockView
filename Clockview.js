/**
 * Created by Polaris on 2016/3/20.
 */
var S_order,S_data_type;
var S_traffic_type,S_protocol,S_flow_low,S_flow_high;
S_traffic_type=0;
S_protocol=0;
S_flow_low=0;
S_flow_high=1000000;
legend_init("legend");
info_init("information");
option_init("option");
filter_init("filter");
$(".main").tabs();

d3.csv("haha2.csv",function(error,data){
    if(error){
        console.log(error)
    }
    //console.log(data);
    var show_data = filter_data(data);
    //console.log(show_data);
    main_init(show_data);
});