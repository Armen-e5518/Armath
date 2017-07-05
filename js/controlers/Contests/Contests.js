var ContestsPageConfig = {

    'contests_page_data': Config.api + localStorage.getItem('uuid'),
    'all_equipment': Config.api + '6578857e-1c09-475f-92ef-8b394f6a22c1',

};

w3.includeHTML(function () {

    console.log('Run Contest Page');

    GetContestsPageData(Config.language)


    Config.load = true;

    $('#id_events').addClass('active-nav');
    $('#id_foo_events').addClass('active-footer');
});

$(document).on('click', '.contest', function () {
    localStorage.setItem('uuid', $(this).attr('uuid'));
    var href = location.protocol + "//" + document.domain + '/contest.html';
    window.location.href = href;
})

function GetContestsPageData(leng) {
    if (ContestsPageConfig.contests_page_data) {
        $.ajax({
            type: "POST",
            url: Config.domain + Config.Path + ContestsPageConfig.contests_page_data,
            dataType: 'json',
            success: function (res) {
                if (res && res.type == 'event') {
                    $('#id_contests_title').html(res.title[leng]);
                    res.contests.forEach(function (val) {
                        $('#id_contests').append(
                            '<div class="jury-member">' +
                            '<img src="img/jury-members/jury-member-photo.jpg" alt="">' +
                            '<span class="jury-name">' + val.title[leng] + '</span>' +
                            '<em class="jury-position">' + val.text[leng] + '</em>' +
                            '<a class="jury-company contest"  uuid="' + val.contest.uuid + '">View</a>' +
                            '</div>'
                        )
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

