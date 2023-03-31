async function deleteFormHandler(event) {
  event.preventDefault();
  
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  const id = event.target.getAttribute('data-id')

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',

  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }

}

document.querySelector('.project-list').addEventListener('click', deleteFormHandler);