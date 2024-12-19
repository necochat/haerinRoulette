const canvas = document.getElementById('roulette');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const itemsInput = document.getElementById('items');
const imagesInput = document.getElementById('images');
const result = document.getElementById('result');
let items = [];

// 항목 입력 시 실시간 업데이트
itemsInput.addEventListener('input', updateRoulette);

function updateRoulette() {
    items = itemsInput.value.split(',').map(item => item.trim()).filter(item => item !== '');
    drawRoulette();
}

// 룰렛 그리기 함수
function drawRoulette() {
    const totalItems = items.length;
    if (totalItems === 0) return;

    const sliceAngle = (2 * Math.PI) / totalItems;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < totalItems; i++) {
        // 색상 설정
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, i * sliceAngle, (i + 1) * sliceAngle);
        ctx.closePath();
        ctx.fillStyle = `hsl(${(360 / totalItems) * i}, 70%, 60%)`;
        ctx.fill();

        // 텍스트 설정
        ctx.fillStyle = '#000';
        ctx.font = 'bold 16px Arial';
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(i * sliceAngle + sliceAngle / 2);
        ctx.fillText(items[i], canvas.width / 4, 0);
        ctx.restore();
    }
}

spinButton.addEventListener('click', spinRoulette);

function spinRoulette() {
    if (items.length < 2) {
        alert('항목을 최소 2개 이상 입력해 주세요!');
        return;
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    const sliceAngle = 360 / items.length;
    const randomAngle = 360 * 5 + 90 - (sliceAngle * randomIndex + sliceAngle / 2);

    // 회전 애니메이션
    let startAngle = 0;
    const spin = setInterval(() => {
        startAngle += 20;
        canvas.style.transform = `rotate(${startAngle}deg)`;
        if (startAngle >= randomAngle) {
            clearInterval(spin);
            result.textContent = `결과: ${items[randomIndex]}`;
        }
    }, 50);
}
