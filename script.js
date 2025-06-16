function loadGallery() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  const items = JSON.parse(localStorage.getItem('galleryItems') || '[]');
  gallery.innerHTML = '';
  items.forEach(item => {
    const wrapper = document.createElement('div');
    if (item.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.text;
      wrapper.appendChild(img);
    } else if (item.type.startsWith('video/')) {
      const video = document.createElement('video');
      video.controls = true;
      video.src = item.src;
      wrapper.appendChild(video);
    }
    const p = document.createElement('p');
    p.textContent = item.text;
    wrapper.appendChild(p);
    gallery.appendChild(wrapper);
  });
}

function submitApplication(e) {
  e.preventDefault();
  const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
  const form = e.target;
  const data = new FormData(form);
  const msg = document.getElementById('formMsg');
  fetch(scriptURL, { method: 'POST', body: data })
    .then(() => {
      msg.textContent = 'Submitted!';
      form.reset();
    })
    .catch(err => {
      console.error(err);
      msg.textContent = 'There was an error.';
    });
}

document.addEventListener('DOMContentLoaded', function() {
  loadGallery();
  const form = document.getElementById('applicationForm');
  if (form) {
    form.addEventListener('submit', submitApplication);
  }
});
