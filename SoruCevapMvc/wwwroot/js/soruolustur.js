$(document).ready(function () {
    $('#soruForm').submit(function (event) {
        event.preventDefault(); // Sayfan�n yeniden y�klenmesini �nle

        // Session 44301ni al
        var token = localStorage.getItem('token');
        var id = localStorage.getItem('id');
        var userName = localStorage.getItem('userName');

        // Header 44301
        var headers = {
            'Authorization': 'Bearer ' + token,
            'id': id,
            'userName': userName
        };

        // Form verilerini al
        var formData = {
            id: 0,
            title: $('#qTitle').val(),
            description: $('#description').val(),
            category: $('#category').val(),
            authorId: id
        };

        // Form verilerinin al�nd���n� kontrol et
        console.log('Form Data:', formData);

        // AJAX iste�i
        $.ajax({
            type: 'POST',
            url: 'https://localhost:44301/api/Post',
            contentType: 'application/json',
            headers: headers,
            data: JSON.stringify(formData),
            success: function (response) {
                alert('Soru ba�ar�yla olu�turuldu!');
                // Ba�ka bir i�lem yap�labilir, �rne�in sayfay� yenilemek gibi
                window.location.reload();
            },
            error: function (xhr, status, error) {
                console.error('Hata:', xhr);
                alert('Soru olu�turulurken bir hata olu�tu.');
            }
        });
    });
});
