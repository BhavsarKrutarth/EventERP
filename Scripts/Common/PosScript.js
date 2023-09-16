$(document).ready(function () {
    $('.as_sml_btn.as_disable,.as_btn.as_disable,.as_disable').on('click', function (event) {
        event.stopPropagation();
        event.preventDefault();
        //event.stopImmediatePropagation();
    });

    $('.mobilenomask').mask("00000-00000");

    $('.view_quatation, .as_login').click(function () {
        var vew_popup = $(this).data('pop');
        $('.' + vew_popup).show();
    });
    $('.ap_cls_btn').click(function () {
        var cls_pop = $(this).data('close');
        $('.' + cls_pop).hide();
    });
    $('.pso_logout').click(function () {
        $('.emp_id_name').hide();
        $('.as_login').show();
    });

    // Dynamic Height
    var fnlHgt = $(window).height() - ($('.jwlry_info').height() + $('.footer_pos').height()) - $('.other_ttl').outerHeight();
    $('.as_qtion_tgr,.as_qout_load').css('height', $('.as_rMark_tgr').height());
    $('.as_pso_scroll').css('height', fnlHgt);

    // remark popup
    //$('.as_rMark_tgr,.as_rMark_cncl,.as_rMark_save').click(function () {
    //    $('.as_pop_rmark').toggle();
    //    if ($(this).data('poptype') == 'triger')
    //        $('.posRemark').focus();
    //    else if ($(this).data('poptype') == 'cancel')
    //        $('.posRemark').val(' ');
    //});

    // quotation view popup 
    //$('.as_qtion_pop_tgr,.ap_cls_btn').click(function () {
    //    if ($(this).data('close') == undefined)
    //        $('.vew_q_popup').toggle();
    //});

    // edit Tag 
    $('.icn_edt').click(function () {
        var tagName = $(this).data('tag');
        if (tagName != undefined) {
            $('.vew_q_popup').toggle();
            $('.editTag').css('display', 'flex');
            $('.viewTag').css('display', 'none');
        }
    });
    $('.as_edit_done').click(function () {
        $('.vew_q_popup').toggle();
        $('.editTag').css('display', 'none');
        $('.viewTag').css('display', 'flex');
    });

    ////two botton show 
    //$('.checked_input').click(function () {
    //    if ($('.checked_input').is(':checked')) {
    //        $('.sv_Pr').show();
    //    } else {
    //        $('.sv_Pr').hide();
    //    }
    //});

    // ap_popup modal
    $('.ap_popup').click(function () {
        var ap_popup = $(this).data('popup');
        $('.' + ap_popup).show();
    });


    //for autoComplete Code - account - party and customer data -kishan
    $(".acto-accountsuggest").autocomplete({
        create: function () {
            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {

                if (item.name) {
                    return $('<li>').append(
                        '<div class="acto-ui">' +
                        '<p class="acto-suggest"><span class="icon-suggest"><i class="fa fa-user"></i></span> <span class="suggest_label">' + item.name + (item.shortcode == undefined ? '' : ' (' + item.shortcode + ') ') + (item.accounttype == undefined ? '' : '- ' + item.accounttype) + ' </span> </p>' +
                        '<p class="acto-suggest"><span class="icon-suggest"><i class="fa fa-phone"></i></span><span class="suggest_label">' + (item.mobile == '[object Object]' ? "" : item.mobile) + '</span> &nbsp;&nbsp;&nbsp;<span class="icon-suggest"><i class="fa fa-map-marker"></i></span><span>&nbsp;' + (item.cityname == undefined ? '' : item.cityname) + '</span></p>' +
                        '</div>'
                    )
                        .appendTo(ul);
                }
                else {
                    return $('<li>').append('<div class="acto-ui">' +
                        '<p>"No Results Found"</p>' +
                        '</div>')
                        .appendTo(ul);
                }
            };
        }
    });
});

// Swal Plugin notification display
function OperationMessage(title, message, type) {
    var timeout = "";
    var showCancelButton = "", confirmButtonColor = "", confirmButtonText = "";
    if (type == 'success') {
        timeout = 1400;
        showCancelButton = false,
            confirmButtonColor = "#66BB6A",
            confirmButtonText = "Ok"
    }
    else if (type == 'error') {
        //timeout = 500;
        showCancelButton = false,
            confirmButtonColor = "#EF5350",
            confirmButtonText = "Ok"
    }
    else if (type == 'warning') {
        //timeout = 500;
        showCancelButton = false,
            confirmButtonColor = "#FF7043",
            confirmButtonText = "Ok"
    }
    else if (type == 'info') {
        //timeout = 100;
        showCancelButton = false,
            confirmButtonColor = "#2196F3",
            confirmButtonText = "Ok"
    }

    swal({
        title: title,
        text: message,
        type: type,
        timer: timeout,
        showCancelButton: showCancelButton,
        confirmButtonColor: confirmButtonColor,
        confirmButtonText: confirmButtonText
    });
}

function capitalize(str) {
    if (str.length > 0) {
        var pieces = str.toString().split(" ");
        for (var i = 0; i < pieces.length; i++) {
            var j = pieces[i].charAt(0).toUpperCase();
            pieces[i] = j + pieces[i].substr(1);
        }
        return pieces.join(" ");
    } else {
        return "";
    }

    //return `${this[0].toUpperCase()}${this.slice(1)}`;
}