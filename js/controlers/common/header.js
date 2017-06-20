var HeaderConfig = {

    'header_data': '9cb53795-fbe8-48b4-b9f8-dd988411d089',

    'navigation_items': '13cfeaea-8b63-43d9-a92a-89c698354280'
};

var RunHeader = setInterval(function () {
    if (Config.load) {
        console.log('Run Header');
        GetNavigationData(Config.language);
        GetHeaderData(Config.language);
        clearInterval(RunHeader)
    }
}, 500);

function GetNavigationData(leng) {
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + HeaderConfig.navigation_items,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_home').html(res.home.name[leng]);
                $('#id_about').html(res.about.name[leng]);
                $('#id_armath_labs').html(res.armath_labs.name[leng]);
                $('#id_online_resources').html(res.e_learning.name[leng]);
                $('#id_events').html(res.events.name[leng]);
                $('#id_partners').html(res.partners.name[leng]);
                $('#id_gallery').html(res.gallery.name[leng]);
                $('#id_contacts').html(res.contacts.name[leng]);
                $('#id_donate').html(res.donate.name[leng]);

                $('#id_foo_home').html(res.home.name[leng]);
                $('#id_foo_about').html(res.about.name[leng]);
                $('#id_foo_armath_labs').html(res.armath_labs.name[leng]);
                $('#id_foo_online_resources').html(res.e_learning.name[leng]);
                $('#id_foo_events').html(res.events.name[leng]);
                $('#id_foo_partners').html(res.partners.name[leng]);
                $('#id_foo_gallery').html(res.gallery.name[leng]);
                $('#id_foo_contacts').html(res.contacts.name[leng]);
                $('#id_foo_donate').html(res.donate.name[leng]);
            }
        }
    });
}

function GetHeaderData(leng) {
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + HeaderConfig.header_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_search').attr('placeholder', res.search_item.text[leng]);
                $('#id_login_text').html(res.login_item.text[leng]);
                res.languages.forEach(function (val) {
                    $('#id_languages').append('<li><a data-id="' + val.id + '" href="#">' + val.name + '</a></li>')
                });
                SetLanguageInHeader()
            }
        }
    });
}

function SetLanguageInHeader() {
    var Leng = $('#id_languages a[data-id="' + Config.language + '"]').html();
    $('#lang .lang').html(Leng)
}