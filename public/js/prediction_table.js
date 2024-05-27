
$(document).ready(function () {
    $('#yearPicker').datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years",
        startDate: '2024', // 2023'ten sonrası için başlangıç yılı
        autoclose: true
    });

    $('#yearForm').on('submit', function (e) {
        e.preventDefault();
        const predictionYear = $('#yearPicker').val();
        if (parseInt(predictionYear) < 2024) {
            $('#yearModal').modal('show');
            return false;
        }
        window.location.href = `/prediction?predictionYear=${predictionYear}`;
    });
});

