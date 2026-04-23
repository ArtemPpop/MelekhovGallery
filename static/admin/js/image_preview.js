document.addEventListener("DOMContentLoaded", function () {
    const select = document.querySelector("#id_s3_image");
    if (!select) return;

    const S3_BASE = "https://storage.yandexcloud.net/artworks";

    select.style.display = "none";

    const container = document.createElement("div");
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(auto-fill, 120px)";
    container.style.gap = "10px";
    container.style.marginTop = "10px";

    select.parentNode.appendChild(container);

    Array.from(select.options).forEach(option => {
        if (!option.value) return;

        const img = document.createElement("img");

        // 🔥 ВАЖНО — абсолютный URL
        img.src = `${S3_BASE}/${option.value}`;

        img.style.width = "120px";
        img.style.height = "120px";
        img.style.objectFit = "cover";
        img.style.cursor = "pointer";
        img.style.border = "2px solid transparent";

        if (option.selected) {
            img.style.border = "2px solid #007bff";
        }

        img.addEventListener("click", () => {
            container.querySelectorAll("img").forEach(i => {
                i.style.border = "2px solid transparent";
            });

            img.style.border = "2px solid #007bff";

            select.value = option.value;

            // 🔥 ВАЖНО — триггерим change
            select.dispatchEvent(new Event("change"));
        });

        container.appendChild(img);
    });

    // 🔥 ГЛОБАЛЬНАЯ функция (чтобы не было ошибки)
    window.updatePreview = function(select) {
        const preview = document.getElementById("preview-img");
        if (!preview) return;

        if (!select.value) {
            preview.style.display = "none";
            return;
        }

        preview.src = `${S3_BASE}/${select.value}`;
        preview.style.display = "block";
    };
});