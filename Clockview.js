/**
 * Created by Polaris on 2016/3/20.
 */
legend_init("legend");
info_init("information");
option_init("option");
filter_init("filter");
$(".main").tabs();

d3.csv("data.csv",function(error,data){
    if(error){
        console.log(error)
    }
    //console.log(data);
    var show_data = filter_data(data);
    main_init(show_data);
});