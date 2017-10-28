$(document).ready(function() {

    // copy clicked study to run
    $('*[data-study-id]').on('click', function () {
        $('#run-study-id').val($(this).data('study-id'));
        $('#finish-study-id').val($(this).data('study-id'));
        $('#rerun-study-id').val($(this).data('study-id'));
        $('#edit-study-id').val($(this).data('study-id'));
    });

    $('*[data-modal-confirm-href]').on('click', function () {
        $('#modal-conform-href').val($(this).data('modal-confirm-href'));
    });

    $('#confirm-trigger').on('click', function () {
        window.location.href = $('#modal-conform-href').val();
    });

    $('#run-study-trigger').on('click', function () {
        window.location.href = '/dashboard/study/'+$('#run-study-id').val()+'/start/';
    });

    $('#finish-study-trigger').on('click', function () {
        window.location.href = '/dashboard/study/'+$('#finish-study-id').val()+'/finish/';
    });

    $('#rerun-study-trigger').on('click', function () {
        window.location.href = '/dashboard/study/'+$('#rerun-study-id').val()+'/start/';
    });

    $('#edit-study-trigger').on('click', function () {
        window.location.href = '/dashboard/study/'+$('#edit-study-id').val()+'/edit/';
    });

    $('.share-input-trigger').on('click', function() {
        $('#share-input').val($(this).data('study-url'));
    });

    $('.share-input-trigger-project').on('click', function() {
        $('#share-input-project').val($(this).data('project-url'));
    });

    $('.image-modal-trigger').on('click', function() {
        console.log($(this).data('image-modal-src'));
        $('#modal-image-src').attr('src', $(this).data('image-modal-src'));
        $('#modal-image').modal('show');
    });

    $('.smoothScroll').on('click', function () {
        var top = $('body').find($(this).attr('href')).position().top + $(window).scrollTop();
        $('html, body').animate({
            scrollTop: top
        },700, 'easeOutExpo');
        return false;
    });

    $('#setLoading').on('click', function() {
        setLoading();
    });

});

function notification(type, text) {
    noty({
        text        : '<div class="alert alert-'+type+'"><p><strong>'+text+'</strong></p></div>',
        layout      : 'topRight',
        theme       : 'made',
        maxVisible  : 10,
        animation   : {
            open  : 'animated fadeInRight',
            close : 'animated fadeOutRight'
        },
        timeout: 6000,
    });
}

function setLoading() {
    $('.loader-overlay').removeClass('loaded').addClass('opacity');
}

function unsetLoading() {
    $('.loader-overlay').addClass('loaded').removeClass('opacity');
}

function goBack() {
    window.history.back();
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    var path = 'path=/';
    document.cookie = cname + "=" + cvalue + "; " + expires+ ";"+ path;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function deleteCookie(cname) {
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function copyToClipboard(element) {
    $(element).select();
    document.execCommand("copy");
}
