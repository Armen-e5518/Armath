var ContestPageConfig = {
    'contest_page_data': '',
    'all_equipment': Config.api + '6578857e-1c09-475f-92ef-8b394f6a22c1',
    'all_events': Config.api + 'b79f78fb-f8af-4dee-b4d0-59b6dc9951bb',
    'robotics_contest': Config.api + '131797ed-65ac-4414-b662-f43457cfe0a9',
    'event': Config.api + 'bfec58de-1eb9-4254-b067-72661ea08ed9'
};
var hash = (window.location.hash.substr(1)) ? window.location.hash.substr(1) : false;
console.log(hash);

w3.includeHTML(function () {
    console.log('Run Contest Page');
    if (hash) {
        GetUuidByHash(Config.language)
    }
});

function Run() {
    GetContestPageData(Config.language);
    GetAllEvents(Config.language);
    Config.load = true;
    setTimeout(function () {
        $('#id_other_events').html(Config.SpecificNames.other_events[Config.language]);
        $('#id_sponsorship span').html(Config.SpecificNames.sponsorship_package[Config.language]);
        $('#id_rules span').html(Config.SpecificNames.rules[Config.language]);
        $('#id_history_text').html(Config.SpecificNames.history[Config.language]);
        $('#id_jury_title').html(Config.SpecificNames.jury[Config.language]);
    }, 200)
    $('#id_events').addClass('active-nav');
    $('#id_foo_events').addClass('active-footer');
}

$(document).on('click', '.contest', function () {
    var h = $(this).attr('href');
    var href = location.protocol + "//" + document.domain + '/' + h;
    window.location.href = href;
    location.reload();
});

// $(document).on('click', '.history', function () {
//     localStorage.setItem('his-uuid', $(this).attr('his-uuid'));
//     var href = location.protocol + "//" + document.domain + '/history.html';
//     window.location.href = href;
// });

function GetContestPageData(leng) {
    if (ContestPageConfig.contest_page_data) {
        $.ajax({
            type: Config.request_type,
            url: Config.domain + Config.Path + Config.api + ContestPageConfig.contest_page_data,
            dataType: 'json',
            success: function (res) {
                PageLoad();
                if (res && res.type == 'contest') {
                    $('#id_contest_title').html(res.title[leng]);
                    $('#id_contest_name').html(res.title[leng]);
                    $('#id_contest_text').html(res.text[leng]);
                    if (res.assets.imgs.length > 0) {
                        $('#id_cover_img').attr('src', Config.img + res.assets.imgs[0].uuid);
                    } else {
                        $('#id_cover_img').hide();
                    }

                    if (res.sponsorship_package.uuid) {
                        $('#id_sponsorship').attr('href', Config.img + res.sponsorship_package.uuid);
                    } else {
                        $('#id_sponsorship').hide();
                    }
                    if (res.rules.uuid) {
                        $('#id_rules').attr('href', Config.img + res.rules.uuid);
                    } else {
                        $('#id_rules').hide();
                    }
                    res.jury.forEach(function (val) {
                        $.ajax({
                            type: Config.request_type,
                            url: Config.domain + Config.Path + Config.api + val.uuid,
                            dataType: 'json',
                            success: function (res1) {
                                if (res1) {
                                    $('#id_jurys').append(
                                        '<div class="jury-member">' +
                                        '<img src="' + Config.img + res1.assets.imgs[0].uuid + '" alt="">' +
                                        '<span class="jury-name">' + res1.name[leng] + '</span>' +
                                        '<em class="jury-position">' + res1.company_name[leng] + '</em>' +
                                        // '<span class="jury-company">AUA</span>' +
                                        '</div>'
                                    )
                                }
                            }
                        });
                    });
                    res.history.forEach(function (val, index) {
                        console.log(val.title['en-us'])
                        $('#id_history').append('<li class="item_' + index + '"></li>')
                        $.ajax({
                            type: Config.request_type,
                            url: Config.domain + Config.Path + Config.api + val.uuid,
                            dataType: 'json',
                            success: function (res2) {
                                if (res2) {
                                    $('#id_history li.item_' + index).append(
                                        '<a class="history" href="history.html#' + UrlReplace(val.title['en-us']) + '" his-uuid="' + val.uuid + '">' + res2.date + '</a>'
                                    )
                                }
                            }
                        });
                    })
                } else if (res && res.type == 'camp') {
                    $('#id_contest_title').html(res.title[leng]);
                    $('#id_contest_name').html(res.title[leng]);
                    $('#id_contest_text').html(res.text[leng]);
                    if (res.sponsorship_package.uuid) {
                        $('#id_sponsorship').attr('href', Config.img + res.sponsorship_package.uuid);
                    } else {
                        $('#id_sponsorship').hide();
                    }
                    if (res.assets.imgs.length > 0) {
                        $('#id_cover_img').attr('src', Config.img + res.assets.imgs[0].uuid);
                    } else {
                        $('#id_cover_img').hide();
                    }
                    $('#id_rules').hide();
                    $('#id_jurys').hide();
                    $('#id_jury_title').hide();
                    res.history.forEach(function (val) {
                        $.ajax({
                            type: Config.request_type,
                            url: Config.domain + Config.Path + Config.api + val.uuid,
                            dataType: 'json',
                            success: function (res2) {
                                if (res2) {
                                    $('#id_history').append(
                                        '<li><a class="history" href="history.html#' + UrlReplace(val.title['en-us']) + '" his-uuid="' + val.uuid + '">' + res2.date + '</a></li>'
                                    )
                                }
                            }
                        });
                    })
                } else if (res && res.type == 'event') {
                    var href = location.protocol + "//" + document.domain + '/event-armrobotics.html';
                    window.location.href = href;
                } else {
                    // out('contest no')
                    var href = location.protocol + "//" + document.domain + '/events.html';
                    window.location.href = href;
                }
            }
        });
    } else {
        // out('contest_page_data no')
        var href = location.protocol + "//" + document.domain + '/events.html';
        window.location.href = href;
    }
}

