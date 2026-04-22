document.addEventListener("DOMContentLoaded", function () {
    const select = document.querySelector("#id_s3_image");
    if (!select) return;

    select.style.display = "none";

    const container = document.createElement("div");
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(auto-fill, 120px)";
    container.style.gap = "10px";
    container.style.marginTop = "10px";

    select.parentNode.appendChild(container);



    // --- ПРЕВЬЮ ---
    const livePreview = document.createElement("img");
    livePreview.style.display = "block";
    livePreview.style.marginTop = "15px";
    livePreview.style.maxHeight = "200px";
    livePreview.style.borderRadius = "8px";

    select.parentNode.appendChild(livePreview);

    Array.from(select.options).forEach(option => {
        if (!option.value) return;

        const img = document.createElement("img");
        img.src = option.value;
        img.style.width = "120px";
        img.style.height = "120px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px";
        img.style.cursor = "pointer";
        img.style.border = "2px solid transparent";

        // если выбрано
        if (option.selected) {
            img.style.border = "2px solid #007bff";
            livePreview.src = img.src;
        }

        img.addEventListener("click", () => {
            // снять выделение
            container.querySelectorAll("img").forEach(i => {
                i.style.border = "2px solid transparent";
            });

            // выделить
            img.style.border = "2px solid #007bff";

            // выбрать в select
            select.value = option.value;

            //  ОБНОВИТЬ ПРЕВЬЮ СРАЗУ
            livePreview.src = img.src;

            //  триггер change (важно для Django)
            select.dispatchEvent(new Event("change"));
        });

        container.appendChild(img);
    });

    // если уже выбрано (при редактировании)
    if (select.value) {
        livePreview.src = `${S3_BASE}/${select.value}`;
    }
});