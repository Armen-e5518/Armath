var GalleryPageConfig = {
    'gallery_page_data': Config.api + '340f0e68-188c-457a-a5f9-daab80100fe4',
};

w3.includeHTML(function () {
    console.log('Run Gallery Page');
    GetGalleryPageData(Config.language);
    Config.load = true;
    $('#id_gallery').addClass('active-nav');
    $('#id_foo_gallery').addClass('active-footer');
    $(document).on('click', '.gallery_item', function () {
        $('#id_gallery_items li a').removeClass('active');
        $('#id_gallery_items li[data-id="' + $(this).attr('data-id') + '"] a').addClass('active');
        GetImagesByCategory($(this), Config.language)
    })
    $(document).on('click', '.gallery_item_2', function () {
        GetImagesByCategory2($(this), Config.language)
    })
    $(document).on('click', '#id_gallery_items li', function () {
        var uuid = $(this).attr('data-id');
        $('#id_gallery_items li a').removeClass('active');
        $(this).find('a').addClass('active');
        if (uuid) {
            GetImagesByCategory($(this), Config.language)
        } else {
            GetGalleryPageData(Config.language);
        }
    })
});

function GetGalleryPageData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + GalleryPageConfig.gallery_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_gallery_title').html(res.title[leng]);
                $('#id_gallery_items').html('<li><a  class="active">' + Config.SpecificNames.all[leng] + '</a></li>');
                $('#id_images').html('');
                res.gallery_items.forEach(function (val, index) {
                    $('#id_gallery_items').append('<li data-id = "' + val.uuid + '"><a >' + val.title[leng] + '</a></li>');
                    $.ajax({
                        type: Config.request_type,
                        url: Config.domain + Config.Path + Config.api + val.uuid,
                        dataType: 'json',
                        success: function (res1) {
                            if (res1) {
                                $('#id_images').append('<a class="gallery_item" data-id="' + val.uuid + '"><img src="' + Config.img + res1.items[0].assets.imgs[0].uuid + '" alt=""><span>' + res1.title[leng] + '</span></a>');
                            }
                        }
                    });
                })
            }
        }
    });
}

function GetImagesByCategory(ob, leng) {
    var uuid = ob.attr('data-id');
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + Config.api + uuid,
        dataType: 'json',
        success: function (res) {
            if (res) {
                out(res.items.length);
                if (res.items.length == 1) {
                    GetImagesByCategory2(uuid, Config.language, true)
                } else {
                    $('#id_images').html('');
                    res.items.forEach(function (val, index) {
                        $('#id_images').append('<a class="gallery_item_2" data-uuid="' + uuid + '" data-id="' + index + '"><img src="' + Config.img + val.assets.imgs[0].uuid + '" alt=""><span>' + val.title[leng] + '</span></a>');
                    })
                }
            }
        }
    });
}
function GetImagesByCategory2(ob, leng, no_big_data) {
    if (no_big_data) {
        var uuid = ob;
        var index = 0;
    } else {
        var uuid = ob.attr('data-uuid');
        var index = ob.attr('data-id');
    }
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