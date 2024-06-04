$(document).ready(function () {
    var token = localStorage.getItem('token');
    var id = localStorage.getItem('id');
    var userName = localStorage.getItem('userName');

    // Header bilgileri
    var headers = {
        'Authorization': 'Bearer ' + token,
        'id': id,
        'userName': userName
    };

    // Sayfa yüklendiğinde otomatik olarak soruları yükleyelim
    $.ajax({
        url: 'https://localhost:44301/api/Post',
        type: 'GET',
        success: function (response) {
            if (response.isSuccess) {
                console.log(response);
                var postList = $('#postList');
                postList.empty();
                response.data.forEach(function (post) {
                    if (post.authorName == localStorage.getItem('userName')) {
                        var postHtml = `
                            <div class="post-container">
                                <button class="update-post-btn" data-id="${post.id}">✏️</button>
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
                    }
                });
                if (postList.length = 0) {
                    $('#postList').html('<p class="text-danger">Sorulariniz bulunamadi!.</p>');
                }
            } else {
                $('#postList').html('<p class="text-danger">Sorular yuklenemedi.</p>');
            }
        },
        error: function (error) {
            console.log("Error:", error);
            $('#postList').html('<p class="text-danger">Sorular yüklenirken bir hata oluştu</p>');
        }
    });

    $(document).on('click', '.read-more', function () {
        var postId = $(this).data('id');
        window.location.href = '/Soru/Index?id=' + postId;
    });

    $(document).on('click', '.update-post-btn', function () {
        var postId = $(this).data('id');
        var postContainer = $(this).closest('.post-container');
        var postContent = postContainer.find('.post-content');
        var postTitle = postContent.find('.post-title');
        var postDescription = postContent.find('.post-description');

        // Düzenleme alanlarını ekleyelim
        postTitle.attr('contenteditable', 'true');
        postDescription.attr('contenteditable', 'true');

        // Eğer İptal ve Kaydet düğmeleri zaten varsa ekleme işlemi yapma
        if (!postContainer.find('.update-buttons').length) {
            // Düzenleme düğmelerini ekle
            var updateButtonsHtml = `
            <div class="update-buttons">
                <button class="cancel-update-btn btn btn-secondary">İptal</button>
                <button class="save-update-btn btn btn-primary">Kaydet</button>
            </div>
        `;
            postContainer.append(updateButtonsHtml);
        }
    });

    $(document).on('click', '.cancel-update-btn', function () {
        // İptal butonuna tıklandığında düzenlemeyi iptal et
        var postContainer = $(this).closest('.post-container');
        var postContent = postContainer.find('.post-content');
        var postTitle = postContent.find('.post-title');
        var postDescription = postContent.find('.post-description');

        // Düzenleme alanlarını kaldır
        postTitle.attr('contenteditable', 'false');
        postDescription.attr('contenteditable', 'false');

        // Düzenleme düğmelerini kaldır
        $(this).parent().remove(); // .update-buttons div'i ve içeriği kaldırılıyor
    });

    $(document).on('click', '.save-update-btn', function () {
        var postId = $(this).closest('.post-container').find('.update-post-btn').data('id');
        var postContent = $(this).closest('.post-container').find('.post-content');
        var postTitle = postContent.find('.post-title').text();
        var postDescription = postContent.find('.post-description').text();

        // PUT isteği göndererek güncelleme yap
        $.ajax({
            url: 'https://localhost:44301/api/Post',
            type: 'PUT',
            headers: headers,
            contentType: 'application/json',
            data: JSON.stringify({
                id: postId,
                title: postTitle,
                description: postDescription,
                authorId: id,
                category: '' // Kategori bilgisi ekleyin
            }),
            success: function (response) {
                // Güncelleme başarılı olduğunda yapılacak işlemler
                alert('Güncelleme başarıyla kaydedildi!');
            },
            error: function (error) {
                console.log("Error:", error);
                alert('Güncelleme sırasında bir hata oluştu.');
            }
        });
    });
});
