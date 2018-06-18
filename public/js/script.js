
//==========================
//Preloader
//==========================
$(window).on("load", function () {
    $("#status").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
});

//==========================
//DateTime picker
//==========================
$(function () {
    $('.datetimepicker-input').datetimepicker();
});

//==========================
//Search
//==========================
$(function () {
    $("#jquery-search-sample").jsearch({

        rowClass: '.jsearch-row',

        fieldClass: '.jsearch-field',

        minLength: 1,

        triggers: 'keyup',

        caseSensitive: false,

    });
});

//==========================
//Clean Date input on the edit page
//==========================
$(function () {
    $(".when").on("click", function () {
        this.value = "";
    });
});

//==========================
//Filtering
//==========================
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