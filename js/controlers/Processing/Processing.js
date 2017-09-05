w3.includeHTML(function () {
    console.log('Run Processing Page');

    Config.load = true;
    $('#id_donate').addClass('active-nav');
    $('#id_foo_donate').addClass('active-footer');

    if (getUrlParameter('orderId')) {
        var orderId = getUrlParameter('orderId');
        console.log(orderId);
        $.ajax({
            type: Config.request_type,
            url: Config.order_url + orderId,
            dataType: 'json',
            success: function (res) {
                if (res) {
                    console.log(res.currency)
                    if (res.ErrorMessage == 'Success') {
                        $('#id_d_thanks').show();
                        $('.p-info').show();
                        $('#id_name_v').html(res.cardholderName)
                        $('#id_amount_v').html(NumberFormat(res.Amount))
                        $('#id_order_v').html(res.OrderNumber);
                        if (res.currency == "051") {
                            $('#id_currency').html('AMD')
                        }
                        if (res.currency == "840") {
                            $('#id_currency').html("USD")
                        }
                    } else {
                        $('#id_d_errore').show();
                    }
                } else {
                    $('#id_d_errore').show();
                }
            }
        });
    }

});

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};