from django.db import models

class HomePage(models.Model):
    # Сайт-музей
    museum_title = models.CharField(
        max_length=255,
        default="Сайт-музей"
    )

    museum_subtitle = models.CharField(
        max_length=255,
        default="О. А. Мелехова"
    )

    museum_text_1 = models.TextField()
    museum_text_2 = models.TextField()

    # Биография (блок на главной)
    biography_title = models.CharField(
        max_length=255,
        default="Биография"
    )

    biography_text_1 = models.TextField()
    biography_text_2 = models.TextField()

    biography_image = models.ImageField(
        upload_to="homepage/biography/",
        blank=True,
        null=True
    )

    # Творчество (блок на главной)
    creativity_title = models.CharField(
        max_length=255,
        default="Творчество"
    )

    creativity_text = models.TextField()

    creativity_button_text = models.CharField(
        max_length=100,
        default="Подробнее"
    )

    # Проект музея
    museum_project_title = models.CharField(
        max_length=255,
        default="О проекте музея"
    )

    museum_project_subtitle = models.CharField(
        max_length=255,
        default="в Светлогорске"
    )

    museum_project_text = models.TextField()
    museum_address = models.CharField(
        max_length=255
    )
    # VK блок
    vk_group_url = models.URLField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Главная страница"
        verbose_name_plural = "Главная страница"

    def __str__(self):
        return "Главная страница"

    def save(self, *args, **kwargs):
        if not self.pk and HomePage.objects.exists():
            raise ValueError(
                "Главная страница уже существует"
            )

        super().save(*args, **kwargs)

class News(models.Model):
    title = models.CharField(max_length=255)

    slug = models.SlugField(unique=True)
    short_description = models.TextField()
    content = models.TextField()
    image = models.ImageField(
        upload_to="news/"
    )
    published_at = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-published_at"]
        verbose_name = "Новость"
        verbose_name_plural = "Новости"
    def __str__(self):
        return self.title

class SiteSettings(models.Model):

    phone = models.CharField(max_length=50)
    email = models.EmailField()
    address = models.TextField()

    working_hours = models.CharField(
        max_length=100,
        blank=True
    )

    footer_text = models.TextField(
        blank=True
    )

    class Meta:
        verbose_name = "Настройки сайта"
        verbose_name_plural = "Настройки сайта"

    def save(self, *args, **kwargs):
        if not self.pk and SiteSettings.objects.exists():
            raise ValueError(
                "Настройки сайта уже существуют"
            )

        super().save(*args, **kwargs)

class BiographyPage(models.Model):
    title = models.CharField(max_length=255)
    artist_name = models.CharField(max_length=255)
    intro_text = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Биография"
        verbose_name_plural = "Биография"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.pk and BiographyPage.objects.exists():
            raise ValueError(
                "страница биографии уже существует"
            )

        super().save(*args, **kwargs)

class BiographySection(models.Model):
        biography = models.ForeignKey(
            BiographyPage,
            on_delete=models.CASCADE,
            related_name="sections"
        )
        title = models.CharField(max_length=255)
        content = models.TextField()
        order = models.PositiveIntegerField(default=0)
        class Meta:
            ordering = ["order"]

            verbose_name = "Раздел биографии"
            verbose_name_plural = "Разделы биографии"

        def __str__(self):
            return self.title

class BiographyTimeline(models.Model):
    biography = models.ForeignKey(
        BiographyPage,
        on_delete=models.CASCADE,
        related_name="timeline"
    )
    year = models.CharField(max_length=20)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)
    class Meta:
        ordering = ["order"]

        verbose_name = "Событие биографии"
        verbose_name_plural = "Хронология биографии"
    def __str__(self):
        return self.year
