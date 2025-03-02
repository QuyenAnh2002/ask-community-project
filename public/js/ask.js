document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('ask-question');
    const letterCount = document.querySelector('.letter');
    const form = document.querySelector('.main-form');

    // Giới hạn số ký tự
    textarea.addEventListener('input', () => {
        const remaining = 200 - textarea.value.length;
        letterCount.textContent = remaining;
        if (remaining <= 0) {
            textarea.value = textarea.value.slice(0, 200);
        }
    });

    // Submit form
    form.onsubmit = async (e) => {
        e.preventDefault();
        if (!textarea.value.trim()) {
            alert('Textarea không được bỏ trống');
            return;
        }

        await fetch('/api/v1/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: textarea.value })
        });
        alert('Thêm câu hỏi thành công');
        window.location.href = '/';
    };
});