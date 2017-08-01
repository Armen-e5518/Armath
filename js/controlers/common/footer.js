var FooterConfig = {
    'footer_data': Config.api + '458652d4-2d0c-406b-9ec1-f5f157dbf181',
};

var RunFooter = setInterval(function () {
    if (Config.load) {
        console.log('Run Footer');
        GetFooterData(Config.language)
        clearInterval(RunFooter)
    }
}, 500);

function GetFooterData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + FooterConfig.footer_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_copyright').html(res.copyright.text[leng]);
                $('#id_implementer ').html(res.copyright.implementer[leng]);
                $('#id_date ').html(res.copyright.date);
                $('#id_footer_logo ').attr('src', Config.img + res.assets.logos[0].uuid);
            }
        }
    });
}