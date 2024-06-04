$(document).ready(function () {
    var role = localStorage.getItem('role');

    if (!role || role === '' || role !== 'admin') {
        // Token yoksa veya deðeri boþsa, kullanýcý henüz giriþ yapmamýþtýr
        // Giriþ yap sayfasýna yönlendirme yapýlabilir
        window.location.href = '/';
    }
    var token = localStorage.getItem('token');
    var id = localStorage.getItem('id');
    var userName = localStorage.getItem('userName');

    var headers = {
        'Authorization': 'Bearer ' + token,
        'id': id,
        'userName': userName
    };

    $.ajax({
        url: 'https://localhost:44301/api/Sign/Users',
        type: 'GET',
        headers: headers,
        success: function (response) {
            if (response.isSuccess) {
                var userList = $('#userList');
                userList.empty();
                response.data.forEach(function (user) {
                    var userHtml = `
                        <div class="user-card">
                            <span class="close-btn" data-id="${user.id}">X</span>
                            <p><strong>Kullanici adi:</strong> ${user.name}</p>
                            <p><strong>Email:</strong> ${user.email}</p>
                        </div>
                    `;
                    userList.append(userHtml);
                });
            } else {
                $('#userList').html('<p class="text-danger">Kullanixilar bulunamadi.</p>');
            }
        },
        error: function (error) {
            console.log("Error:", error);
            $('#userList').html('<p class="text-danger">Kullanici yüklerken bir hata oluþtu..</p>');
        }
    });

    $(document).on('click', '.close-btn', function () {
        var userId = $(this).data('id');
        deleteUser(userId);
    });

    function deleteUser(userId) {
        $.ajax({
            url: `https://localhost:44301/api/Sign/Users?id=${userId}`,
            type: 'DELETE',
            headers: headers,
            success: function (response) {
                alert('Kullanici basarili bir sekilde silindi!');
                // Burada gerekirse kullanýcýyý yeniden yükleme veya bir iþlem yapabilirsiniz.
            },
            error: function (error) {
                console.log("Kullanici silerken hata:", error);
                alert('Kullanici silerken hata.');
            }
        });
    }
});
