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
    setTimeout(function () {
        $('#id_donate_now').html(Config.SpecificNames.donate_now[Config.language]);
    }, 200)
    $('#id_home').addClass('active-nav');
    $('#id_foo_home').addClass('active-footer');
    $(document).on('click', '.news-href', function () {
        localStorage.setItem('news-uuid', $(this).attr('news-uuid'));
        var href = location.protocol + "//" + document.domain + '/news.html';
        window.location.href = href;
    })
});

function GetHomeData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + HomeConfig.home_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_join_armath').html(res.join_armath.title[leng]);
                $('#id_or_title').html(res.online_resources.title[leng]);
                $('#id_gallery_title').html(res.gallery.title[leng]);
                $('#id_support_armath_title').html(res.support_armath.title[leng]);
                // $('#id_events_image').css('background', 'URL(' + Config.img + res.events.assets.imgs[0].uuid + ')');
                $('#id_galley_image').css('background', 'URL(' + Config.img + res.gallery.assets.imgs[0].uuid + ')');
                $('#id_or_img').css('background', 'URL(' + Config.img + res.online_resources.assets.imgs[0].uuid + ')');
                $('#id_join_armath_img').css('background', 'URL(' + Config.img + res.join_armath.assets.imgs[0].uuid + ')');
                res.events.assets.imgs.forEach(function (val) {
                    $('#id_events_slider').append(
                        '<div class="swiper-slide" style="background:url(' + Config.img + val.uuid + ');">' +
                        '<h1 class="events-title">' + res.events.title[leng] + '</h1>' +
                        '<div class="description">' +
                        '<a href="events.html" class="armath-btn join-webinar">' + Config.SpecificNames.more[Config.language] + '</a>' +
                        '</div>' +
                        '</div>'
                    )
                });
                var swiper2 = new Swiper('.featured-project', {
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
                        '<a href="about.html" class="more-info armath-btn">' + Config.SpecificNames.more[Config.language] + '</a>' +
                        '</div>' +
                        '</div>'
                    )
                });
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
                                $('#id_lastest_news_lists').append(
                                    '<div class="stories-info">' +
                                    '<div class="story-img">' +
                                    '<a news-uuid = "' + val.uuid + '" class="news-href"  ><img src="' + Config.img + res1.assets.imgs[0].uuid + '" alt=""></a>' +
                                    '</div>' +
                                    '<div class="story-body">' +
                                    '<h4><a news-uuid = "' + val.uuid + '" class="news-href" ><span class="news-date"></span> ' + res1.title[leng] + '</a></h4>' +
                                    '<p>' + res1.publication_date + ' </p>' +
                                    '<p class="newa-text">' + res1.text[leng] + '</p>' +
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