document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!fileInput.files.length) {
        alert('Please select a file.');
        return;
    }

    const formData = new FormData();
    formData.append('fileInput', fileInput.files[0]);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'filtered_chat.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});