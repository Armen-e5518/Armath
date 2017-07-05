var PartnersPageConfig = {
    'partners_page_data': Config.api +'c74c228d-ab61-4237-b49d-440c315d8d6b',
    'count': 5,
};

var partners_list = [],
    count_index = 0,
    start = 4;

w3.includeHTML(function () {
    console.log('Run Partners Page');
    GetPartnersPageData(Config.language)
    Config.load = true;
    $('#id_partners').addClass('active-nav');
    $('#id_foo_partners').addClass('active-footer');
});

$('#id_load_more').click(function () {
    for (var i = start; i < start + PartnersPageConfig.count; i++) {
        if (partners_list[i]) {
            $('#id_all_partners').append(partners_list[i])
        } else {
            $('#id_load_more').hide();
        }
    }
    start += PartnersPageConfig.count;
});

function GetPartnersPageData(leng) {
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + PartnersPageConfig.partners_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_tartners_title').html(res.title[leng]);
                $('#id_tartners_text').html(res.text[leng]);
                $('#id_join_armath').html(res.join_armath.title[leng]);
                $('#id_support_armath').html(res.support_armath.title[leng]);
                res.partners.forEach(function (val) {
                    $.ajax({
                        type: "POST",
                        url: Config.domain + Config.Path + val.uuid,
                        dataType: 'json',
                        success: function (res1) {
                            if (res1) {
                                if (count_index < PartnersPageConfig.count) {
                                    $('#id_all_partners').append(
                                        '<div class="post-item">' +
                                        ' <img src="img/partners/ucom-logo.png" alt="">' +
                                        '<div>' +
                                        '<h2>' + res1.name[leng] + '</h2>' +
                                        '<p>' + res1.text[leng] + '<br><a href="' + res1.official_site_url + '">Visit website</a></p>' +
                                        '<p><strong>Number of established Armath Labs:</strong> 32<br><a href="#">View list of Labs</a></p>' +
                                        '</div>' +
                                        '</div>'
                                    );
                                    count_index++;
                                } else {
                                    partners_list.push(
                                        '<div class="post-item">' +
                                        ' <img src="img/partners/ucom-logo.png" alt="">' +
                                        '<div>' +
                                        '<h2>' + res1.name[leng] + '</h2>' +
                                        '<p>' + res1.text[leng] + '<br><a href="' + res1.official_site_url + '">Visit website</a></p>' +
                                        '<p><strong>Number of established Armath Labs:</strong> 32<br><a href="#">View list of Labs</a></p>' +
                                        '</div>' +
                                        '</div>'
                                    )
                                }
                            }
                        }
                    });
                })
            }
        }
    });
}
