async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-name"]').value;
    const description = document.querySelector('textarea[name="post-desc"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title ,
            description // ask how to change this
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
  }

  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);