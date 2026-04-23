document.addEventListener("DOMContentLoaded", function () {
    const select = document.querySelector("#id_s3_image");
    if (!select) return;

    // скрываем select
    select.style.display = "none";

    // кнопка открытия
    const button = document.createElement("button");
    button.innerText = "Выбрать из S3";
    button.type = "button";
    button.style.marginTop = "10px";

    // контейнер
    const container = document.createElement("div");
    container.style.display = "none";
    container.style.gridTemplateColumns = "repeat(auto-fill, 120px)";
    container.style.gap = "10px";
    container.style.marginTop = "10px";

    select.parentNode.appendChild(button);
    select.parentNode.appendChild(container);

    let loaded = false;

    button.addEventListener("click", () => {
        container.style.display = "grid";

        if (loaded) return;
        loaded = true;

        // 🔥 ограничение (чтобы не лагало)
        const options = Array.from(select.options).slice(0, 100);

        options.forEach(option => {
            if (!option.value) return;

            const img = document.createElement("img");
            img.src = option.value; // уже полный URL
            img.loading = "lazy"; // 🔥 важно

            img.style.width = "120px";
            img.style.height = "120px";
            img.style.objectFit = "cover";
            img.style.cursor = "pointer";
            img.style.borderRadius = "8px";
            img.style.border = "2px solid transparent";

            // если уже выбрано
            if (option.selected) {
                img.style.border = "2px solid #007bff";
            }

            img.addEventListener("click", () => {
                // снять выделение
                container.querySelectorAll("img").forEach(i => {
                    i.style.border = "2px solid transparent";
                });

                // выделить
                img.style.border = "2px solid #007bff";

                // установить значение
                select.value = option.value;

                // 🔥 обновить превью
                const preview = document.querySelector("#preview-img");
                if (preview) {
                    preview.src = option.value;
                }
            });

            container.appendChild(img);
        });
    });
});