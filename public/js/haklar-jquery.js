
$(document).ready(function () {
    $(".isveren").hide();
    $(".isci").hide();
    $(".sosyal").hide();
    $(".cezai").hide();
    $("#sosyal-btn").click(function () {
        $(".isci").hide("slow");
        $(".isveren").hide("slow");
        $(".cezai").hide("slow");
        $(".sosyal").show("slow");
        $("#sosyal-btn").addClass("active");
        $("#isci-btn").removeClass("active");
        $("#isveren-btn").removeClass("active");
        $("#cezai-btn").removeClass("active");
    });
    $("#cezai-btn").click(function () {
        $(".isci").hide("slow");
        $(".isveren").hide("slow");
        $(".sosyal").hide("slow");
        $(".cezai").show("slow");
        $("#cezai-btn").addClass("active");
        $("#isci-btn").removeClass("active");
        $("#isveren-btn").removeClass("active");
        $("#sosyal-btn").removeClass("active");
    });
    $("#isci-btn").click(function () {
        $(".isveren").hide("slow");
        $(".isci").show("slow");
        $(".sosyal").hide("slow");
        $(".cezai").hide("slow");
        $("#isci-btn").addClass("active");
        $("#isveren-btn").removeClass("active");
        $("#sosyal-btn").removeClass("active");
        $("#cezai-btn").removeClass("active");
    });

    $("#isveren-btn").click(function () {
        $(".isci").hide("slow");
        $(".isveren").show("slow");
        $(".sosyal").hide("slow");
        $(".cezai").hide("slow");
        $("#isveren-btn").addClass("active");
        $("#isci-btn").removeClass("active");
        $("#sosyal-btn").removeClass("active");
        $("#cezai-btn").removeClass("active");
    });

});
