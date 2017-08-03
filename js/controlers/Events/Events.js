var EventConfig = {
    'event_data': Config.api + '2ff1033f-17bd-4153-9fee-fe06c5d1b21e',
    'all_events': Config.api + 'b79f78fb-f8af-4dee-b4d0-59b6dc9951bb'
};


w3.includeHTML(function () {
    console.log('Run Event');
    GetEventData(Config.language);
    GetAllEvents(Config.language);
    Config.load = true;
    $('#id_foo_events').addClass('active-footer');
    $('#id_events').addClass('active-nav');
});
$(document).on('click', '.contest', function () {
    localStorage.setItem('uuid', $(this).attr('uuid'));
    var href = location.protocol + "//" + document.domain + '/contest.html';
    window.location.href = href;
});

function GetEventData(leng) {
    $.ajax({
        type: Config.request_type,
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
        type: Config.request_type,
        url: Config.domain + Config.Path + EventConfig.all_events,
        dataType: 'json',
        success: function (res) {
            if (res) {
                var my_class;
                var href = 'href = "event-armrobotics.html"'
                res.events.forEach(function (val, index) {
                        switch (index) {
                            case 0:
                                my_class = 'armrobotics';
                                break;
                            case 1:
                                my_class = 'digicamp camp-aim';
                                href = '';
                                break;
                            case 2:
                                my_class = 'digicamp open-game';
                                break;
                            case 3:
                                my_class = 'digicamp digicode';
                                break;
                            case 4:
                                my_class = 'digicamp technocamp';
                                break;
                        }
                        if (index < 3) {
                            $('#id_all_events_1').append(
                                '<div class="' + my_class + '">' +
                                '<div class="typlical-img" style="background: url(' + img + val.assets.imgs[0].uuid + ');"></div>' +
                                '<div class="company-logo">' +
                                '<a href="#"></a>' +
                                '</div>' +
                                '<div class="description">' +
                                '<h2>' + val.title[leng] + '</h2>' +
                                '<p>' + val.text[leng] + '</p>' +
                                '<a ' + href + ' uuid="' + val.uuid + '" class="contest armath-btn join-webinar">Goto Event Page</a>' +
                                '</div>' +
                                '</div>'
                            )
                        } else {
                            $('#id_all_events_2').append(
                                '<div class="' + my_class + '">' +
                                '<div class="typlical-img" style="background: url(' + img + val.assets.imgs[0].uuid + ');"></div>' +
                                '<div class="company-logo">' +
                                '<a href="#"></a>' +
                                '</div>' +
                                '<div class="description">' +
                                '<h2>' + val.title[leng] + '</h2>' +
                                '<p>' + val.text[leng] + '</p>' +
                                '<a uuid="' + val.uuid + '"  class="contest armath-btn join-webinar">Goto Event Page</a>' +
                                '</div>' +
                                '</div>'
                            )
                        }

                    }
                )
            }
        }
    })
    ;
}