function GetAllEvents(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + ContestPageConfig.all_events,
        dataType: 'json',
        success: function (res) {
            if (res) {
                res.events.forEach(function (val, index) {
                    var href = (index == 0) ? 'event-armrobotics.html' : "contest.html#" + val.title['en-us'];
                    $('#id_all_events').append(
                        '<li class="open-game">' +
                        '<div class="typlical-img" style="background: URL(' + Config.img + val.assets.imgs[0].uuid + ')"></div>' +
                        '<div class="company-logo">' +
                        '<a href="#">' +
                        '<h2>' + val.title[leng] + '</h2>' +
                        '</a>' +
                        '</div>' +
                        '<div class="description">' +
                        '<a href="' + href + '" uuid= ' + val.uuid + '" class="contest armath-btn join-webinar"><i class="fa fa-angle-right"></i>' + Config.SpecificNames.go_to_event_page[leng] + '</a>' +
                        '</div>' +
                        '</li>'
                    )
                })
            }
        }
    });
}

function GetUuidByHash(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + ContestPageConfig.all_events,
        dataType: 'json',
        success: function (res) {
            if (res) {
                res.events.forEach(function (val, index) {
                    if (val.title['en-us'] == hash) {
                        ContestPageConfig.contest_page_data = val.uuid;
                        console.log(val.uuid)
                        Run()
                    } else {
                        if (res.events.length - 1 == index && !ContestPageConfig.contest_page_data) {
                            $.ajax({
                                type: Config.request_type,
                                url: Config.domain + Config.Path + ContestPageConfig.robotics_contest,
                                dataType: 'json',
                                success: function (res) {
                                    if (res) {
                                        res.contests.forEach(function (val, index) {
                                            if (val.title['en-us'] == hash) {
                                                ContestPageConfig.contest_page_data = val.contest.uuid;
                                                console.log(val.uuid)
                                                Run()
                                            } else {
                                                if (res.contests.length - 1 == index && !ContestPageConfig.contest_page_data) {
                                                    $.ajax({
                                                        type: Config.request_type,
                                                        url: Config.domain + Config.Path + ContestPageConfig.event,
                                                        dataType: 'json',
                                                        success: function (res) {
                                                            if (res) {
                                                                res.contests.forEach(function (val, index) {
                                                                    if (val.title['en-us'] == hash) {
                                                                        ContestPageConfig.contest_page_data = val.contest.uuid;
                                                                        console.log(val.uuid)
                                                                        Run()
                                                                    } else {
                                                                        if (res.contests.length - 1 == index && !ContestPageConfig.contest_page_data) {
                                                                            var href = location.protocol + "//" + document.domain + '/events.html';
                                                                            window.location.href = href;
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        })
                                    }
                                }
                            });
                        }
                    }
                })
            }
        }
    });
}