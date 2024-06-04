$(document).ready(function () {
    localStorage.setItem('token', '');
    localStorage.setItem('userName', '');
    localStorage.setItem('id', '');
    $('#loginForm').submit(function (event) {
        event.preventDefault(); // Sayfanýn yeniden yüklenmesini önler

        var formData = {
            userName: $('#KullaniciAdi').val(),
            password: $('#Sifre').val()
        };
        console.log(JSON.stringify(formData));
        $.ajax({
            type: 'POST',
            url: 'https://localhost:44301/api/Sign/In',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                // Baþarýlý cevap geldiðinde session ayarla
                if (response.length > 0 && response[0].authorization) {
                    var token = response[0].authorization;
                    localStorage.setItem('token', token);
                    localStorage.setItem('userName', response[0].userName);
                    localStorage.setItem('id', response[0].id);
                    localStorage.setItem('role', formData.userName == "admin" ? 'admin' : 'member');




                    // Ýstenilen sayfaya yönlendirme yapýlabilir
                    window.location.href = '/';
                } else {
                    alert('Geçersiz kullanýcý adý veya parola');
                }
            },
            error: function (xhr, status, error) {
                alert('Bir hata oluþtu');
            }
        });
    });
});