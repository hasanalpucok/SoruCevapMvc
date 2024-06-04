$(document).ready(function () {
    $('#signupForm').submit(function (event) {
        event.preventDefault(); // Sayfanýn yeniden yüklenmesini önler

        var formData = {
            userName: $('input[name="userName"]').val(),
            password: $('input[name="password"]').val(),
            email: $('input[name="email"]').val()
        };

        $.ajax({
            type: 'POST',
            url: 'https://localhost:44301/api/Sign/Up',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                alert(response.message); // Baþarýlý yanýtý gösterir
                window.location.href = '/GirisYap';
            },
            error: function (xhr, status, error) {
                var errorMessage = JSON.parse(xhr.responseText);
                alert(errorMessage.message); // Hata yanýtýný gösterir
            }
        });
    });
});