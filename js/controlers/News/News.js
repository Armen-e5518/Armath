var NewsPageConfig = {
    'news_page_data': Config.api + localStorage.getItem('news-uuid'),
};

w3.includeHTML(function () {
    console.log('Run News Page');
    GetNewsPageData(Config.language)
    Config.load = true;
    $('#id_home').addClass('active-nav');
    $('#id_foo_home').addClass('active-footer');
});

function GetNewsPageData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + NewsPageConfig.news_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                PageLoad();
                $('#id_news_title').html(res.title[leng]);
                $('#id_news_text').html(res.text[leng]);
                $('#id_news_date').html(res.publication_date);
                $('#id_news_img').attr('src', Config.img + res.assets.imgs[0].uuid);

            }
        }
    });
}
