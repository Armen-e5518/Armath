var MapConfig = {
    'map_data': Config.api + '33c639d4-b4f2-47d1-a372-a5a3af5b7a15',
};

var RunMup = setInterval(function () {
    if (Config.load) {
        console.log('Run Map');
        GetMapData(Config.language)
        clearInterval(RunMup)
    }
    $(document).on('click', '#id_map', function () {
        var href = $(this).find('ul').attr('href');
        window.location.href = href;
    })
}, 500);

function GetMapData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + MapConfig.map_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_map').html(
                    '<ul href="' + res.url + '">' +
                    '<li class="labs-map">' +
                    '<div class="typlical-img" style="background: URL(' + Config.img + res.assets.imgs[0].uuid + ')"></div>' +
                    '<div class="description">' +
                    '<h2>' + res.title[leng] + '</h2>' +
                    '</div>' +
                    '</li>' +
                    '</ul>'
                );
            }
        }
    });
}