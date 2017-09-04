var ContactsPageConfig = {
    'contacts_page_data': Config.api + '2757a4a0-5d30-4587-a149-3cd2d2980710',
    'social_media': Config.api + 'c9d5cce6-0184-4865-bfba-eca09534ded7',
    'url': 'http://metax.leviathan.am:7071/sendemail'
};

w3.includeHTML(function () {
    console.log('Run Contacts Page');
    GetContactsPageData(Config.language)
    GetSocialMmedia(Config.language)
    Config.load = true;
    $('#id_contacts').addClass('active-nav');
    $('#id_foo_contacts').addClass('active-footer');
    $('#id_send').click(function () {
        $('.e-active').removeClass('e-active');
        Validation();
        setTimeout(function () {
            SendData();
        }, 500)
    });
    $('.form-area').click(function () {
        // $('.e-active').removeClass('e-active');
        // Validation();
    })
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

function SendData() {
    if ($('.e-active').length == 0 && ContactsPageConfig.url) {
        var data = {};
        data.firstname = $('#id_first_name').val();
        data.lastname = $('#id_last_name').val();
        data.email = $('#id_user_email').val();
        data.message = $('#id_message').val();
        $.ajax({
            type: "POST",
            url: ContactsPageConfig.url,
            data: data,
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res) {
                    if(res.success == 1){
                        $('#id_thanks').show();
                        $('.contact-us').hide();
                    }else {
                        $('#id_m_error').show();
                        $('.contact-us').hide();
                    }
                }
            }
        })
        ;
    }
}

function Validation() {
    $('.required').each(function () {
        if (!$(this).val()) {
            $(this).addClass('e-active')
        }
    });
    if (!validateEmail($('#id_user_email').val())) {
        $('#id_user_email').addClass('e-active')
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}