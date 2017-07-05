var ContactsPageConfig = {

    'contacts_page_data': Config.api +'2757a4a0-5d30-4587-a149-3cd2d2980710',


};

w3.includeHTML(function () {


    console.log('Run Contacts Page');

    GetContactsPageData(Config.language)

    Config.load = true;

    $('#id_contacts').addClass('active-nav');
    $('#id_foo_contacts').addClass('active-footer');
});


function GetContactsPageData(leng) {
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + ContactsPageConfig.contacts_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_contacts_title').html(res.title[leng]);
                $('#id_message_title').html(res.send_us_a_message.title[leng]);
                $('#id_first_name').attr('placeholder', res.send_us_a_message.enter_name[leng]);
                $('#id_last_name').attr('placeholder', res.send_us_a_message.enter_last_name[leng]);
                $('#id_user_email').attr('placeholder', res.send_us_a_message.enter_email_address[leng]);
                $('#id_message').attr('placeholder', res.send_us_a_message.enter_message[leng]);

            }
        }
    });
}