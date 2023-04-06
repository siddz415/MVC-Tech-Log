async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="project-name"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title  // ask how to change this
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