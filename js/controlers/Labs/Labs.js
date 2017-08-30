var LabsPageConfig = {
    'labs_page_data': Config.api + 'bd9fdd77-92c3-4247-919c-d266c6aa3ee5',
    'all_schools_in_states': Config.api + 'ff3d7ca6-bf0d-49b5-a39d-fa97cc8769f1',
};

var count = 5,
    schools_array = [];

w3.includeHTML(function () {
    console.log('Run Labs Page');
    GetLabstPageData(Config.language)
    GetStates(Config.language)
    Config.load = true;
    $('#id_labs').addClass('active-nav');
    $('#id_foo_labs').addClass('active-footer');

    $('#id_states').change(function () {
        var uuid = $(this).val();
        GetRegionsByState(Config.language, uuid)
    })
    $('#id_regions').change(function () {
        var uuid = $(this).val();
        $('#id_load_more').hide();
        GetSchoolsByUuid(Config.language, uuid);
    })
});

$('#id_search').click(function () {
    if (!$('#id_regions').val()) {
        GetSchoolsSearch(Config.language);
    }
});

$('#id_load_more').click(function () {
    GetSchoolsLoad(Config.language);
});

function GetLabstPageData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + LabsPageConfig.labs_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_support_armath_title').html(res.title[leng]);
                $('#id_support_armath_text').html(res.text[leng]);
            }
        }
    });
}

function GetStates(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + LabsPageConfig.all_schools_in_states,
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
                $('#id_regions').html('<option value=""></option>');
                res.all_schools.forEach(function (val, i_all) {
                    var schools = [];
                    val.schools.forEach(function (school, i_school) {
                        $.ajax({
                            type: Config.request_type,
                            url: Config.domain + Config.Path + Config.api + school.uuid,
                            dataType: 'json',
                            success: function (res) {
                                if (res) {
                                    if (res.hasOwnProperty('lab')) {
                                        schools_array.push(school.uuid)
                                        schools.push(school.uuid)
                                        if (i_school == val.schools.length - 1) {
                                            $('#id_regions').append(
                                                '<option value="' + schools + '">' + val.region[leng] + '</option>'
                                            )
                                        }
                                    }
                                }
                            }
                        });
                    })
                })
            }
        }
    });
}

function GetSchoolsByUuid(leng, uuid) {
    if (uuid) {
        $('#id_schools').html('');
        schools_array = [];
        var uuids = uuid.split(',');
        uuids.forEach(function (val, index) {
            $.ajax({
                type: Config.request_type,
                url: Config.domain + Config.Path + Config.api + val,
                dataType: 'json',
                success: function (res) {
                    if (res) {
                        if (res.hasOwnProperty('lab')) {
                            if (index <= count) {
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
                                                                                $('#id_schools').append(
                                                                                    GetHtml(res_l.name[leng], val, coach, tel, programs, name, img)
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
                                });
                            } else {
                                schools_array.push(val);
                                $('#id_load_more').show();
                            }
                        }
                    }
                }
            });
        })
    } else {
        GetRegionsByState(Config.language, $('#id_states').val())
    }
}

function GetSchoolsSearch(leng) {
    $('#id_schools').html('')
    if (schools_array.length > 0) {
        schools_array.forEach(function (val, index) {
            if (index <= count) {
                $.ajax({
                    type: Config.request_type,
                    url: Config.domain + Config.Path + Config.api + val,
                    dataType: 'json',
                    success: function (res) {
                        if (res) {
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
                                                                            $('#id_schools').append(
                                                                                GetHtml(res_l.name[leng], val, coach, tel, programs, name, img)
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
                            });
                        }
                    }
                });
            } else {
                schools_array.splice(0, count);
                $('#id_load_more').show();
            }
        })
    } else {
        $('#id_load_more').hide();
    }
}

function GetSchoolsLoad(leng) {
    if (schools_array.length == 0) {
        $('#id_load_more').hide();
    }
    schools_array.splice(0, count).forEach(function (val, index) {
        $.ajax({
            type: Config.request_type,
            url: Config.domain + Config.Path + Config.api + val,
            dataType: 'json',
            success: function (res) {
                if (res) {
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
                                                                    $('#id_schools').append(
                                                                        GetHtml(res_l.name[leng], val, coach, tel, programs, name, img)
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
                    });
                }
            }
        });
    })
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