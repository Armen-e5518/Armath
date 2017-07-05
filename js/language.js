$(document).ready(function () {

    $(document).on('click', '#id_languages li a', function () {
        localStorage.setItem('language', $(this).attr('data-id'));
        location.reload();
    })

});
