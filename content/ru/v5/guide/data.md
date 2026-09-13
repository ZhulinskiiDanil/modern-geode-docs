---
title: 'data'
---

## Настройки или сохранённые значения?

Settings — пользовательские настройки из mod.json. Saved values — состояние, которым управляет код, например факт показа tutorial. Пользовательскую настройку не стоит заставлять менять вручную в JSON.

## Полный пример сохранения

Нужны созданный проект, понимание hooks и bool. Замените src/main.cpp, соберите и установите:

```cpp [src/main.cpp]
#include <Geode/Geode.hpp>
#include <Geode/modify/MenuLayer.hpp>
using namespace geode::prelude;

class $modify(MenuLayer) {
    bool init() {
        if (!MenuLayer::init()) return false;
        auto mod = Mod::get();
        bool wasSeen = mod->getSavedValue<bool>("menu-seen", false);
        log::info("Menu was seen before: {}", wasSeen);
        mod->setSavedValue<bool>("menu-seen", true);
        return true;
    }
};
```

При первом чтении используется false. После появления меню записываем true. Предыдущее значение выводим в лог.

## Проверка результата

В чистом сохранении первый результат — false. Нормально завершите игру и запустите снова: ожидается true. Данные сохраняются в цикле сохранения Geode; падение игры не гарантирует запись на диск.

## Metadata и settings

mod.json задаёт ID, совместимость с SDK и игрой, dependencies, resources и settings. Читайте настройку с типом, соответствующим её объявлению. Saved boolean и settings boolean с одинаковым ключом — разные сущности.

## Сложные данные и ошибки

Версионируйте схему сложного JSON. Проверяйте поля и обрабатывайте отсутствующие значения при обновлении мода. Смена ID может отделить мод от прежних данных. Не предполагайте успешное чтение повреждённого значения или другого типа.

## Следующий шаг

Добавьте полезную настройку для кнопки. Перед добавлением нового типа settings проверьте точную схему в официальном справочнике.

[Mod.hpp v5.10.1](https://github.com/geode-sdk/geode/blob/v5.10.1/loader/include/Geode/loader/Mod.hpp#L267) · [Справочник mod.json](https://docs.geode-sdk.org/mods/configuring/)
