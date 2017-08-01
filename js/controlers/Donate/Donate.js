var DonatePageConfig = {

    'donate_page_data': Config.api + 'b6dd08a7-8d8b-448d-9bdf-0e40abcce447',
    'all_schools_in_states': Config.api + 'ff3d7ca6-bf0d-49b5-a39d-fa97cc8769f1',

};

w3.includeHTML(function () {
    console.log('Run Donate Page');
    GetDonatePageData(Config.language, 'AMD')
    GetAllSchoolsInStates(Config.language)
    Config.load = true;
    $('#id_donate').addClass('active-nav');
    $('#id_foo_donate').addClass('active-footer');
    $('#id_states').change(function () {
        var uuid = $(this).val();
        GetCityOrVillage(Config.language, uuid);
        GetSchool(Config.language, uuid)
    })
});


function GetDonatePageData(leng, price) {
    $.ajax({
        type: Config.request_type,
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
                        '<img src="' + Config.img + val.assets.logos[0].uuid + '" alt="' + val.id + '" title="' + val.id + '">' +
                        '</label>'
                    )
                });
                res.donation_mechanism.payment_option.donation_gifts.forEach(function (val) {
                    $('#id_donation_gifts').append(
                        '<label>' +
                        '<span class="product-preview"><img src="' + Config.img + val.assets.imgs[0].uuid + '" alt=""></span> ' +
                        '<span class="product-title"><input type="checkbox"><em class="check-mark"></em><span>' + val.title[leng] + '</span></span>' +
                        '<span class="product-price">' + val.price[price] + '</span>' +
                        '<span class="product-desc">' + val.text[leng] + '</span>' +
                        '</label>'
                    )
                });
                res.donation_mechanism.payment_option.duration_in_months.forEach(function (val, index) {
                    $('#id_duration_in_months').append(
                        '<label for="' + index + '">' +
                        '<input name="duration_in_months" type="radio" id="' + index + '">' +
                        '<span class="check-mark"></span>' + val.text[leng] +
                        '<i class="fa fa-question-circle-o" title="Tooltip"></i>' +
                        '</label>'
                    )
                })
            }
        }
    });
}

function GetAllSchoolsInStates(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + DonatePageConfig.all_schools_in_states,
        dataType: 'json',
        success: function (res) {
            if (res) {
                res.all_schools_in_states.forEach(function (val) {
                    $('#id_states').append(
                        '<option value="' + val.schools_in_state.uuid + '">' + val.state_name[leng] + '</option>'
                    )
                })
            }
        }
    });
}
function GetCityOrVillage(leng, uuid) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + Config.api + uuid,
        dataType: 'json',
        success: function (res) {
            if (res) {
                res.all_schools.forEach(function (val1) {
                    val1.schools.forEach(function (val2) {
                        $.ajax({
                            type: Config.request_type,
                            url: Config.domain + Config.Path + Config.api + val2.uuid,
                            dataType: 'json',
                            success: function (res1) {
                                if (res1) {
                                    var data = res1.city[leng];
                                    if (!data || res1.city['en-us'] == 'Yerevan') {
                                        data = res1.village[leng];
                                    }
                                    if (!data) {
                                        data = res1.region[leng];
                                    }
                                    $('#id_city_village').html('');
                                    $('#id_city_village').append(
                                        '<option value="' + val2.uuid + '">' + data + '</option>'
                                    )
                                }
                            }
                        });
                    })
                })
            }
        }
    });
}
function GetSchool(leng, uuid) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + Config.api + uuid,
        dataType: 'json',
        success: function (res) {
            if (res) {
                res.all_schools.forEach(function (val1) {
                    val1.schools.forEach(function (val2) {
                        $.ajax({
                            type: Config.request_type,
                            url: Config.domain + Config.Path + Config.api + val2.uuid,
                            dataType: 'json',
                            success: function (res1) {
                                if (res1) {
                                    $('#id_school').html('');
                                    $('#id_school').append(
                                        '<option value="' + val2.uuid + '">' + res1.name[leng] + '</option>'
                                    )
                                }
                            }
                        });
                    })
                })
            }
        }
    });
}