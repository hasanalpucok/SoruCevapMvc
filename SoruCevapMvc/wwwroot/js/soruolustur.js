$(document).ready(function () {
    $('#soruForm').submit(function (event) {
        event.preventDefault(); // Sayfanýn yeniden yüklenmesini önle

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

        // Form verilerinin alýndýðýný kontrol et
        console.log('Form Data:', formData);

        // AJAX isteði
        $.ajax({
            type: 'POST',
            url: 'https://localhost:44301/api/Post',
            contentType: 'application/json',
            headers: headers,
            data: JSON.stringify(formData),
            success: function (response) {
                alert('Soru baþarýyla oluþturuldu!');
                // Baþka bir iþlem yapýlabilir, örneðin sayfayý yenilemek gibi
                window.location.reload();
            },
            error: function (xhr, status, error) {
                console.error('Hata:', xhr);
                alert('Soru oluþturulurken bir hata oluþtu.');
            }
        });
    });
});
