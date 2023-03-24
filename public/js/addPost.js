async function newFormHandler(event) {
    event.preventDefault();
    alert('picking up alerts');
    const name = document.querySelector('input[name="project-name').value;
    const description = document.querySelector('textarea[name="project-desc"]').value;
    console.log(name, description);
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }

  document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);