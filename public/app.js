const reportForm = document.querySelector('.report-form')
const currentLog = document.querySelector('#current-log')

function createLog() {
    // axios.post('/api/logs', { content: currentLog.value } ).then(res => {
    //     console.log(res) 
    // })
    currentLog.value = ''
}

function handleSubmit(e) {
    e.preventDefault()
    clearInterval(currentTimer)
    currentTimer = setInterval(createLog, 10000)
    createLog()
}

reportForm.addEventListener('submit', handleSubmit)
currentTimer = setInterval(createLog, 10000)


// let contentHistory = document.querySelector('.content-history');
// contentHistory.innerHTML = `
// <article class="log-entry">
//     <div class='content'>${content}</div>
// </article>
// `