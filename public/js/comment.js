async function addComment(event) {
    event.preventDefault();
    const comment = document.querySelector('textarea[name="comment-body"]').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, comment }),
            headers: { 'Content-Type': 'application/json' }
        });
        // if (response.ok) {
        //     document.location.reload('/dashboard');
        // } else {
        //     alert(response.statusText);
        // }
        document.location.reload();
}

document.querySelector('.comment-form').addEventListener('submit', addComment);