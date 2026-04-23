document.addEventListener("DOMContentLoaded", function () {
    const select = document.querySelector("#id_s3_image");
    if (!select) return;

    select.style.display = "none";

    const options = Array.from(select.options).filter(o => o.value);

    let visibleCount = 20;
    let filtered = [...options];

    //  КНОПКА
    const button = document.createElement("button");
    button.innerText = "📂 Выбрать из S3";
    button.type = "button";
    button.style.marginTop = "10px";

    //  ПОИСК
    const search = document.createElement("input");
    search.placeholder = "Поиск...";
    search.style.display = "none";
    search.style.marginTop = "10px";
    search.style.padding = "5px";
    search.style.width = "300px";

    //  КОНТЕЙНЕР
    const container = document.createElement("div");
    container.style.display = "none";
    container.style.gridTemplateColumns = "repeat(auto-fill, 120px)";
    container.style.gap = "10px";
    container.style.marginTop = "10px";

    select.parentNode.appendChild(button);
    select.parentNode.appendChild(search);
    select.parentNode.appendChild(container);

    let opened = false;

    //  РЕНДЕР
    function render() {
        container.innerHTML = "";

        filtered.slice(0, visibleCount).forEach(option => {
            const img = document.createElement("img");
            img.src = option.value;
            img.loading = "lazy";

            img.style.width = "120px";
            img.style.height = "120px";
            img.style.objectFit = "cover";
            img.style.cursor = "pointer";
            img.style.borderRadius = "8px";
            img.style.transition = "0.2s";
            img.style.border = option.selected
                ? "2px solid #007bff"
                : "2px solid transparent";

            // hover эффект
            img.addEventListener("mouseenter", () => {
                img.style.transform = "scale(1.05)";
            });
            img.addEventListener("mouseleave", () => {
                img.style.transform = "scale(1)";
            });

            // выбор
            img.addEventListener("click", () => {
                container.querySelectorAll("img").forEach(i => {
                    i.style.border = "2px solid transparent";
                });

                img.style.border = "2px solid #007bff";
                select.value = option.value;

                const preview = document.querySelector("#preview-img");
                if (preview) preview.src = option.value;
            });

            container.appendChild(img);
        });
    }

    //  ОТКРЫТИЕ
    button.addEventListener("click", () => {
        opened = !opened;

        container.style.display = opened ? "grid" : "none";
        search.style.display = opened ? "block" : "none";

        if (opened) render();
    });

    //  ПОИСК
    search.addEventListener("input", () => {
        const q = search.value.toLowerCase();

        filtered = options.filter(o =>
            o.text.toLowerCase().includes(q)
        );

        visibleCount = 20;
        render();
    });

    //  LAZY LOAD (SCROLL)
    container.addEventListener("scroll", () => {
        container.style.maxHeight = "400px";
        container.style.overflowY = "auto";
        if (

            container.scrollTop + container.clientHeight >=
            container.scrollHeight - 50

        )

        {
            visibleCount += 20;
            render();
        }
    });
});