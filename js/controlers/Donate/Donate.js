var DonatePageConfig = {

    'donate_page_data': Config.api + 'b6dd08a7-8d8b-448d-9bdf-0e40abcce447',

};

w3.includeHTML(function () {
    console.log('Run Donate Page');
    GetDonatePageData(Config.language,'AMD')
    Config.load = true;
    $('#id_donate').addClass('active-nav');
    $('#id_foo_donate').addClass('active-footer');
});


function GetDonatePageData(leng, price) {
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + DonatePageConfig.donate_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_donate_title').html(res.title[leng]);
                $('#id_uite').html(res.donation_mechanism.donate_to.uite.text[leng]);
                $('#id_armath').html(res.donation_mechanism.donate_to.armath.text[leng]);
                $('#id_payment_option_title').html(res.donation_mechanism.payment_option.text[leng]);
                $('#id_payment_method_title').html(res.donation_mechanism.payment_method.title[leng]);
                $('#id_personal_info_title').html(res.personal_info.title[leng]);
                $('#id_personal_info_first_name').attr('placeholder', res.personal_info.name[leng]);
                $('#id_personal_info_last_name').attr('placeholder', res.personal_info.last_name[leng]);
                $('#id_personal_info_email_name').attr('placeholder', res.personal_info.email_address[leng]);
                $('#id_personal_info_comment').attr('placeholder', res.personal_info.comment[leng]);
                res.donation_mechanism.payment_method.method.forEach(function (val) {
                    $('#id_payment_methods').append(
                        '<label for="' + val.id + '" class="card-type">' +
                        '<input type="radio" name="card-type" id="' + val.id + '">' +
                        '<span class="check-mark"></span>' +
                        '<img src="img/donate/mastercard-icon.jpg" alt="' + val.id + '" title="' + val.id + '">' +
                        '</label>'
                    )
                })
                res.donation_mechanism.payment_option.donation_gifts.forEach(function (val) {
                    $('#id_donation_gifts').append(
                        '<label>' +
                        '<span class="product-preview"><img src="img/donate/donation-product-img-1.jpg" alt=""></span> ' +
                        '<span class="product-title"><input type="checkbox"><em class="check-mark"></em><span>' + val.title[leng] + '</span></span>' +
                        '<span class="product-price">'+val.price[price]+'</span>' +
                        '<span class="product-desc">' + val.text[leng] + '</span>' +
                        '</label>'
                    )
                })
            }
        }
    });
}

