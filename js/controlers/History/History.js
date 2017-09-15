var HistoryPageConfig = {
    'history_page_data': ''
};
var hash = (window.location.hash.substr(1)) ? window.location.hash.substr(1) : false;
console.log(hash);

var images_list = [],
    default_count = 6,
    start = 0;

w3.includeHTML(function () {
    console.log('Run History Page');
    if (hash) {
        GetUuidByHash(Config.language)
    }
});

function Run() {
    console.log('Run');
    GetHistoryPageData(Config.language)
    Config.load = true;
    $('#id_events').addClass('active-nav');
    $('#id_foo_events').addClass('active-footer');
}

$(document).on('click', '.history', function () {
    localStorage.setItem('uuid', $(this).attr('his-uuid'));
    var href = location.protocol + "//" + document.domain + '/history.html';
    window.location.href = href;
});

$(document).on('click', '.view', function () {
    var href = $(this).attr('href')
    window.open(href, '_blank');
});

$('#id_load_more').click(function () {
    for (var i = start; i < start + default_count; i++) {
        if (images_list[i]) {
            $('#id_images').append(images_list[i])
        } else {
            $('#id_load_more').hide();
        }
    }
    start += default_count;
});

function GetHistoryPageData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + Config.api + HistoryPageConfig.history_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                PageLoad();
                $('#id_history_title').html(res.title[leng]);
                $('#id_history_text').html(res.text[leng]);
                $('#id_history_gallery_title').html(res.gallery.title[leng]);
                $('#id_history_gallery_text').html(res.gallery.text[leng]);
                res.gallery.assets.imgs.forEach(function (val, index) {
                    if (index < default_count) {
                        if (res.gallery.assets.imgs.length == 1) {
                            $('#id_images').addClass('one-image')
                        }
                        $('#id_images').append(
                            '<a class="gallery_item" data-lightbox="example-1" href="' + Config.img + val.uuid + '"  >' +
                            '<img src="' + Config.img + val.uuid + '" alt="">' +
                            // '<span>Events_projects<em>view</em></span>' +
                            // '<small>Firstname LastName</small>' +
                            '</a>'
                        )
                    } else {
                        $('#id_load_more').show();
                        images_list.push(
                            '<a class="gallery_item" data-lightbox="example-1" href="' + Config.img + val.uuid + '" >' +
                            '<img src="' + Config.img + val.uuid + '" alt="">' +
                            // '<span>Events_projects<em>view</em></span>' +
                            // '<small>Firstname LastName</small>' +
                            '</a>'
                        )
                    }
                });
                if (res.type == 'camp_history') {
                    $('#id_agenda').show().attr('href', Config.img + res.agenda.uuid);
                }
                if (res.hasOwnProperty('best_games')) {
                    if (res.best_games.length > 0) {
                        $('#id_games_title').show();
                        res.best_games.forEach(function (val) {
                            $('#id_games').append(
                                '<a class="gallery_item" >' +
                                '<img src="' + Config.img + val.assets.imgs[0].uuid + '" alt="">' +
                                '<span>' + val.title[leng] + '<em class="view"  href="' + val.url + '" >view</em></span>' +
                                '<small>' + val.creator_name[leng] + '</small>' +
                                '</a>'
                            )
                        })
                    }
                }
                if (res.gallery.assets.hasOwnProperty('videos')) {
                    if (res.gallery.assets.videos.length > 0) {
                        $('#id_video_title').show();
                        res.gallery.assets.videos.forEach(function (val) {
                            var img = (val.hasOwnProperty('cover_img')) ? Config.img + val.cover_img.uuid : "";
                            $('#id_videos').append(
                                '<a class="gallery_item video-item" >' +
                                '<video class="video-js" controls   poster="' + img + '">' +
                                '<source src="' + Config.img + val.uuid + '" type="video/mp4">' +
                                '</video>' +
                                '</a>'
                            )
                        })
                    }
                }
            }
        }
    });
}

function GetUuidByHash(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + Config.api + Config.title_url,
        dataType: 'json',
        success: function (res) {
            if (res) {
                res.history_items.forEach(function (val, index) {
                    if (hash == UrlReplace(val.title['en-us'])) {
                        HistoryPageConfig.history_page_data = val.uuid;
                        Run();
                    } else if (res.history_items.length - 1 == index && !HistoryPageConfig.history_page_data) {
                        var href = location.protocol + "//" + document.domain;
                        window.location.href = href;
                    }
                })
            }
        }
    })
    ;
}