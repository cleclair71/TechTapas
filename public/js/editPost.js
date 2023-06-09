async function editPost(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="post-text"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    if (title && content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editPost);