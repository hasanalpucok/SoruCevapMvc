
$(document).ready(function () {
    var postId = $('#postIdHolder').val(); // Razor değeri JavaScript değişkenine geçiriliyor
    // Session bilgilerini al
    var token = localStorage.getItem('token');
    var id = localStorage.getItem('id');
    var userName = localStorage.getItem('userName');
    console.log(postId);

    // Header bilgileri
    var headers = {
        'Authorization': 'Bearer ' + token,
        'id': id,
        'userName': userName
    };



    function sendVote(postOrCommentId, voteType, isPost) {
        var url = 'https://localhost:44301/api/Like';
        var data = {
            "id": 0,
            "authorId": id.toString(),
            "contentId": postOrCommentId,
            "contentType": isPost ? 0 : 1,
            "timeStamp": 0,
            "isLiked": voteType === 'like'
        };

        $.ajax({
            url: url,
            type: 'POST',
            headers: headers,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                console.log(response);
                if (response.isSuccess) {
                    alert(voteType === 'like' ? 'Beğendiniz!' : 'Beğenmediniz!');
                    location.reload(); // Sayfayı yenileyerek güncel beğeni/beğenmeme sayılarını gösterebiliriz.
                } else {
                    alert('Oylama sırasında bir hata oluştu.');
                }
            },
            error: function (error) {
                console.log("Error:", error);
                alert('Oylama sırasında bir hata oluştu.');
            }
        });
    }

    function renderPost(postData) {
        // Fetch a unique avatar for the post author
        const postAuthorAvatarUrl = `https://thispersondoesnotexist.com/`;

        var postHtml = `
                <div class="question-card">
                    <div class="d-flex">
                        <div>
                            <h5>${postData.title}</h5>
                            <p>${postData.description}</p>
                            <div class="post-details">
                                <p class="vote like-btn" data-id="${postData.id}" data-type="post">👍 <span>${postData.likeCount}</span></p>
                                <p class="vote dislike-btn" data-id="${postData.id}" data-type="post">👎 <span>${postData.dislikeCount}</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="author-details">
                        <p>Author: ${postData.authorName} | Category: ${postData.category}</p>
                        <div class="author-avatar"><img src="${postAuthorAvatarUrl}" alt="Avatar" style="width: 100%; height: 100%; border-radius: "50%;"></div>
                    </div>
                    <div id=allcomments>
                    <h4>Yorumlar:</h4>
                    <ul id="commentList"></ul> <!-- Yorumlar buraya eklenecek -->
                    <div class="comment-section">
                        <textarea id="commentContent" class="form-control" placeholder="Yorum yap..."></textarea>
                        <button id="submitComment" class="btn btn-primary mt-2">Yorum Yap</button>
                    </div>
                    </div>
                </div>
            `;
        $('#postDetail').append(postHtml);

        postData.comments.forEach(function (comment) {
            // Fetch a unique avatar for each comment
            const commentAuthorAvatarUrl = `https://thispersondoesnotexist.com/?utm_source=JSON2`;

            var commentHtml = `
                    <li class="comment-card">
                        <div class="comment-header">
                            <div class="comment-author-avatar"><img src="${commentAuthorAvatarUrl}" alt="Avatar"></div>
                            <div class="comment-author-details">
                                <p class="comment-author">Yazar: <span>${comment.authorName}</span></p>
                            </div>
                        </div>
                        <div class="comment-body">
                            <p class="comment-content">${comment.content}</p>
                        </div>
                        <div class="comment-footer">
                            <p class="comment-vote like-btn" data-id="${comment.id}" data-type="comment">👍 <span>${comment.likeCount}</span></p>
                            <p class="comment-vote dislike-btn" data-id="${comment.id}" data-type="comment">👎 <span>${comment.dislikeCount}</span></p>
                        </div>
                    </li>
                `;
            $('#commentList').append(commentHtml);
        });
    }



    $.ajax({
        url: 'https://localhost:44301/api/Post/' + postId,
        type: 'GET',
        success: function (response) {
            if (response.isSuccess) {
                var postDetail = $('#postDetail');
                postDetail.empty();
                var postData = response.data[0]; // İlk öğe, yani soru detayları
                renderPost(postData);
            } else {
                $('#postDetail').html('<p class="text-danger">Soru detayları yüklenirken bir hata oluştu.</p>');
            }
        },
        error: function (error) {
            console.log("Error:", error);
            $('#postDetail').html('<p class="text-danger">Soru detayları yüklenirken bir hata oluştu.</p>');
        }
    });

    $(document).on('click', '.like-btn', function () {
        var id = $(this).data('id');
        var type = $(this).data('type');
        sendVote(id, 'like', type === 'post');
    });

    $(document).on('click', '.dislike-btn', function () {
        var id = $(this).data('id');
        var type = $(this).data('type');
        sendVote(id, 'dislike', type === 'post');
    });

    $(document).on('click', '#submitComment', function () {
        var commentContent = $('#commentContent').val().trim();
        if (commentContent === '') {
            alert('Yorum boş olamaz!');
            return;
        }





        // Body verisi
        var bodyData = {
            "id": 0,
            "authorId": id,
            "content": commentContent,
            "postId": postId, // postId değişkeni nereden geldiyse burada kullanılacak
            "timeStamp": 0
        };
        console.log(bodyData);
        console.log(headers);

        // AJAX çağrısı
        $.ajax({
            url: 'https://localhost:44301/api/Comment', // İstenilen API adresi
            type: 'POST',
            headers: headers,
            contentType: 'application/json',
            data: JSON.stringify(bodyData),
            success: function (response) {
                // Yorum başarıyla gönderildiğinde yapılabilecek işlemler
                alert('Yorum başarıyla gönderildi: ' + commentContent);
                $('#commentContent').val(''); // Yorum alanını temizle
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                // Hata durumunda yapılabilecek işlemler
                alert(xhr);

            }
        });
    });

});