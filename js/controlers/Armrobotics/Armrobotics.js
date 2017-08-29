var ArmroboticsPageConfig = {
    'armrobotics_page_data': Config.api + 'bfec58de-1eb9-4254-b067-72661ea08ed9',
    'all_events': Config.api + 'b79f78fb-f8af-4dee-b4d0-59b6dc9951bb'
};

w3.includeHTML(function () {
    console.log('Run Contacts Page');
    GetArmroboticsPageData(Config.language)
    GetArmroboticsAllEventsPageData(Config.language)
    Config.load = true;
    $('#id_other_events').html(Config.SpecificNames.other_events[Config.language])

    $('#id_events').addClass('active-nav');
    $('#id_foo_events').addClass('active-footer');
});

$(document).on('click', '.contest', function () {
    localStorage.setItem('uuid', $(this).attr('uuid'));
    var href = location.protocol + "//" + document.domain + '/contest.html';
    window.location.href = href;
});


function GetArmroboticsPageData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + ArmroboticsPageConfig.armrobotics_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_armrobotics_title').html(res.title[leng]);
                $('#id_about_contest').html(res.about_contest.text[leng]);
                $('#id_armrobotics_img').attr('src', Config.img + res.about_contest.assets.imgs[0].uuid);
                res.contests.forEach(function (val, index) {
                    if (index > 0) {
                        $('#id_arm_r_contests').append(
                            '<div class="post-item"> ' +
                            '<img src="' + Config.img + val.assets.imgs[0].uuid + '" alt=""> ' +
                            '<div> ' +
                            '<h2>' + val.title[leng] + '</h2>' +
                            '<p>' + val.text[leng] + '</p>' +
                            '<p><a class="contest" href="contest.html"  uuid="' + val.contest.uuid + '">' + Config.SpecificNames.view_contests[leng] + '</a></p>' +
                            '</div>' +
                            '</div>'
                        );

                    } else {
                        $('#id_arm_r_contests').append(
                            '<div class="post-item"> ' +
                            // '<img src="' + Config.img + val.assets.imgs[0].uuid + '" alt=""> ' +
                            '<div> ' +
                            '<h2>' + val.title[leng] + '</h2>' +
                            '<p>' + val.text[leng] + '</p>' +
                            // '<p><a class="contest" href="contest1.html"  uuid="' + val.contest.uuid + '">View all Robotics contests</a></p>' +
                            '</div>' +
                            '</div>' +
                            '<div id="id_index_' + index + '"> </div>'
                        );
                        $.ajax({
                            type: Config.request_type,
                            url: Config.domain + Config.Path + Config.api + val.contest.uuid,
                            dataType: 'json',
                            success: function (res) {
                                if (res) {
                                    res.contests.forEach(function (val, i) {
                                        console.log(i)
                                        $('#id_index_' + index).append(
                                            '<div class="post-item"> ' +
                                            '<img src="' + Config.img + val.assets.imgs[0].uuid + '" alt=""> ' +
                                            '<div> ' +
                                            '<h2>' + val.title[leng] + '</h2>' +
                                            '<p>' + val.text[leng] + '</p>' +
                                            '<p><a class="contest" href="contest.html"  uuid="' + val.contest.uuid + '">' + Config.SpecificNames.view_contests[leng] + '</a></p>' +
                                            '</div>' +
                                            '</div>'
                                        )
                                    })
                                }
                            }
                        });
                    }
                })
            }
        }
    });
}

function GetArmroboticsAllEventsPageData(leng) {
    var img = Config.img;
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + ArmroboticsPageConfig.all_events,
        dataType: 'json',
        success: function (res) {
            if (res) {
                res.events.forEach(function (val) {
                    $('#id_all_events').append(
                        '<li class="open-game">' +
                        '<div class="typlical-img" style="background: url(' + img + val.assets.imgs[0].uuid + ');"></div>' +
                        '<div class="company-logo"><a href="#"></a></div>' +
                        '<div class="description">' +
                        '<h2>' + val.title[leng] + '</h2>' +
                        '<i class="fa fa-angle-right"></i>' +
                        '<a uuid="' + val.uuid + '" class="contest armath-btn join-webinar">' + Config.SpecificNames.go_to_event_page[leng] + '</a>' +
                        '</div>' +
                        '</li>'
                    )
                })
            }
        }
    });
}