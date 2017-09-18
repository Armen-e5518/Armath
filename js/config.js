var Config = {
    // 'domain': location.protocol + "//" + document.domain,
    'domain': 'https://metax.leviathan.am:7073',
    // 'api': 'get?id=',
    'api': '/',
    // 'Path': '/data/Json_data/',
    // 'Path': '/db/',
    'Path': '',
    // 'img': 'https://metax.leviathan.am:7073/db/get?id=',
    'img': 'https://metax.leviathan.am:7073/',
    'language': 'en-us',
    'load': false,
    'request_type': 'GET',
    'SpecificNames': {},
    'order_url': 'https://metax.leviathan.am:7073/payment/arca/status?orderId=',
    'contact_url': 'https://metax.leviathan.am:7073/sendemail',
    'title_url': 'fca58498-436c-4bed-b71c-8f34684ab9b5',
    'images' : "9704ecd1-95dc-4e95-b757-a3075fa1d0f8"
};

GetSpecificNames();

if (localStorage.getItem('language')) {
    Config.language = localStorage.getItem('language');
}

function GetSpecificNames() {
    $.ajax({
        type: Config.request_type,
        url: 'leng.json',
        dataType: 'json',
        success: function (res) {
            if (res) {
                Config.SpecificNames = res;
            }
        }
    });
}

function NumberFormat(num) {
    return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

function PageLoad() {
    $('#id_body').show();
    $('#id_loader').hide()
}

String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};

function UrlReplace(url) {
    url = url.replaceAll('/', '-')
    url = url.replaceAll('\\', '-')
    url = url.replaceAll('"', '-')
    return url.replaceAll(' ', '-')
}


