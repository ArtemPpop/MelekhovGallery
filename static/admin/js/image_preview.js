document.addEventListener("DOMContentLoaded", function () {
    const select = document.querySelector("#id_s3_image");
    if (!select) return;

    select.style.display = "none";

    const options = Array.from(select.options).filter(o => o.value);

    let filtered = [...options];
    let currentPage = 0;
    const perPage = 25;

    //  КНОПКА
    const button = document.createElement("button");
    button.innerText = "📂 Выбрать из S3";
    button.type = "button";
    button.style.marginTop = "10px";

    //  ПОИСК (фикс ширины)
    const search = document.createElement("input");
    search.placeholder = "Поиск...";
    search.style.display = "none";
    search.style.marginTop = "10px";
    search.style.padding = "6px";
    search.style.width = "250px";

    //  КОНТЕЙНЕР СЕТКИ
    const container = document.createElement("div");
    container.style.display = "none";
    container.style.gridTemplateColumns = "repeat(5, 1fr)";
    container.style.gap = "10px";
    container.style.marginTop = "10px";

    //  ПАГИНАЦИЯ
    const pagination = document.createElement("div");
    pagination.style.marginTop = "10px";
    pagination.style.display = "none";

    const prevBtn = document.createElement("button");
    prevBtn.innerText = "←";

    const nextBtn = document.createElement("button");
    nextBtn.innerText = "→";

    const pageInfo = document.createElement("span");
    pageInfo.style.margin = "0 10px";

    pagination.appendChild(prevBtn);
    pagination.appendChild(pageInfo);
    pagination.appendChild(nextBtn);

    select.parentNode.appendChild(button);
    select.parentNode.appendChild(search);
    select.parentNode.appendChild(container);
    select.parentNode.appendChild(pagination);

    let opened = false;

    //  РЕНДЕР
    function render() {
        container.innerHTML = "";

        const start = currentPage * perPage;
        const pageItems = filtered.slice(start, start + perPage);

        pageItems.forEach(option => {
            const wrapper = document.createElement("div");
            wrapper.style.textAlign = "center";

            const img = document.createElement("img");
            img.src = option.value;
            img.style.width = "100%";
            img.style.height = "100px";
            img.style.objectFit = "cover";
            img.style.cursor = "pointer";
            img.style.borderRadius = "6px";
            img.style.border = option.selected
                ? "2px solid #007bff"
                : "2px solid transparent";

            // название
            const label = document.createElement("div");
            label.innerText = option.text;
            label.style.fontSize = "12px";
            label.style.marginTop = "4px";
            label.style.whiteSpace = "nowrap";
            label.style.overflow = "hidden";
            label.style.textOverflow = "ellipsis";

            img.addEventListener("click", () => {
                container.querySelectorAll("img").forEach(i => {
                    i.style.border = "2px solid transparent";
                });

                img.style.border = "2px solid #007bff";
                select.value = option.value;

                const preview = document.querySelector("#preview-img");
                if (preview) preview.src = option.value;
            });

            wrapper.appendChild(img);
            wrapper.appendChild(label);
            container.appendChild(wrapper);
        });

        const totalPages = Math.ceil(filtered.length / perPage);
        pageInfo.innerText = `Страница ${currentPage + 1} / ${totalPages}`;
    }

    //  ОТКРЫТИЕ
    button.addEventListener("click", () => {
        opened = !opened;

        container.style.display = opened ? "grid" : "none";
        search.style.display = opened ? "block" : "none";
        pagination.style.display = opened ? "block" : "none";

        if (opened) render();
    });

    //  ПОИСК
    search.addEventListener("input", () => {
        const q = search.value.toLowerCase();

        filtered = options.filter(o =>
            o.text.toLowerCase().includes(q)
        );

        currentPage = 0;
        render();
    });

    //  ПАГИНАЦИЯ
    prevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            render();
        }
    });

    nextBtn.addEventListener("click", () => {
        if ((currentPage + 1) * perPage < filtered.length) {
            currentPage++;
            render();
        }
    });
});