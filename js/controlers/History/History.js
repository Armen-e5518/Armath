var HistoryPageConfig = {
    'history_page_data': Config.api + localStorage.getItem('his-uuid'),

};

var images_list = [],
    default_count = 6,
    start = 0;

w3.includeHTML(function () {
    console.log('Run History Page');
    GetHistoryPageData(Config.language)
    Config.load = true;
    $('#id_events').addClass('active-nav');
    $('#id_foo_events').addClass('active-footer');
});

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
        url: Config.domain + Config.Path + HistoryPageConfig.history_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_history_title').html(res.title[leng]);
                $('#id_history_text').html(res.text[leng]);
                $('#id_history_gallery_title').html(res.gallery.title[leng]);
                $('#id_history_gallery_text').html(res.gallery.text[leng]);
                res.gallery.assets.imgs.forEach(function (val, index) {
                    if (index < default_count) {
                        if(res.gallery.assets.imgs.length == 1){
                            $('#id_images').addClass('one-image')
                        }
                        $('#id_images').append(
                            '<a class="gallery_item" >' +
                            '<img src="' + Config.img + val.uuid + '" alt="">' +
                            // '<span>Events_projects<em>view</em></span>' +
                            // '<small>Firstname LastName</small>' +
                            '</a>'
                        )
                    } else {
                        $('#id_load_more').show();
                        images_list.push(
                            '<a class="gallery_item" >' +
                            '<img src="' + Config.img + val.uuid + '" alt="">' +
                            // '<span>Events_projects<em>view</em></span>' +
                            // '<small>Firstname LastName</small>' +
                            '</a>'
                        )
                    }
                });
                if (res.type == 'camp_history') {
                    $('#id_agenda').show().attr('href', Config.img + res.agenda.uuid);
                    if (res.gallery.assets.videos.length > 0) {
                        // res.gallery.assets.videos.forEach(function (val) {
                        //     $('#id_images').append(
                        //         '<a class="gallery_item" >' +
                        //         '<video width="100%" height="100%" controls>' +
                        //         '<source src="' + Config.img + val.uuid + '" type="video/mp4">' +
                        //         '</video>' +
                        //         '<span>Events_projects<em>view</em></span>' +
                        //         '<small>Firstname LastName</small>' +
                        //         '</a>'
                        //     )
                        // })
                    }

                } else {
                    console.log(res.best_games.length)
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
            }
        }
    });
}

function GetImages(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + Config.api + uuid,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_images').html('');
                res.items[index].assets.imgs.forEach(function (val, index) {
                    $('#id_images').append('<a class="" href="' + Config.img + val.uuid + '"  data-lightbox="example-1" data-id="' + index + '"><img src="' + Config.img + val.uuid + '" alt=""></a>');
                })
            }
        }
    });
}