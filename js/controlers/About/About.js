var AboutPageConfig = {

    'about_page_data': Config.api + '624631ec-f8b0-4f56-83a9-82a7ffa204bf',
    'all_equipment': Config.api + '6578857e-1c09-475f-92ef-8b394f6a22c1',


};

w3.includeHTML(function () {


    console.log('Run About Page');

    GetAboutPageData(Config.language)
    GetAllEquipment(Config.language)

    Config.load = true;

    $('#id_about').addClass('active-nav');
    $('#id_foo_about').addClass('active-footer');
});


function GetAboutPageData(leng) {
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + AboutPageConfig.about_page_data,
        dataType: 'json',
        success: function (res) {
            if (res) {
                $('#id_about_title').html(res.title[leng]);
                $('#id_about_text').html(res.text[leng]);
                $('#id_equipment_title').html(res.all_tech_equipment.title[leng]);
                $('#id_equipment_text').html(res.all_tech_equipment.text[leng]);
                $('#id_project_action_plan_title').html(res.project_action_plan.title[leng]);
                $('#id_project_action_plan_text').html(res.project_action_plan.text[leng]);
                $('#id_join_armath_title').html(res.join_armath.title[leng]);
                $('#id_support_armath_title').html(res.support_armath.title[leng]);
                res.project_action_plan.phases.forEach(function (val, index) {
                    $('#id_phases').append(
                        '<div class="post-item">' +
                        '<div class="project-stage"><strong>' + (index * 1 + 1) + '.</strong><span>stage</span></div>' +
                        '<div>' +
                        '<h2>' + val.title[leng] + '</h2>' +
                        '<p>' + val.text[leng] + '</p>' +
                        '<ul class="project-stage-gallery">' +
                        '<li><a href="#"><span>+6</span><img src="img/about-company/project-stage-gallery-img-1.jpg" alt=""></a></li>' +
                        '<li><a href="#"><span>+2</span><img src="img/about-company/project-stage-gallery-img-2.jpg" alt=""></a></li>' +
                        '<li><a href="#"><span>+3</span><img src="img/about-company/project-stage-gallery-img-3.jpg" alt=""></a></li>' +
                        '<li><a href="#"><span>+3</span><img src="img/about-company/project-stage-gallery-img-4.jpg" alt=""></a></li>' +
                        '<li><a href="#"><span>+4</span><img src="img/about-company/project-stage-gallery-img-5.jpg" alt=""></a></li>' +
                        '<li><a href="#"><span>+6</span><img src="img/about-company/project-stage-gallery-img-6.jpg" alt=""></a></li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>'
                    )
                })
            }
        }
    });
}

function GetAllEquipment(leng) {
    $.ajax({
        type: "POST",
        url: Config.domain + Config.Path + AboutPageConfig.all_equipment,
        dataType: 'json',
        success: function (res) {
            if (res) {
                res.tech_equipment.forEach(function (val) {
                    $.ajax({
                        type: "POST",
                        url: Config.domain + Config.Path + Config.api + val.uuid,
                        dataType: 'json',
                        success: function (res1) {
                            if (res1) {
                                $('#id_all_equipment').append(
                                    '<div class="post-item">' +
                                    '<img src="img/about-company/about-post-img.jpg" alt="">' +
                                    '<div>' +
                                    '<h2>' + res1.title[leng] + '</h2>' +
                                    '<p>' + res1.text[leng] + '</p>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }
                        }
                    });
                })

            }
        }
    });
}