rulesBtn = document.getElementById('rules-btn')
rules = document.getElementById('rules')
closeBtn = document.getElementById('close-btn')

//Rules open and close event handlers
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
})
