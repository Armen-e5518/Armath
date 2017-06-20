var ContactsConfig = {
    'contact_data': '7f38cdb9-cf98-4e0b-b4b3-3cd38ff7bd1b',
};

var RunContacts = setInterval(function () {
    if (Config.load) {
        console.log('Run Contacts');
        GetContactsData(Config.language)
        clearInterval(RunContacts)
    }
}, 500);

function GetContactsData(leng) {
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + ContactsConfig.contact_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_street').html(res.street[leng]);
                $('#id_country').html(res.country[leng]);
                $('#id_city').html(res.city[leng]);
                $('#id_building').html(res.building);
                $('#id_floor').html(res.floor);
                $('#id_post_code').html(res.post_code);
                $('#id_phone_num').html(res.post_code);
                $('#id_mobile_num').html(res.mobile_num);
                $('#id_email_address').html(res.email_address);

                $('#id_c_street').html(res.street[leng]);
                $('#id_c_country').html(res.country[leng]);
                $('#id_c_city').html(res.city[leng]);
                $('#id_c_building').html(res.building);
                $('#id_c_floor').html(res.floor);
                $('#id_c_post_code').html(res.post_code);
                $('#id_c_phone_num').html(res.post_code);
                $('#id_c_mobile_num').html(res.mobile_num);
                $('#id_c_email_address').html(res.email_address);
                $('#id_c_official_site_url').html(res.official_site_url);
                // $('#id_official_site_url').html(res.official_site_url);
            }
        }
    });
}