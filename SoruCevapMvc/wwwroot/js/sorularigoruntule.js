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


    // Header bilgileri
    var headers = {
        'Authorization': 'Bearer ' + token,
        'id': id,
        'userName': userName
    };


    // Sayfa yüklendiðinde otomatik olarak sorularý yükleyelim
    $.ajax({
        url: 'https://localhost:44301/api/Post',
        type: 'GET',
        success: function (response) {
            if (response.isSuccess) {
                console.log(response);
                var postList = $('#postList');
                postList.empty();
                response.data.forEach(function (post) {
                    var postHtml = `
                        <div class="post-container">
                            <button class="delete-post-btn" data-id="${post.id}">X</button>
                            <div class="post-content">
                                <h3 class="post-title">${post.title}</h3>
                                <p class="post-description">${post.description.substring(0, 150)}...</p>
                                <p class="post-author">Olusturan: <span>${post.authorName}</span></p>
                            </div>
                            <div class="read-more-container">
                                <p class="read-more" data-id="${post.id}">Devamini Goster...</p>
                            </div>
                        </div>
                    `;
                    postList.append(postHtml);
                });
            } else {
                $('#postList').html('<p class="text-danger">Sorular yuklenemedi.</p>');
            }
        },
        error: function (error) {
            console.log("Error:", error);
            $('#postList').html('<p class="text-danger">Sorular yüklenirken bir hata oluþtu. </p>');
        }
    });

    $(document).on('click', '.read-more', function () {
        var postId = $(this).data('id');
        window.location.href = '/Soru/Index?id=' + postId;
    });

    $(document).on('click', '.delete-post-btn', function () {
        var postId = $(this).data('id');
        $.ajax({
            url: `https://localhost:44301/api/Post/${postId}`,
            type: 'DELETE',
            headers: headers,
            success: function (response) {
                console.log(response);
                location.reload();
                // Burada gerekli iþlemleri gerçekleþtirin, örneðin postun sayfadan kaldýrýlmasý veya güncellenmesi
            },
            error: function (error) {
                console.log("hata:", error);
                // Hata durumunda kullanýcýya bilgi verebilirsiniz
            }
        });
    });
});
