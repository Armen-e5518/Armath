var Config = {
    // 'domain': location.protocol + "//" + document.domain,
    'domain': 'http://metax.leviathan.am:7071',
    'api': 'get?id=',
    // 'Path': '/data/Json_data/',
    'Path': '/db/',
    'img': 'http://metax.leviathan.am:7071/db/get?id=',
    'language': 'en-us',
    'load': false,
    'request_type': 'GET',
    'SpecificNames': {},
    'order_url': 'http://metax.leviathan.am:7071/payment/arca/status?orderId='
};

GetSpecificNames();

if (localStorage.getItem('language')) {
    Config.language = localStorage.getItem('language');
}

function GetSpecificNames() {
    $.ajax({
        type: Config.request_type,
        url: '/leng.json',
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