class Award(models.Model):
    biography = models.ForeignKey(
        BiographyPage,
        on_delete=models.CASCADE,
        related_name="awards"
    )

    title = models.CharField(max_length=255)

    year = models.CharField(
        max_length=20,
        blank=True
    )

    description = models.TextField(
        blank=True
    )

    order = models.PositiveIntegerField(
        default=0
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "Награда"
        verbose_name_plural = "Награды"

    def __str__(self):
        return self.title
class ArchivePhoto(models.Model):
    biography = models.ForeignKey(
        BiographyPage,
        on_delete=models.CASCADE,
        related_name="archive_photos"
    )

    image = models.ImageField(
        upload_to="archive/"
    )

    title = models.CharField(
        max_length=255,
        blank=True
    )

    order = models.PositiveIntegerField(
        default=0
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "Фото архива"
        verbose_name_plural = "Личный архив"

    def __str__(self):
        return self.title or f"Фото {self.id}"

class CreativityPage(models.Model):
    title = models.CharField(
        max_length=255,
        default="Творчество"
    )

    subtitle = models.TextField(
        blank=True,
        help_text="Художественный стиль, техники и темы в искусстве"
    )

    # Влияние на искусство
    influence_title = models.CharField(
        max_length=255,
        default="Влияние на современное искусство"
    )

    # Искусство Глёз
    concept_title = models.CharField(
        max_length=255,
        default="Искусство Глёз"
    )

    concept_subtitle = models.CharField(
        max_length=255,
        blank=True,
        default="Искусство сияющей Любви"
    )

    concept_text = models.TextField(
        blank=True
    )

    # Блок перехода в галерею
    gallery_block_title = models.CharField(
        max_length=255,
        default="Познакомьтесь с работами художника"
    )

    gallery_block_text = models.TextField()


    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        verbose_name = "Страница творчества"
        verbose_name_plural = "Страница творчества"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.pk and CreativityPage.objects.exists():
            raise ValueError(
                "страница творчества уже существует"
            )

        super().save(*args, **kwargs)


class CreativitySection(models.Model):
    page = models.ForeignKey(
        CreativityPage,
        on_delete=models.CASCADE,
        related_name="sections"
    )

    title = models.CharField(max_length=255)

    content = models.TextField()

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

        verbose_name = "Раздел творчества"
        verbose_name_plural = "Разделы творчества"

    def __str__(self):
        return self.title

class CreativityTechnique(models.Model):
    page = models.ForeignKey(
        CreativityPage,
        on_delete=models.CASCADE,
        related_name="techniques"
    )

    title = models.CharField(max_length=255)

    description = models.TextField()

    image = models.ImageField(
        upload_to="creativity/techniques/",
        blank=True,
        null=True
    )

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

        verbose_name = "Техника"
        verbose_name_plural = "Техники"

    def __str__(self):
        return self.title

class CreativityTheme(models.Model):
    page = models.ForeignKey(
        CreativityPage,
        on_delete=models.CASCADE,
        related_name="themes"
    )

    title = models.CharField(max_length=255)

    description = models.TextField()

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

        verbose_name = "Тема творчества"
        verbose_name_plural = "Темы творчества"

    def __str__(self):
        return self.title

class ContactsPage(models.Model):
    title = models.CharField(
        max_length=255,
        default="Контакты"
    )

    subtitle = models.TextField(
        blank=True,
        default="Свяжитесь с нами по любым вопросам"
    )

    form_title = models.CharField(
        max_length=255,
        default="Отправить сообщение"
    )

    consent_text = models.CharField(
        max_length=255,
        default="Я соглашаюсь на обработку персональных данных."
    )

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Страница контактов"
        verbose_name_plural = "Страница контактов"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.pk and ContactsPage.objects.exists():
            raise ValueError(
                "страница контактов уже существует"
            )

        super().save(*args, **kwargs)

class ContactTopic(models.Model):
    page = models.ForeignKey(
        ContactsPage,
        on_delete=models.CASCADE,
        related_name="topics"
    )

    title = models.CharField(max_length=255)

    description = models.TextField()

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title