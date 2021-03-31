let form = document.querySelector('form');

function handleLogEntries(event) {
    event.preventDefault();
    let content = document.querySelector('#content-input').value;

    let contentHistory = document.querySelector('.content-history');
    contentHistory.innerHTML = `
    <article class="log-entry">
        <div class='content'>${content}</div>
    </article>
    `

}

form.addEventListener('submit', handleLogEntries);