---
title: 'popup'
---

## Что получится

Собственный Popup размером 300 × 200 с заголовком, текстом и стандартной кнопкой закрытия.

## Подготовка

Используйте проект из урока «Первый мод» с SDK 5.10.1 и настроенной сборкой. Для поиска bottom-menu нужна зависимость geode.node-ids из этого проекта. Примеры ниже заменяют учебный код, а не добавляются рядом с другим определением TutorialMenu.

[First mod](/ru/v5/get-started/first-mod) · [Button](/ru/v5/tutorials/buttons)

## Полный пример

Вставьте класс перед TutorialMenu в src/main.cpp из предыдущего урока. Замените только тело onTutorial кодом открытия ниже.

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/ui/Popup.hpp>
using namespace geode::prelude;

class TutorialPopup : public Popup {
protected:
    bool init() {
        if (!Popup::init(300.f, 200.f)) return false;
        setTitle("My popup");
        auto message = CCLabelBMFont::create("Hello, modder!", "bigFont.fnt");
        message->setScale(0.5f);
        message->setPosition({150.f, 100.f});
        m_mainLayer->addChild(message);
        return true;
    }
public:
    static TutorialPopup* create() {
        auto result = new TutorialPopup();
        if (result->init()) {
            result->autorelease();
            return result;
        }
        delete result;
        return nullptr;
    }
};
```

## Как это работает

Popup::init создаёт основу окна. Добавляйте свои узлы в m_mainLayer: координаты здесь относятся к окну, а не к экрану. create проверяет init, ставит успешный объект на autorelease и удаляет его при ошибке. В SDK 5.10.1 используется Popup без шаблонных аргументов; старые примеры с Popup<> и setup не подходят к этому заголовку.

## Откройте окно

```cpp
void onTutorial(CCObject*) {
    if (auto popup = TutorialPopup::create()) {
        popup->show();
    }
}
```

## Проверьте результат

Соберите мод, нажмите учебную кнопку. Проверьте заголовок, текст, крестик закрытия и повторное открытие. Попробуйте Escape/Back и другой размер окна игры.

## Если не работает

Окно не показывается: create само по себе не открывает его, нужен show. Ошибка Popup<> или initAnchored: не смешивайте старый API с v5. Текст смещён: используйте локальные координаты m_mainLayer. Не удаляйте вручную объект после autorelease.

Сигнатуры сверены с исходниками SDK 5.10.1. Эти примеры не компилировались и не запускались в Geometry Dash в данной среде.

## Дальше

[Button](/ru/v5/tutorials/buttons) · [Popup](/ru/v5/tutorials/popup) · [ScrollLayer](/ru/v5/tutorials/scroll-layer)

[Geode example mod](https://github.com/geode-sdk/example-mod) · [Popup.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/Popup.hpp) · [ScrollLayer.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/ui/ScrollLayer.hpp)
