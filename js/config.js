var Config = {
    'domain': location.protocol + "//" + document.domain,
    'Path': '/data/Json_data/',
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

