$(document).ready(function() {
    var inp = $('.form-control');
    var selectDate = $('.select__date');

    inp.focus(function (e) {
       $(this).parents('.form-group').addClass('active');
    });

    inp.blur(function (e) {
        var element = $(this).val();
        if(!element){
            $(this).parents('.form-group').removeClass('active');
        }
    });

    $('.navbar-toggle').click(function () {
        $('.navbar-collapse').toggleClass('active');
    });
    selectDate.click(function (e) {
        $(this).toggleClass("active");
        $(this).children('.select__date-drop').slideToggle();
    });
    $(".select__date-drop ul > li > a").click(function (e) {
        var text = $(this).html();
        selectDate.siblings('label').html(text);
        e.preventDefault()
    });
    $(document).click(function(event) {
        if ($(event.target).closest(".select__date").length) return;
        $('.select__date').removeClass("active");
        $('.select__date-drop').slideUp();
        event.stopPropagation();
    });
    $(document).click(function(event) {
        if ($(event.target).closest(".header").length) return;
        $('.navbar-collapse').removeClass('active');
        event.stopPropagation();
    });
    $(".navbar-nav > li > a").click(function() {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        $('.navbar-collapse').removeClass('active');
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
    });
    $("#js__slider").ionRangeSlider({
        min: 0,
        max: 4,
        step: 1,
        from: 2,
        grid: true
    });
});






