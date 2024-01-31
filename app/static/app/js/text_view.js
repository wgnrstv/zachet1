let isTyping = false; // Флаг для проверки процесса "печатания"

// Функция для создания эффекта печатания текста
function typeWriter(element, text, i, callback) {
    if (i < (text.length)) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(function() {
            typeWriter(element, text, i, callback);
        }, 50); // Уменьшенная задержка для ускорения появления текста
    } else if (typeof callback == 'function') {
        callback();
    }
}

// Функция для инициализации процесса "печатания"
function startTyping(text, elementId, callback) {
    if (isTyping) return; // Если текст уже "печатается", выходим из функции
    isTyping = true; // Устанавливаем флаг в true
    const element = document.getElementById(elementId);
    element.innerHTML = ""; // Очистка содержимого элемента перед началом "печатания"
    typeWriter(element, text, 0, function() {
        isTyping = false; // Сбрасываем флаг после завершения "печатания"
        if (typeof callback == 'function') {
            callback();
        }
    });
}

// Функция для исчезновения модального окна
function fadeOutModal(elementId) {
    const element = document.getElementById(elementId);
    element.style.transition = 'opacity 1s';
    element.style.opacity = '0';
    setTimeout(function() {
        element.style.display = 'none';
        element.style.opacity = '1';
    }, 1000); // Подождите, пока анимация исчезновения завершится
}

// Функция для получения текста с сервера
function fetchText(callback) {
    fetch('/get/text/')
        .then(response => response.json())
        .then(data => {
            if (data.text && typeof callback == 'function') {
                callback(data.text);
            }
        })
        .catch(error => {
            console.error('Ошибка при получении текста:', error);
            callback('Ой, что-то не так, не могу получить данные с адреса http://127.0.0.1:8000/get/text/ проверьте доступность адреса!');
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const santaImg = document.querySelector('.santaicon'); // Ссылка на изображение Санта Клауса
    const modal = document.createElement('div'); // Создание всплывающего окна
    modal.id = 'modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '10px';
    modal.style.zIndex = '1000';
    document.body.appendChild(modal);

    santaImg.addEventListener('click', function() {
        if (!isTyping) { // Проверяем, не идет ли уже процесс "печатания"
            fetchText(function(text) {
                modal.style.display = 'block';
                startTyping(text, 'modal', function() {
                    // Запуск таймера исчезновения окна после завершения анимации
                    setTimeout(function() {
                        fadeOutModal('modal');
                    }, 5000);
                });
            });
        }
    });
});
