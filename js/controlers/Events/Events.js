var EventConfig = {

    'event_data': '2ff1033f-17bd-4153-9fee-fe06c5d1b21e',

    'all_events': 'b79f78fb-f8af-4dee-b4d0-59b6dc9951bb'
};


w3.includeHTML(function () {


    console.log('Run Event');

    GetEventData(Config.language);

    GetAllEvents(Config.language);

    Config.load = true;

    $('#id_foo_events').addClass('active-footer');

    $('#id_events').addClass('active-nav');
});


function GetEventData(leng) {
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + EventConfig.event_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_event_title').html(res.title[leng]);
                $('#id_event_text').html(res.text[leng]);
            }
        }
    });
}

function GetAllEvents(leng) {
    var img = Config.img;
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + EventConfig.all_events,
        dataType: 'json',
        success: function (res) {
            if (res) {
                var
                    my_class = 'armrobotics',
                    y1 = 1,
                    y2 = 3,
                    x1 = 1,
                    x2 = 4;
                res.events.forEach(function (val, index) {
                        if (index == 1) {
                            my_class = 'digicamp';
                            y1 = 1;
                            y2 = 2;
                            x1 = 4;
                            x2 = 6;
                        }
                        if (index == 2) {
                            y1 = 2;
                            y2 = 3;
                            x1 = 4;
                            x2 = 6;
                        }
                        if (index > 2) {
                            if (index % 2 == 0) {
                                x1 = 4;
                                x2 = 6;
                            } else {
                                y1 += 1;
                                y2 += 1;
                                x1 = 1;
                                x2 = 4;
                            }
                        }
                        $('#id_all_events').append(
                            '<li class="' + my_class + '" style="grid-row-start:' + y1 + '; grid-row-end:' + y2 + '; grid-column-start:' + x1 + '; grid-column-end:' + x2 + '">' +
                            '<div class="typlical-img" style="background: url(' + img + val.assets.imgs[0].uuid + ');"></div>' +
                            '<div class="company-logo">' +
                            '<a href="#"><img src="' + img + val.assets.logos[0].uuid + '" alt="Armrobotics"></a>' +
                            '</div>' +
                            '<div class="description">' +
                            '<h2>' + val.title[leng] + '</h2>' +
                            '<p>' + val.text[leng] + '</p>' +
                            '<a href="event-armrobotics.html" class="armath-btn join-webinar">Goto Event Page</a>' +
                            '</div>' +
                            '</li>'
                        )
                    }
                )
            }
        }
    })
    ;
}