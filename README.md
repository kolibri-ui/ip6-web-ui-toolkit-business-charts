# FHNW IP6 - Interaktive Business Charts für das Kolibri Web UI Tookit

Bachelor Thesis von Valentina Giampa & Roger Kreienbühl

## Baue Geschäftsapplikationen für die Datenanalyse mit wenigen Codezeilen

Das Kolibri Web UI Toolkit eliminiert wiederkehrende Arbeit, indem es dir ermöglicht Web-Applikationen mit wenigen Codezeilen aufzubauen. Der schlanke und strukturierte Aufbau des Toolkits mit der Anwendung des [Projctor Patterns](https://dierk.github.io/Home/projectorPattern/ProjectorPattern.html) gibt dir die Möglichkeit auf einfache und schnelle Art interaktive Charts für Geschäftsanwendungen zu programmieren.
Durch die Trennung der Daten und Businesslogik von der View kann mit wenigen Klicks ein anderes Erscheinungsbild kreiert werden.

## Aufbau und Verwendung des Toolktis

Es gibt verschiedene Wege das Toolkit zu verwenden. Die einfachste Möglichkeit ist, du kopierst den kompletten src-Ordner (/src) in dein Projekt und verwendest die verschiedenen Projektoren und css-Dateien. Da das Toolkit keine externen Abhängigkeiten besitzt, ist die Grösse minimal und hat somit praktisch keinen Einfluss auf die Performance.

Das Toolkit braucht lediglich plain JavaScript, HTML5, CSS und eine IDE deines Vertrauens.

### /src

Kopiere den gesamten src-Ordner in dein Projekt und du hast Zugriff auf alle Projektoren des Kolibri UI Toolkits.

#### /src/business-charts

In diesem Ordner sind alle Projektoren (/src/business-charts/projector) und Styles (/src/business-charts/css) für den Aufbau einer Charts Web App enthalten. Im utils-Ordner (/src/business-charts/utils) sind Hilfsfunktionen abgelegt, welche für die Chartprojektoren notwendig sind.

#### /src/Kolibri

Hier ist das gesamte Kolibri Web UI Toolkit mit Beispielen und wiederverwendbaren Projektoren enthalten. In den Business Charts Projektoren wurde zum Beispiel der [simpleInputProjector](src/Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputProjector.js) verwendet.


### /demo

Im Demo-Ordner findest du Beispiele wie die Business Charts Projektoren verwendet werden können. 

Hier eine kleine Anleitung wie du in wenigen Schritten eine Chart aufgebaut hast.

#### /demo/first-steps/first-steps-demo.html

1. Erstelle ein [HTML-Grundgerüst](demo/first-steps/first-steps-demo.html). Du brauchst mindestens eine CSS-Section, Chart-Section und Script-Section.
2. Um die Charts im Browser nutzen zu können, erstellst du ein div mit der class / id "container" in der **Chart-Section**. Für die Anzeige der Datenpunkte erstellst du ein div mit der id / class "detail-view".
2. Kreiere deine Charts in einer [Javascript-Datei im type "module"](demo/first-steps/chart-demo.js) und binde deine js-Datei in der **Script-Section** in deinem HTML ein.
3. Je nachdem welche Projektoren du verwendest, bindest du für das Styling die entsprechenden Files in der **CSS-Section** ein.

#### /demo/first-steps/chart-demo.js

In diesem Beispiel verwendest du Projektoren für die Erstellung einer Scatter Chart mit einer Tabellen-/Detailansicht für die Datenpunkte. 
Dazu brauchst du Folgendes:

Import der benötigten Module
``` js
import { SimpleScatterChart }           from "../../src/business-charts/projector/simpleScatterChart/simpleScatterChartProjector.js";
import { SimpleScatterChartController } from "../../src/business-charts/projector/simpleScatterChart/simpleScatterChartController.js";
import { DataTableView }                from "../../src/business-charts/projector/dataTableView/dataTableViewProjector.js";
import { SimpleDetailView }             from "../../src/business-charts/projector/simpleDetailView/simpleDetailViewProjector.js";
```

Ein Daten-Array vom Typ "ScatterChartDataElement"
``` js
/** @type { Array.<ScatterChartDataElement> } */ const data = [ {
name: 'A', xValue: -4, yValue: 3,
}, {
name: 'B', xValue: -3, yValue: 2,
}, ];
```

Einen Chart Controller, welchem du die Daten übergibst
``` js
const controller = SimpleScatterChartController(
    data
);
```

Eine HTML-Anbindung der Chart-, Table- und Detailview-Projektoren 
``` js
document.getElementById('container').append(SimpleScatterChart(controller));

const detailView = document.getElementById('detail-view');
detailView.append(DataTableView(controller, 'Datenpunkte'), SimpleDetailView(controller));
```

Führe dein HTML aus und teste die Features!

## Features

Hier erhältst du einen kurzen Überblick über die Funktionalitäten, welche dir das Toolkit bietet.

### Zooming

Via Toolbar kannst du in den Chartbereich schrittweise herein- und herauszoomen. 
Möchtest du einen bestimmten Bereich sehen, kannst du mittels Rubber Band Zooming deinen gewünschten Ausschnitt wählen. Im Chart wird umgehend in den gewünschten Bereich gezoomt sowie die Achsen angepasst.

### Panning

Veschiebe den Ausschnitt des Charts entweder via Toolbar (panning), indem du im Chart mit gedrückter Maustaste den Ausschnitt sowohl horizontal wie auch vertikal verschiebst. Alternativ kannst du via Achse (im Beispiel ist es die horizontale Achse) ebenfalls mit gedrückter Maustaste den Bereich horizontal verschieben.

### Min-Max Range on Axes

Direkteingabe des Ausschnitts auf der Achse. 
Im Beispiel kannst du auf der vertikalen Achse via Inputfelder die Ober- und Untergrenze direkt ändern. Der Chartbereich ändert sich umgehend.
Auf der horizontalen Achse kannst du via Verschieben des linken oder rechten Bereichs die Grenzen ändern.

### Tooltip / Bubble Tooltip

Sobald der Mauszeiger auf einem Datenpunkt ist, erscheint ein Tooltip mit Informationen zum entsprechenden Punkt.

### Select

Selektiere einen Punkt in der Chartansicht. Die Tabelle und die Detailansicht werden umgehend angepasst.

### Multi Selection in Table View

Selektiere mehrere Datenpunkte via Tabellenansicht (⌘ Klick auf Datenpunkte).

### Table View

Beim Selektieren von Datenpunkten werden die selektierten Punkte in der Tabelle markiert.
Umgekehrt werden die in der Tabelle selektierten Punkte im Chart markiert und mit der Detailansicht synchronisiert.

### Detail View

Beim Selektieren von Datenpunkten wird die Detailansicht umgehend aktualisiert.

## Datasets für Charts:

- [Wochenstatistik Elektrizitätsbilanz - Erzeugung und Abgabe elektrischer Energie in der Schweiz](https://opendata.swiss/de/dataset/wochenstatistik-elektrizitatsbilanz-erzeugung-und-abgabe-elektrischer-energie-in-der-schweiz)
- [Elektrizitätserzeugung](https://opendata.swiss/de/dataset/elektrizitatserzeugung)
- [Elektrizitätsproduktionsanlagen](https://opendata.swiss/de/dataset/elektrizitatsproduktionsanlagen)

