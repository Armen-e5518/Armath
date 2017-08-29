var PartnersPageConfig = {
    'partners_page_data': Config.api + 'c74c228d-ab61-4237-b49d-440c315d8d6b',
    'all_partners': Config.api + 'c10b3e3d-218d-4371-90a2-b2541af47bad',
    'default_count': 6,
};

var partners_list = [],
    start = 0;

w3.includeHTML(function () {
    console.log('Run Partners Page');
    GetPartnersPageData(Config.language)
    GetAllPartners(Config.language)
    Config.load = true;
    $('#id_partners').addClass('active-nav');
    $('#id_foo_partners').addClass('active-footer');
});

$('#id_load_more').click(function () {
    for (var i = start; i < start + PartnersPageConfig.default_count; i++) {
        if (partners_list[i]) {
            $('#id_all_partners').append(partners_list[i])
        } else {
            $('#id_load_more').hide();
        }
    }
    start += PartnersPageConfig.default_count;
});

function GetPartnersPageData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + PartnersPageConfig.partners_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_tartners_title').html(res.title[leng]);
                $('#id_tartners_text').html(res.text[leng]);
                $('#id_join_armath').html(res.join_armath.title[leng]);
                $('#id_support_armath').html(res.support_armath.title[leng]);
            }
        }
    });
}

function GetAllPartners(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + PartnersPageConfig.all_partners,
        dataType: 'json',
        success: function (res) {
            if (res) {
                res.sponsors.forEach(function (val, index) {
                    if (index <= PartnersPageConfig.default_count) {
                        $('#id_all_partners').append('<div class="block_' + index + '"></div>');
                    }
                    // console.log(index);
                    $.ajax({
                        type: Config.request_type,
                        url: Config.domain + Config.Path + Config.api + val.uuid,
                        dataType: 'json',
                        success: function (res1) {
                            if (res1) {
                                // console.log(index);
                                // console.log(res1);
                                if (index <= PartnersPageConfig.default_count) {
                                    $('#id_all_partners div.block_' + index + '').append(
                                        '<div class="post-item">' +
                                        ' <img src="' + Config.img + res1.assets.logos[0].uuid + '" alt="">' +
                                        '<div>' +
                                        '<h2>' + res1.name[leng] + '</h2>' +
                                        '<p>' + res1.text[leng] + '<br><a href="' + res1.official_site_url + '" target="_blank">' + Config.SpecificNames.visit_website[leng] + '</a></p>' +
                                        '<p>' +
                                        '<strong>' + Config.SpecificNames.number_labs[leng] + ':</strong> ' +
                                        res1.labs.length + '<br>' +
                                        // '<a href="labs.html">View list of Labs</a>' +
                                        '</p>' +
                                        '</div>' +
                                        '</div>'
                                    );
                                } else {
                                    partners_list.push(
                                        '<div class="post-item">' +
                                        ' <img src="' + Config.img + res1.assets.logos[0].uuid + '" alt="">' +
                                        '<div>' +
                                        '<h2>' + res1.name[leng] + '</h2>' +
                                        '<p>' + res1.text[leng] + '<br><a href="' + res1.official_site_url + '" target="_blank">' + Config.SpecificNames.visit_website[leng] + '</a></p>' +
                                        '<p>' +
                                        '<strong>' + Config.SpecificNames.number_labs[leng] + ':</strong> ' +
                                        res1.labs.length + '<br>' +
                                        // '<a href="labs.html">View list of Labs</a>' +
                                        '</p>' +
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