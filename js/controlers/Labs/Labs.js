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
        GetSchoolsByUuid(Config.language, uuid)
    })
});

$('#id_search').click(function () {
    GetSchoolsSearch(Config.language);
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
                res.all_schools.forEach(function (val) {
                    $('#id_regions').append(
                        '<option value="' + val.schools[0].uuid + '">' + val.region[leng] + '</option>'
                    )
                    val.schools.forEach(function (val) {
                        schools_array.push(val.uuid)
                    })
                })
            }
        }
    });
}

function GetSchoolsByUuid(leng, uuid) {
    if (uuid) {
        $.ajax({
            type: Config.request_type,
            url: Config.domain + Config.Path + Config.api + uuid,
            dataType: 'json',
            success: function (res) {
                if (res) {
                    schools_array = [];
                    schools_array.push(uuid);
                    $('#id_load_more').hide();
                    $('#id_schools').html(
                        GetHtml(res.name[leng])
                    );
                }
            }
        });
    } else {
        GetRegionsByState(Config.language, $('#id_states').val())
    }
}

function GetSchoolsSearch(leng) {
    $('#id_schools').html('')
    schools_array.forEach(function (val, index) {
        if (index <= count) {
            $.ajax({
                type: Config.request_type,
                url: Config.domain + Config.Path + Config.api + val,
                dataType: 'json',
                success: function (res) {
                    if (res) {
                        $('#id_schools').append(
                            GetHtml(res.name[leng])
                        );
                    }
                }
            });
        } else {
            schools_array.splice(0, count);
            $('#id_load_more').show();
        }
    })
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
                    $('#id_schools').append(
                        GetHtml(res.name[leng])
                    );
                }
            }
        });
    })
}

function GetHtml(name) {
    return '<div class="post-item">' +
        '<img src="img/labs/labs-img.jpg" alt="">' +
        '<div>' +
        '<h2>' + name + '</h2>' +
        '<p>' +
        // '<strong>Address:</strong> Cereteli str. 65<br>' +
        // '<strong>Coach:</strong> Karapet Manukyan, <a href="tel:055155144">Tel.: 055155144</a><br>' +
        // '<strong>Number of students:</strong> 68' +
        '</p>' +
        '<p>' +
        // '<strong>Equipment / programs</strong>' +
        '</p>' +
        '<ul class="facility-options">' +
        // '<li><a href="#">3D printer</a></li>' +
        // '<li><a href="#">CNC</a></li>' +
        // '<li><a href="#">robotics kit</a></li>' +
        // '<li><a href="#">electronic laboratory</a></li>' +
        // '<li><a href="#">Scratch</a></li>' +
        // '<li><a href="#">Aghues</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>'
}