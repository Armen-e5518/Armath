var ContestPageConfig = {

    'contest_page_data': localStorage.getItem('uuid'),

    'all_equipment': Config.api +'6578857e-1c09-475f-92ef-8b394f6a22c1',

};

w3.includeHTML(function () {

    console.log('Run Contest Page');

    GetContestPageData(Config.language)

    Config.load = true;

    $('#id_events').addClass('active-nav');
    $('#id_foo_events').addClass('active-footer');
});


function GetContestPageData(leng) {
    if (ContestPageConfig.contest_page_data) {
        $.ajax({
            type: Config.request_type,
            url: Config.domain + Config.Path + ContestPageConfig.contest_page_data,
            dataType: 'json',
            success: function (res) {
                if (res && res.type == 'contest') {
                    $('#id_contest_title').html(res.title[leng]);
                    $('#id_contest_name').html(res.title[leng]);
                    $('#id_contest_text').html(res.text[leng]);
                    res.jury.forEach(function (val) {
                        $.ajax({
                            type: Config.request_type,
                            url: Config.domain + Config.Path + val.uuid,
                            dataType: 'json',
                            success: function (res1) {
                                if (res1) {
                                    out(res1)
                                    $('#id_jurys').append(
                                        '<div class="jury-member">' +
                                        '<img src="img/jury-members/jury-member-photo.jpg" alt="">' +
                                        '<span class="jury-name">' + res1.name[leng] + '</span>' +
                                        '<em class="jury-position">' + res1.company_name[leng] + '</em>' +
                                        // '<span class="jury-company">AUA</span>' +
                                        '</div>'
                                    )
                                }
                            }
                        });
                    })
                } else {
                    var href = location.protocol + "//" + document.domain + '/event-armrobotics.html';
                    window.location.href = href;
                }
            }
        });
    } else {
        var href = location.protocol + "//" + document.domain + '/event-armrobotics.html';
        window.location.href = href;
    }
}

