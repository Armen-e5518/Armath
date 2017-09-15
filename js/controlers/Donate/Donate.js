var DonatePageConfig = {
    'donate_page_data': Config.api + 'b6dd08a7-8d8b-448d-9bdf-0e40abcce447',
    'all_schools_in_states': Config.api + 'ff3d7ca6-bf0d-49b5-a39d-fa97cc8769f1',
    'payment_url': ''
};
var currency = 'AMD';
w3.includeHTML(function () {
    console.log('Run Donate Page');
    GetDonatePageData(Config.language, currency);
    GetStates(Config.language);
    Config.load = true;
    $('#id_donate').addClass('active-nav');
    $('#id_foo_donate').addClass('active-footer');
    setTimeout(function () {
        $('#id_give_gift').html(Config.SpecificNames.give_gift[Config.language]);
        $('#id_amount').attr('placeholder', Config.SpecificNames.enter_amount[Config.language]);
        $('#id_donation_full_budget_doc span').html(Config.SpecificNames.armath_laboratory[Config.language]);
        $('#id_regions').html('<option value="">' + Config.SpecificNames.region[Config.language] + '</option>');
        $('#id_schools').html('<option value="">' + Config.SpecificNames.school[Config.language] + '</option>');
        $('#id_amd').html(Config.SpecificNames.amd[Config.language]);
    }, 200)
    $('#id_states').change(function () {
        $('#id_school').html('')
        var uuid = $(this).val();
        GetRegionsByState(Config.language, uuid)
    });
    $('#id_regions').change(function () {
        $('#id_school').html('')
        var uuid = $(this).val();
        GetSchoolsByRegions(Config.language, uuid)
    });
    $('#id_amount').change(function () {
        $('.product-title input').prop('checked', false)
    });
    $('#id_currency').change(function () {
        currency = $("#id_currency option:selected").attr('data-id')
        GetGiftsByCurrency(currency);
        SetAmountValue()
    });
    $('#id_schools').change(function () {
        var uuid = $(this).val();
        GetSchoolsBySchoolId(Config.language, uuid)
    });

    $(document).on('change', '.product-title input', function () {
        SetAmountValue()
    });

    $('#id_amount').click(function () {
        $('#id_donation_gifts').hide().addClass('hide-m').removeClass('show-m');
        $('#id_give_gift').show();
        $(this).val('')
        $('.product-title input').prop('checked', false)
    });

    $('#id_give_gift').click(function () {
        $('#id_donation_gifts').show().addClass('show-m').removeClass('hide-m');
        $('#id_give_gift').hide();
    });
    $('#id_donate_text').click(function () {
        $('.e-active').removeClass('e-active');
        Validation();
        setTimeout(function () {
            SendData();
        }, 500)
    });
    $('.donate-form').click(function () {
        // $('.e-active').removeClass('e-active');
        // Validation();
    })
});

