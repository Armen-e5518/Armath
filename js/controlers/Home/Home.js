var HomeConfig = {
    'home_data': Config.api + 'c120e3b5-a8d0-4770-842d-13cfad2a960d',
    'slide_swiper': Config.api + 'c120e3b5-a8d0-4770-842d-13cfad2a960d',
    'labs_map': Config.api + '33c639d4-b4f2-47d1-a372-a5a3af5b7a15',
    'latest_news': Config.api + 'fcc90652-9e5c-4035-98c3-aff4d36da2ed',
};

w3.includeHTML(function () {
    console.log('Run Home');
    GetHomeData(Config.language);
    GetSliderData(Config.language);
    GetLabsMapData(Config.language);
    GetLatestNewsData(Config.language);
    Config.load = true;
    $('#id_home').addClass('active-nav');
    $('#id_foo_home').addClass('active-footer');
});

function GetHomeData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + HomeConfig.home_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                // $('#id_events_title').html(res.events.title[leng]);
                // $('#id_events_text').html(res.events.text[leng]);
                $('#id_join_armath').html(res.join_armath.title[leng]);
                $('#id_gallery_title').html(res.gallery.title[leng]);
                $('#id_support_armath_title').html(res.support_armath.title[leng]);
                $('#id_events_image').css('background', 'URL(' + Config.img + res.events.assets.imgs[0].uuid + ')');
                $('#id_galley_image').css('background', 'URL(' + Config.img + res.gallery.assets.imgs[0].uuid + ')');
            }
        }
    });
}

function GetLabsMapData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + HomeConfig.labs_map,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_labs_map_title').html(res.title[leng]);
                $('#id_labs_map_img').css('background', 'URL(' + Config.img + res.assets.imgs[0].uuid + ')');
            }
        }
    });
}

function GetSliderData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + HomeConfig.slide_swiper,
        dataType: 'json',
        success: function (res) {
            if (res) {
                res.slide_swiper.slides.forEach(function (val) {
                    $('#id_slider').append(
                        '<div class="swiper-slide" style="background:url(' + Config.img + val.assets.imgs[0].uuid + ');">' +
                        '<div class="slide-info"> ' +
                        '<p class="slide-title">' + val.title[leng] + '</p>' +
                        '<p class="slide-text">' + val.text[leng] + '</p>' +
                        '<a href="about.html" class="more-info armath-btn">Learn More</a>' +
                        '</div>' +
                        '</div>'
                    )
                })
                var swiper = new Swiper('.header-slide', {
                    pagination: '.swiper-pagination',
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    slidesPerView: 1,
                    paginationClickable: true,
                    loop: true,
                    speed: 400,
                    autoplay: 3000
                });
            }
        }
    });
}

function GetLatestNewsData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + HomeConfig.latest_news,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_lastest_news_title').html(res.title[leng]);
                res.news_items.forEach(function (val) {
                    $.ajax({
                        type: Config.request_type,
                        url: Config.domain + Config.Path + Config.api + val.uuid,
                        dataType: 'json',
                        success: function (res1) {
                            if (res1) {
                                $('#id_lastest_news_title').append(
                                    '<div class="stories-info">' +
                                    '<div class="story-img">' +
                                    '<a href="#"><img src="' + Config.img + res1.assets.imgs[0].uuid + '" alt=""></a>' +
                                    '</div>' +
                                    '<div class="story-body">' +
                                    '<h4><a href="#"><span class="news-date">' + res1.timestamp + '</span> ' + res1.title[leng] + '</a></h4>' +
                                    '<p>' + res1.publication_date + ' </p>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }
                        }
                    });
                })
            }
        }
    });
}