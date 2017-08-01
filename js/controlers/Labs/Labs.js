var LabsPageConfig = {
    'labs_page_data': Config.api + 'bd9fdd77-92c3-4247-919c-d266c6aa3ee5',
    'all_schools_in_states': Config.api + 'ff3d7ca6-bf0d-49b5-a39d-fa97cc8769f1',
};

w3.includeHTML(function () {
    console.log('Run Labs Page');
    GetLabstPageData(Config.language)
    GetAllSchoolsInStates(Config.language)
    Config.load = true;
    $('#id_labs').addClass('active-nav');
    $('#id_foo_labs').addClass('active-footer');

    $('#id_states').change(function () {
        var uuid = $(this).val();
        GetCityOrVillage(Config.language, uuid)
    })
});

function GetLabstPageData(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + LabsPageConfig.labs_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_support_armath_title').html(res.support_armath.title[leng]);
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


function GetAllSchoolsInStates(leng) {
    $.ajax({
        type: Config.request_type,
        url: Config.domain + Config.Path + LabsPageConfig.all_schools_in_states,
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