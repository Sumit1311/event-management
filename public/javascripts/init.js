$(function () {
           console.log("Event Source Start");
    var options = {
       events_source: '/api/events' ,
                view: 'month',
                onAfterViewLoad: function(view) {
                                $('.page-header h3').text(this.getTitle());
                                $('.btn-group button').removeClass('active');
                                $('button[data-calendar-view="' + view + '"]').addClass('active');
                            },
                classes: {
                                months: {
                                                    general: 'label'
                                                }
                            }
            };
   $('.datetimepicker').datetimepicker({
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
   });   
           console.log("Event Source");
   var calendar = $(".calendar").calendar(options);
    $('.btn-group button[data-calendar-nav]').each(function() {
                var $this = $(this);
                $this.click(function() {
                                calendar.navigate($this.data('calendar-nav'));
                            });
            });

        $('.btn-group button[data-calendar-view]').each(function() {
                    var $this = $(this);
                    $this.click(function() {
                                    calendar.view($this.data('calendar-view'));
                                });
                });

})

var marker;

function initCreateMap() {
    var pune = {lat: 18.5204, lng:73.8567 };
    var uluru = {lat: -25.344, lng: 131.036};
    var map = new google.maps.Map(
              document.getElementById('location-map'), {zoom: 10, center: pune});
        $("input[name='eventLatitude'").val(pune.lat);
        $("input[name='eventLongitude'").val(pune.lng);
    marker = new google.maps.Marker({position: pune, map: map, draggable : true});
    google.maps.event.addListener(marker,'position_changed',function() {
        var position = marker.getPosition();
        console.log("Position changed : ", position.lat(), position.lng());
        $("input[name='eventLatitude'").val(position.lat());
        $("input[name='eventLongitude'").val(position.lng());
    })
}
function initEventMap() {
    var pune = {lat: 18.5204, lng:73.8567 };
    pune.lat = parseFloat($("input[name='eventLatitude'").val());
    pune.lng = parseFloat($("input[name='eventLongitude'").val());
    console.log("Position ", pune.lat, pune.lng);
    var map = new google.maps.Map(
              document.getElementById('location-map'), {zoom: 10, center: pune});
    marker = new google.maps.Marker({position: pune, map: map});
}
