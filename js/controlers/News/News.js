var NewsPageConfig = {
    'news_page_data': '',
    'latest_news': 'fcc90652-9e5c-4035-98c3-aff4d36da2ed',
};

var hash = (window.location.hash.substr(1)) ? window.location.hash.substr(1) : false;
console.log(hash);

w3.includeHTML(function () {
    console.log('Run News Page');
    if (hash) {
        GetUuidByHash(Config.language)
    }
});

function Run() {
    GetNewsPageData(Config.language)
    Config.load = true;
    $('#id_home').addClass('active-nav');
    $('#id_foo_home').addClass('active-footer');
}

function GetNewsPageData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + Config.api + NewsPageConfig.news_page_data,
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
function GetUuidByHash(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + Config.api + NewsPageConfig.latest_news,
        dataType: 'json',
        success: function (res) {
            if (res) {
                res.news_items.forEach(function (val, index) {
                    if (hash == UrlReplace(val.title['en-us'])) {
                        NewsPageConfig.news_page_data = val.uuid;
                        Run();
                    } else if (res.news_items.length - 1 == index && !NewsPageConfig.news_page_data) {
                        var href = location.protocol + "//" + document.domain;
                        window.location.href = href;
                    }
                })
            }
        }
    })
    ;
}