var HeaderConfig = {
    'header_data': Config.api + '9cb53795-fbe8-48b4-b9f8-dd988411d089',
    'navigation_items': Config.api + '13cfeaea-8b63-43d9-a92a-89c698354280',
    'social_media': Config.api + 'c9d5cce6-0184-4865-bfba-eca09534ded7',
};

var RunHeader = setInterval(function () {
    if (Config.load) {
        console.log('Run Header');
        GetNavigationData(Config.language);
        GetHeaderData(Config.language);
        GetSocialMmedia(Config.language);
        GetCommonText(Config.language);
        clearInterval(RunHeader)
    }
}, 500);

function GetNavigationData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + HeaderConfig.navigation_items,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_home').html(res.home.name[leng]);
                $('#id_about').html(res.about.name[leng]);
                $('#id_labs').html(res.armath_labs.name[leng]);
                $('#id_online_resources').html(res.online_resources.name[leng]);
                $('#id_events').html(res.events.name[leng]);
                $('#id_partners').html(res.partners.name[leng]);
                $('#id_gallery').html(res.gallery.name[leng]);
                $('#id_contacts').html(res.contacts.name[leng]);
                $('#id_donate').html(res.donate.name[leng]);

                $('#id_foo_home').html(res.home.name[leng]);
                $('#id_foo_about').html(res.about.name[leng]);
                $('#id_foo_labs').html(res.armath_labs.name[leng]);
                $('#id_foo_online_resources').html(res.online_resources.name[leng]);
                $('#id_foo_events').html(res.events.name[leng]);
                $('#id_foo_partners').html(res.partners.name[leng]);
                $('#id_foo_gallery').html(res.gallery.name[leng]);
                $('#id_foo_contacts').html(res.contacts.name[leng]);
                $('#id_foo_donate').html(res.donate.name[leng]);
            }
        }
    });
}

function GetHeaderData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + HeaderConfig.header_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_header_logo').css('background-image', 'URL(' + Config.img + res.assets.logos[0].uuid + ')');

                // $('#id_search').attr('placeholder', res.search_item.text[leng]);
                $('#id_login_text').html(res.login_item.text[leng]);
                res.languages.forEach(function (val) {
                    $('#id_languages').append('<li><a data-id="' + val.id + '" href="#">' + val.name + '</a></li>')
                });
                SetLanguageInHeader()
            }
        }
    });
}

function SetLanguageInHeader() {
    var Leng = $('#id_languages a[data-id="' + Config.language + '"]').html();
    $('#lang .lang').html(Leng);
    var leg_class = (Leng == 'EN') ? 'language_en' : 'language_am';
    $('body').removeClass('language_en').removeClass('language_am').addClass(leg_class);

}

function GetSocialMmedia(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + HeaderConfig.social_media,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_head_facebook').attr('href', res.facebook.url);
                $('#id_head_youtube').attr('href', res.youtube.url);
                $('#id_head_twitter').attr('href', res.twitter.url);

                $('#id_foo_facebook').attr('href', res.facebook.url);
                $('#id_foo_youtube').attr('href', res.youtube.url);
                $('#id_foo_twitter').attr('href', res.twitter.url);
            }
        }
    });
}

function GetCommonText(leng) {
    $('#id_join_armath span').html(Config.SpecificNames.join_armath[leng])
    $('#id_support_armath span').html(Config.SpecificNames.support_armath[leng])
    $('#id_video_title').html(Config.SpecificNames.videos[leng])
    $('#id_games_title').html(Config.SpecificNames.games[leng])
    $('#id_load_more').html(Config.SpecificNames.load_more[leng])
    $('#id_agenda span').html(Config.SpecificNames.agenda[leng])
    $('#id_donate_text').html(Config.SpecificNames.donate[leng])
    $('#id_our_address').html(Config.SpecificNames.our_address[leng])
    $('#id_send').html(Config.SpecificNames.send[leng])
    $('.class_more').html(Config.SpecificNames.more[leng])
}