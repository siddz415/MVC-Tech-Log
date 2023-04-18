async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

  const comment_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (comment_text) {
    const response = await fetch(`/api/comments/edit/${comment_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        comment_text,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}



async function addCommentFormHandler(event) {
  event.preventDefault();
  console.log('addComment')
  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

  const project_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  console.log('comment_text', comment_text, project_id)
  if (comment_text) {
    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: JSON.stringify({
        project_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.comment-form').addEventListener('submit', addCommentFormHandler);

document.querySelector('.edit-comment-form').addEventListener('submit', commentFormHandler);