var HomeConfig = {

    'home_data': 'c120e3b5-a8d0-4770-842d-13cfad2a960d',

    'slide_swiper': 'c120e3b5-a8d0-4770-842d-13cfad2a960d',

    'labs_map': '33c639d4-b4f2-47d1-a372-a5a3af5b7a15',

};

w3.includeHTML(function () {


    console.log('Run Home');

    GetHomeData(Config.language);

    GetSliderData(Config.language);

    GetLabsMapData(Config.language);

    Config.load = true;

    $('#id_home').addClass('active-nav');
    $('#id_foo_home').addClass('active-footer');
});


function GetHomeData(leng) {
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + HomeConfig.home_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_events_title').html(res.events.title[leng]);
                $('#id_events_text').html(res.events.text[leng]);
                $('#id_join_armath').html(res.join_armath.title[leng]);
                $('#id_gallery_title').html(res.gallery.title[leng]);
                $('#id_support_armath_title').html(res.support_armath.title[leng]);
            }
        }
    });
}

function GetLabsMapData(leng) {
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + HomeConfig.labs_map,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_labs_map_title').html(res.title[leng]);
            }
        }
    });
}

function GetSliderData(leng) {
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + HomeConfig.slide_swiper,
        dataType: 'json',
        success: function (res) {
            if (res) {
                res.slide_swiper.slides.forEach(function (val) {
                    $('#id_slider').append(
                        '<div class="swiper-slide" style="background:url(img/slide/slide.jpg);">' +
                        '<div class="slide-info"> ' +
                        '<p class="slide-title">' + val.title[leng] + '</p>' +
                        '<p class="slide-text">' + val.text[leng] + '</p>' +
                        '<a href="#" class="more-info armath-btn">Learn More</a>' +
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

