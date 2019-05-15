$(function() {    
    $("#inputStartDate").change(function(){
        var date = $(this).val();
        var time = new Date(date).getTime();
        $("input[name='eventStartDate'").val(time);
    });
    $("#inputEndDate").change(function(){
        var date = $(this).val();
        var time = new Date(date).getTime();
        $("input[name='eventEndDate'").val(time);
    });
});
