var DonatePageConfig = {
    'donate_page_data': Config.api + 'b6dd08a7-8d8b-448d-9bdf-0e40abcce447',
    'all_schools_in_states': Config.api + 'ff3d7ca6-bf0d-49b5-a39d-fa97cc8769f1',
};

w3.includeHTML(function () {
    console.log('Run Donate Page');
    GetDonatePageData(Config.language, 'AMD')
    GetStates(Config.language);
    Config.load = true;
    $('#id_donate').addClass('active-nav');
    $('#id_foo_donate').addClass('active-footer');
    $('#id_give_gift').html(Config.SpecificNames.give_gift[Config.language])
    $('#id_amount').attr('placeholder', Config.SpecificNames.enter_amount[Config.language])
    $('#id_states').change(function () {
        var uuid = $(this).val();
        GetRegionsByState(Config.language, uuid)
    })
    $('#id_regions').change(function () {
        var uuid = $(this).val();
        GetSchoolsByRegions(Config.language, uuid)
    })
    $('#id_amount').change(function () {
        $(this).val('')
        $('.product-title input').prop('checked', false)
    })
    $('#id_amount').click(function () {
        $('#id_donation_gifts').hide().addClass('show-m').removeClass('hide-m');
        $('#id_give_gift').show();
        $(this).val('')
        $('.product-title input').prop('checked', false)
    })
    $(document).on('change', '.product-title input', function () {
        var amount = 0;
        $('.product-title input').each(function () {
            if ($(this).is(':checked')) {
                amount += $(this).closest('label').find('.product-price').html() * 1
            }
        })
        $('#id_amount').val(amount);
    })
    $('#id_give_gift').click(function () {
        $('#id_donation_gifts').show();
        $('#id_give_gift').hide().removeClass('show-m').addClass('hide-m');
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

function GetStates(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + DonatePageConfig.all_schools_in_states,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_states').html(' <option value=""> </option>');
                res.all_schools_in_states.forEach(function (val) {
                    $('#id_states').append(
                        '<option value="' + val.schools_in_state.uuid + '">' + val.state_name[leng] + '</option>'
                    )
                })
            }
        }
    });
}

function GetRegionsByState(leng, uuid) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + Config.api + uuid,
        dataType: 'json',
        success: function (res) {
            if (res) {
                schools_array = [];
                $('#id_regions').html('');
                $('#id_schools').html('');
                res.all_schools.forEach(function (val, index) {
                    var schools = [];
                    val.schools.forEach(function (val) {
                        schools_array.push(val.uuid)
                        schools.push(val.uuid)
                    })
                    $('#id_regions').append(
                        '<option value="' + schools + '">' + val.region[leng] + '</option>'
                    );
                    if (index == 0) {
                        GetSchoolsByRegions(leng, schools.toString())
                    }
                })
            }
        }
    });
}

function GetSchoolsByRegions(leng, uuid) {
    var uuids = uuid.split(',');
    $('#id_schools').html(' ');
    uuids.forEach(function (uuid) {
        $.ajax({
            type: Config.request_type,
            url: Config.domain + Config.Path + Config.api + uuid,
            dataType: 'json',
            success: function (res) {
                if (res) {
                    $('#id_schools').append(
                        '<option value="' + uuid + '">' + res.name[leng] + '</option>'
                    )
                }
            }
        });
    })
}

function SendData() {
    var data = {};
    data.amount = $('#id_amount').val();
    data.province = $('#id_states').val();
    data.community = $('#id_regions').val();
    data.school = $('#id_schools').val();
    data.firstname = $('#id_personal_info_first_name').val();
    data.lastname = $('#id_personal_info_last_name').val();
    data.email = $('#id_personal_info_email_name').val();
    data.message = $('#id_personal_info_comment').val();
    if ($('#want-armath-Lab').is(':checked')) {
        data.donation_type = 1
    } else if ($('#want-uite').is(':checked')) {
        data.donation_type = 2
    }
    // data.binding = 6
}

function Validation() {
    $('.required').each(function () {
        if (!$(this).val()) {
            $(this).addClass('e-active')
        }
    });
    if (!$('#want-armath-Lab').is(':checked') && $('#want-uite').is(':checked')) {
        $('#want-armath-Lab').addClass('e-active');
        $('#want-uite').addClass('e-active');
    }
    if ($('#want-armath-Lab').is(':checked')) {
        $('select .required').each(function () {
            if (!$(this).val()) {
                $(this).addClass('e-active');
            }
        })
    }
    if ($('#id_donation_gifts').hasClass('hide-m')) {
        if (!$('#id_amount').val()) {
            $('#id_amount').addClass('e-active')
        }
    }
    if ($('#id_donation_gifts').hasClass('show-m')) {
        var flag = false;
        $('.product-title input').each(function () {
            if ($(this).is(':checked')) {
                flag = true;
            }
        });
        if (!flag) {
            $('#id_donation_gifts label').addClass('e-active')
        }
    }
}