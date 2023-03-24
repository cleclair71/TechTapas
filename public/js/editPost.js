async function editPost(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="post-content"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
  await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' }
        });

        document.location.replace('/dashboard');
        }

        async function deletePost() {
        
            const id = window.location.toString().split('/')[
                window.location.toString().split('/').length - 1
              ];
        
            await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
               
            });
            document.location.replace('/dashboard');
        }
        
        document.querySelectorAll('.delete-post-btn').forEach((btn) => {
            btn.addEventListener('click', deletePost);
        });
        
document.querySelector('.edit-post-form').addEventListener('submit', editPost);