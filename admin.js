function saveItem(data) {
  const items = JSON.parse(localStorage.getItem('galleryItems') || '[]');
  items.push(data);
  localStorage.setItem('galleryItems', JSON.stringify(items));
}

document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const fileInput = document.getElementById('fileInput');
  const text = document.getElementById('activityText').value.trim();
  const file = fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function() {
    saveItem({ src: reader.result, type: file.type, text: text });
    document.getElementById('uploadMsg').textContent = 'Uploaded!';
    fileInput.value = '';
    document.getElementById('activityText').value = '';
  };
  reader.readAsDataURL(file);
});