function GetDonatePageData(leng, price) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + DonatePageConfig.donate_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                PageLoad();
                DonatePageConfig.payment_url = res.url;
                $('#id_donate_title').html(res.title[leng]);
                $('#id_uite').html(res.donation_mechanism.donate_to.uite.text[leng]);
                $('#id_armath').html(res.donation_mechanism.donate_to.armath.text[leng]);
                $('#id_payment_option_title').html(res.donation_mechanism.payment_option.text[leng]);
                $('#id_payment_method_title').html(res.donation_mechanism.payment_method.title[leng]);
                $('#id_personal_info_title').html(res.personal_info.title[leng]);
                $('#id_donation_full_budget_title').html(res.donation_full_budget.title[leng]);
                $('#id_donation_full_budget_doc').attr('href', Config.img + res.donation_full_budget.doc[leng].uuid);
                $('#id_donation_full_budget_img').attr('src', Config.img + res.assets.imgs[0].uuid);
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
                res.donation_mechanism.payment_option.donation_gifts.forEach(function (val, index) {
                    $('#id_donation_gifts').append(
                        '<label>' +
                        '<span class="product-preview"><img src="' + Config.img + val.assets.imgs[0].uuid + '" alt=""></span> ' +
                        '<span class="product-title"><input class="gifts" value="' + val.uuid + '" type="checkbox"><em class="check-mark"></em><span>' + val.title[leng] + '</span></span>' +
                        '<span class="product-price" data-price-USD="' + val.price['USD'] + '" data-price-AMD = ' + val.price[price] + '>' + NumberFormat(val.price[price]) + ' ' + price + '</span>' +
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

function GetGiftsByCurrency(currency) {
    $('.product-price').each(function () {
        $(this).html(NumberFormat($(this).attr('data-price-' + currency)) + ' ' + currency)
    });
}

function GetStates(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + DonatePageConfig.all_schools_in_states,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_states').html('<option value="">' + Config.SpecificNames.province[Config.language] + '</option>');
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
                $('#id_regions').html('<option value="">' + Config.SpecificNames.region[Config.language] + '</option>');
                $('#id_schools').html('<option value="">' + Config.SpecificNames.school[Config.language] + '</option>');
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
    $('#id_schools').html('<option value="">' + Config.SpecificNames.school[Config.language] + '</option>');
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
    if ($('.e-active').length == 0 && DonatePageConfig.payment_url) {
        var data = {};
        var goods = [];
        data.amount = parseInt($('#id_amount').val());
        data.currency_type = $('#id_currency option:selected').val();
        data.province = $('#id_states option:selected').text();
        data.community = $('#id_regions option:selected').text();
        data.school = $('#id_schools option:selected').text();
        data.firstname = $('#id_personal_info_first_name').val();
        data.lastname = $('#id_personal_info_last_name').val();
        data.email = $('#id_personal_info_email_name').val();
        data.message = $('#id_personal_info_comment').val();
        if ($('#want-armath-Lab').is(':checked')) {
            data.donation_type = "1"
        } else if ($('#want-uite').is(':checked')) {
            data.donation_type = "2"
        }
        $('.gifts').each(function () {
            if ($(this).is(':checked')) {
                goods.push($(this).val())
            }
        });
        data.goods = goods;
        $.ajax({
            type: "POST",
            url: DonatePageConfig.payment_url,
            data: data,
            dataType: 'html',
            success: function (res) {
                if (res) {
                    var flag = res.substring(0, 5);
                    console.log(flag)
                    if (flag != 'Error') {
                        $('#id_form_pay').html(res);
                        document.getElementById('sendPayment').submit();
                    } else {
                        alert(res)
                    }

                }
                console.log(res)
            }
        })
    }
}

function Validation() {
    $('input.required').each(function () {
        if (!$(this).val()) {
            $(this).addClass('e-active')
        }
    });
    if (!$('#want-armath-Lab').is(':checked') && !$('#want-uite').is(':checked')) {
        $('#want-armath-Lab').parent().addClass('e-active');
        $('#want-uite').parent().addClass('e-active');
    }
    if ($('#want-armath-Lab').is(':checked')) {
        $('select.required').each(function () {
            if (!$(this).val()) {
                $(this).addClass('e-active');
            }
        })
    }
    if ($('#id_donation_gifts').hasClass('hide-m')) {
        if (!$('#id_amount').val()) {
            $('#id_amount').addClass('e-active')
        }
        if ($('#id_amount').val() * 1 <= 0) {
            $('#id_amount').addClass('e-active')
        }
    }
    if ($('#id_donation_gifts').hasClass('show-m')) {
        var flag = true;
        $('.product-title input').each(function () {
            if ($(this).is(':checked')) {
                flag = false;
            }
        });
        if (flag) {
            console.log('checked')
            $('#id_donation_gifts label').addClass('e-active')
        }
    }
    if (!validateEmail($('#id_personal_info_email_name').val())) {
        $('#id_personal_info_email_name').addClass('e-active')
    }
    if (!isNumeric($('#id_amount').val())) {
        $('#id_amount').addClass('e-active')
    }
    if ($('.e-active').length > 0) {
        var top = $('.e-active:first').offset().top;
        $('body').scrollTop(top - 10)
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function SetAmountValue() {
    var amount = 0;
    $('.product-title input').each(function () {
        if ($(this).is(':checked')) {
            amount += $(this).closest('label').find('.product-price').attr('data-price-' + currency) * 1
        }
    });
    $('#id_amount').val(amount);
    if (amount == 0) {
        $('#id_amount').val('');
    }
}

function GetSchoolsBySchoolId(leng, uuid) {
    if (uuid) {
        $.ajax({
            type: Config.request_type,
            url: Config.domain + Config.Path + Config.api + uuid,
            dataType: 'json',
            success: function (res) {
                if (res && res.hasOwnProperty('lab')) {

                    $.ajax({
                        type: Config.request_type,
                        url: Config.domain + Config.Path + Config.api + res.lab.uuid,
                        dataType: 'json',
                        success: function (res_l) {

                            var coach,
                                tel,
                                programs = '',
                                img,
                                name;
                            if (res_l) {
                                name = res_l.name[leng];
                                img = res_l.slides[0].assets.imgs[0].uuid;
                                $.ajax({
                                    type: Config.request_type,
                                    url: Config.domain + Config.Path + Config.api + res_l.coaches[0].uuid,
                                    dataType: 'json',
                                    success: function (res_c) {
                                        if (res_c) {
                                            coach = res_c.name[leng];
                                            tel = res_c.phone_number;
                                            if (res_l.technical_equipments.length > 0) {
                                                res_l.technical_equipments.forEach(function (val_p, index) {
                                                    $.ajax({
                                                        type: Config.request_type,
                                                        url: Config.domain + Config.Path + Config.api + val_p.uuid,
                                                        dataType: 'json',
                                                        success: function (res_p) {
                                                            if (res_p) {
                                                                programs += '<li data-id="' + val_p.uuid + '">' + res_p.title[leng] + '</li>'
                                                                if (res_l.technical_equipments.length - 1 == index) {
                                                                    $('#id_school').html(
                                                                        GetHtml(res_l.name[leng], 0, coach, tel, programs, name, img)
                                                                    );
                                                                }
                                                            }
                                                        }
                                                    });
                                                })
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    })

                }

                else {
                    $('#id_school').html(Config.SpecificNames.no_lab_text[leng])
                }
            }
        });
    }
}

function GetHtml(name, id, coach, tel, programs, name, img) {
    return '<div class="post-item" data-id="' + id + '">' +
        '<img src="' + Config.img + img + '" alt="">' +
        '<div>' +
        '<h2>' + name + '</h2>' +
        '<p>' +
        // '<strong>Address:</strong> Cereteli str. 65<br>' +
        '<strong>' + Config.SpecificNames.coach[Config.language] + ':</strong> ' + coach + ', <a href="tel:' + tel + '">' + Config.SpecificNames.tel[Config.language] + ': ' + tel + '</a><br>' +
        // '<strong>Number of students:</strong> 68' +
        '</p>' +
        '<p>' +
        '<strong>' + Config.SpecificNames.equipment_programs[Config.language] + '</strong>' +
        '</p>' +
        '<ul class="facility-options">' + programs +
        '</ul>' +
        '</div>' +
        '</div>'
}