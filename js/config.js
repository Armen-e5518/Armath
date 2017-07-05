var Config = {
    // 'domain': location.protocol + "//" + document.domain,
    'domain': '',
    'api': 'http://metax.leviathan.am:7071/db/get?id=',
    // 'Path': '/data/Json_data/',
    'Path': '',
    'img': 'data/Json_data/',
    'language': 'en-us',
    'load': false,
};

if (localStorage.getItem('language')) {
    Config.language = localStorage.getItem('language');
}


function out(x) {
    console.log(x)
}

