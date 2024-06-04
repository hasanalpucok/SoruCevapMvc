$(document).ready(function () {
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
            $('#postList').html('<p class="text-danger">Dorular yüklenirken bir hata oluþtu.</p>');
        }
    });

    $(document).on('click', '.read-more', function () {
        var postId = $(this).data('id');
        window.location.href = '/Soru/Index?id=' + postId;
    });
});
