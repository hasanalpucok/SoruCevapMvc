$(document).ready(function () {
    $('#signupForm').submit(function (event) {
        event.preventDefault(); // Sayfan�n yeniden y�klenmesini �nler

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
                alert(response.message); // Ba�ar�l� yan�t� g�sterir
                window.location.href = '/GirisYap';
            },
            error: function (xhr, status, error) {
                var errorMessage = JSON.parse(xhr.responseText);
                alert(errorMessage.message); // Hata yan�t�n� g�sterir
            }
        });
    });
});