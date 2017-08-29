var ContactsPageConfig = {
    'contacts_page_data': Config.api + '2757a4a0-5d30-4587-a149-3cd2d2980710',
    'social_media': Config.api + 'c9d5cce6-0184-4865-bfba-eca09534ded7',
};

w3.includeHTML(function () {
    console.log('Run Contacts Page');
    GetContactsPageData(Config.language)
    GetSocialMmedia(Config.language)
    Config.load = true;
    $('#id_contacts').addClass('active-nav');
    $('#id_foo_contacts').addClass('active-footer');
});

function GetContactsPageData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + ContactsPageConfig.contacts_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                var logo = (leng == 'en-us') ? 0 : 1;
                $('#id_contacts_title').html(res.title[leng]);
                $('#id_uite_logo').attr('src', Config.img + res.assets.logos[logo].uuid);
                $('#id_message_title').html(res.send_us_a_message.title[leng]);
                $('#id_first_name').attr('placeholder', res.send_us_a_message.enter_name[leng]);
                $('#id_last_name').attr('placeholder', res.send_us_a_message.enter_last_name[leng]);
                $('#id_user_email').attr('placeholder', res.send_us_a_message.enter_email_address[leng]);
                $('#id_message').attr('placeholder', res.send_us_a_message.enter_message[leng]);
            }
        }
    });
}

function GetSocialMmedia(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + ContactsPageConfig.social_media,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_facebook').attr('href', res.facebook.url);
                $('#id_linkedin').attr('href', res.linkedin.url);
                $('#id_youtube').attr('href', res.youtube.url);
                $('#id_twitter').attr('href', res.twitter.url);
            }
        }
    });
}