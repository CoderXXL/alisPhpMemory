
const reloadBtn = document.getElementById('reload');
const container = document.getElementById('container');
const btn = document.getElementById('button');
const close = document.getElementById('close');

btn.onclick = () => {
    container.style.display = 'block';
}

close.onclick = () => {
    container.style.display = 'none'
}

reloadBtn.onclick = () => {
    location.reload();
}


