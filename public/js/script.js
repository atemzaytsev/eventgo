$(window).on("load", function () {
    $("#status").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
});

$(function () {
    $('.datetimepicker-input').datetimepicker();
});


$(function () {
    $('.datetimepicker-input').datetimepicker();
    $("#jquery-search-sample").jsearch({

        rowClass: '.jsearch-row',

        fieldClass: '.jsearch-field',

        minLength: 1,

        triggers: 'keyup',

        caseSensitive: false,

    });
});


$(function () {
    $(".when").on("click", function () {
        this.value = "";
    });
});

$(window).on("load", function () {

    $("#isotope-filters").on("click", "button", function () {


        var filterValue = $(this).attr("data-filter");

        //filter portfolio 
        $("#isotope-container").isotope({

            filter: filterValue

        });

        $("#isotope-filters").find(".active").removeClass("active")
        $(this).addClass("active");
    });
});