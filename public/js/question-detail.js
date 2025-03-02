document.addEventListener('DOMContentLoaded', async () => {
    const id = window.location.pathname.split('/').pop();
    const response = await fetch(`/api/v1/questions/${id}`);
    const question = await response.json();

    // Gắn dữ liệu vào DOM
    document.querySelector('.question-content').textContent = question.content;
    const totalVotes = (question.likes || 0) + (question.dislikes || 0);
    document.querySelector('.vote-number').textContent = totalVotes;

    const likePercent = totalVotes ? ((question.likes || 0) / totalVotes * 100).toFixed(0) : 0;
    const dislikePercent = totalVotes ? ((question.dislikes || 0) / totalVotes * 100).toFixed(0) : 0;
    document.querySelector('.like').textContent = `${likePercent}%`;
    document.querySelector('.dislike').textContent = `${dislikePercent}%`;

    // Button back
    document.getElementById('btn').onclick = () => {
        window.location.href = '/';
    };
});