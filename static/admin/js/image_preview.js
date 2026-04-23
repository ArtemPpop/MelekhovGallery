document.addEventListener("DOMContentLoaded", function () {
    const select = document.querySelector("#id_s3_image");
    if (!select) return;

    select.style.display = "none";

    const options = Array.from(select.options).filter(o => o.value);

    let filtered = [...options];
    let currentPage = 0;
    const perPage = 25;

    // КНОПКА
    const button = document.createElement("button");
    button.innerText = "📁 Выбрать из S3";
    button.type = "button";
    button.style.marginTop = "10px";

    // ПОИСК
    const search = document.createElement("input");
    search.placeholder = "Поиск...";
    search.style.padding = "6px";
    search.style.width = "250px";

    // СЕТКА
    const container = document.createElement("div");
    container.style.display = "none";
    container.style.gridTemplateColumns = "repeat(auto-fill, 120px)"; //  адаптив
    container.style.gap = "10px";
    container.style.marginTop = "10px";
    container.style.justifyContent = "start"; // 🔥 фикс
    container.style.overflowX = "auto";       // 🔥 фикс
    container.style.maxWidth = "700px";       // 🔥 чтобы не ломало админку

    // ПАГИНАЦИЯ
    const prevBtn = document.createElement("button");
    prevBtn.innerText = "←";

    const nextBtn = document.createElement("button");
    nextBtn.innerText = "→";

    const pageInfo = document.createElement("span");

    //  ОБЩИЙ КОНТЕЙНЕР ДЛЯ КНОПОК
    const controls = document.createElement("div");
    controls.style.display = "none";
    controls.style.alignItems = "center";
    controls.style.gap = "10px";
    controls.style.flexWrap = "wrap";
    controls.style.marginTop = "10px";

    controls.appendChild(search);
    controls.appendChild(prevBtn);
    controls.appendChild(pageInfo);
    controls.appendChild(nextBtn);

    // вставка
    select.parentNode.appendChild(button);
    select.parentNode.appendChild(controls);
    select.parentNode.appendChild(container);

    let opened = false;

    //  РЕНДЕР
    function render() {
        container.innerHTML = "";

        const start = currentPage * perPage;
        const pageItems = filtered.slice(start, start + perPage);

        pageItems.forEach(option => {
            const wrapper = document.createElement("div");
            wrapper.style.textAlign = "center";
            wrapper.style.width = "120px";

            const img = document.createElement("img");
            img.src = option.value;
            img.loading = "lazy";

            img.style.width = "120px";
            img.style.height = "100px";
            img.style.objectFit = "cover";
            img.style.cursor = "pointer";
            img.style.borderRadius = "6px";
            img.style.border = option.selected
                ? "2px solid #007bff"
                : "2px solid transparent";

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

        const totalPages = Math.ceil(filtered.length / perPage) || 1;
        pageInfo.innerText = `Страница ${currentPage + 1} / ${totalPages}`;
    }

    //  ОТКРЫТИЕ
    button.addEventListener("click", () => {
        opened = !opened;

        container.style.display = opened ? "grid" : "none";
        controls.style.display = opened ? "flex" : "none";

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

    // ПАГИНАЦИЯ
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