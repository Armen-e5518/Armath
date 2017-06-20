$(document).ready(function () {

    $(document).on('click', '#id_languages li a', function () {
        localStorage.setItem('language', $(this).attr('data-id'));
        location.reload();
    })

});

function SetActiveMenu(type) {
    var id = Routing.type;
    $(Routing.type.deader).addClass('active-nav')
    $(Routing.type.footer).addClass('active-footer')
}