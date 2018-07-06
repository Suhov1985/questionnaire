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

    $("#js__slider").ionRangeSlider({
        min: 0,
        max: 4,
        step: 1,
        from: 2,
        grid: true
        // values: [
        //     "Не владею", "Использую готовые решения", "Использую готовые решения и умею и переделывать", "Пишу сложный JS с нуля"
        // ]
    });
});






