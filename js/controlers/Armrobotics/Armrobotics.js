var ArmroboticsPageConfig = {
    'armrobotics_page_data': Config.api +'bfec58de-1eb9-4254-b067-72661ea08ed9',
    'all_events': Config.api +'b79f78fb-f8af-4dee-b4d0-59b6dc9951bb'
};

w3.includeHTML(function () {
    console.log('Run Contacts Page');
    GetArmroboticsPageData(Config.language)
    GetArmroboticsAllEventsPageData(Config.language)
    Config.load = true;
    $('#id_events').addClass('active-nav');
    $('#id_foo_events').addClass('active-footer');
});

$(document).on('click', '.contest', function () {
    localStorage.setItem('uuid', $(this).attr('uuid'));
    var href = location.protocol + "//" + document.domain + '/contests.html';
    window.location.href = href;
})


function GetArmroboticsPageData(leng) {
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + ArmroboticsPageConfig.armrobotics_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_armrobotics_title').html(res.title[leng]);
                $('#id_about_contest').html(res.about_contest.text[leng]);
                res.contests.forEach(function (val) {
                    $('#id_arm_r_contests').append(
                        '<div class="post-item"> ' +
                        '<img src="img/events/arm-robotics-event-post-img-1.jpg" alt=""> ' +
                        '<div> ' +
                        '<h2>' + val.title[leng] + '</h2>' +
                        '<p>' + val.text[leng] + '</p>' +
                        '<p><a class="contest"  uuid="' + val.contest.uuid + '">View all Robotics contests</a></p>' +
                        '</div>' +
                        '</div>'
                    )
                })
            }
        }
    });
}
function GetArmroboticsAllEventsPageData(leng) {
    var img = Config.img;
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + ArmroboticsPageConfig.all_events,
        dataType: 'json',
        success: function (res) {
            if (res) {
                res.events.forEach(function (val) {
                    $('#id_all_events').append(
                        '<li class="open-game">' +
                        '<div class="typlical-img" style="background: url(' + img + val.assets.imgs[0].uuid + ');"></div>' +
                        '<div class="company-logo"><a href="#"><img src="' + img + val.assets.logos[0].uuid + '" alt="Open Game Championship"></a></div>' +
                        '<div class="description">' +
                        '<i class="fa fa-angle-right"></i>' +
                        '<a href="events.html" class="armath-btn join-webinar">Go to event page</a>' +
                        '</div>' +
                        '</li>'
                    )
                })
            }
        }
    });
}