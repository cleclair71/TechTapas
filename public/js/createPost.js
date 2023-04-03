async function createPost(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="post-text"]').value;
    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
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

document.querySelector('#create-post-form').addEventListener('submit', createPost);