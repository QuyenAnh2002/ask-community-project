document.addEventListener('DOMContentLoaded', async () => {
    // Fetch danh sách questions
    const response = await fetch('/api/v1/questions');
    const questions = await response.json();
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    // Gắn content vào DOM
    document.querySelector('.question-content').textContent = randomQuestion.content;

    // Xử lý button like
    document.getElementById('like').onclick = async () => {
        await fetch(`/api/v1/questions/${randomQuestion.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ likes: (randomQuestion.likes || 0) + 1 })    
        });
        window.location.href = `/question-detail/${randomQuestion.id}`;
    };

    // Xử lý button dislike
    document.getElementById('dislike').onclick = async () => {
        await fetch(`/api/v1/questions/${randomQuestion.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dislikes: (randomQuestion.dislikes || 0) + 1 })
        });
        window.location.href = `/question-detail/${randomQuestion.id}`;
    };
});