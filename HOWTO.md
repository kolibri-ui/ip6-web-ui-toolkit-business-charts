# FHNW IP6 - Interaktive Business Charts für das Kolibri Web UI Tookit

Bachelor Thesis von Valentina Giampa & Roger Kreienbühl

## Intro

Kolibri Business Charts ist die Erweiterung des Kolibri Web UI Toolkit.
Das Ziel ist ein "Sortiment von Elementen", die die Entwicklung von Webanwendungen vereinfachen.
Geschäftsanwendungen haben oft eine große Anzahl von Clients.
Der schlanke und strukturierte Aufbau des Toolkits verwendet das Projector Pattern in einer klassischen MVC-Architektur.
Dies ermöglicht eine schnelle und kostengünstige Änderung des "Look and Feel" der Geschäftsanwendung.

## Baue Geschäftsapplikationen für die Datenanalyse mit wenigen Codezeilen

Mit Kolibri Business Charts können Sie schnell interaktive Diagramme für individuelle Geschäftsanalyseanwendungen entwickeln.
Es bietet Projektoren für die baukastenartige Erstellung von Charts.
Dies gibt Entwickler*innen eine hohe Flexibilität.

## Aufbau und Verwendung des Toolkits

Es gibt verschiedene Wege das Toolkit zu verwenden. Die einfachste Möglichkeit ist, du kopierst den kompletten src-Ordner (/src) in dein Projekt und verwendest die verschiedenen Projektoren und css-Dateien. Da das Toolkit keine externen Abhängigkeiten besitzt, ist die Grösse minimal und hat somit praktisch keinen Einfluss auf die Performance.

Das Toolkit braucht lediglich plain JavaScript, HTML5, CSS und eine IDE deines Vertrauens.

### /src

Kopiere den gesamten src-Ordner in dein Projekt und du hast Zugriff auf alle Projektoren des Kolibri UI Toolkits.

#### /src/business-charts

In diesem Ordner sind alle Projektoren (/src/business-charts/projector) und Styles (/src/business-charts/css) für den Aufbau einer Charts Web App enthalten. Im utils-Ordner (/src/business-charts/utils) sind Hilfsfunktionen abgelegt, welche für die Chartprojektoren notwendig sind.

#### /src/Kolibri

Unter diesem Verzeichnis ist das gesamte [Kolibri Web UI Toolkit](https://github.com/webengineering-fhnw/Kolibri/) mit Beispielen und wiederverwendbaren Projektoren enthalten, welches für die Entwicklung der Kolibri Business Charts die Basis war. In den Business Charts Projektoren wurde zum Beispiel der [simpleInputProjector](src/Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputProjector.js) verwendet.


### /demo

Im Demo-Ordner findest du Beispiele wie die Business Charts Projektoren verwendet werden können. 

### Anleitung

Eine kurze Anleitung zur Erstellung eines Diagramms, wie es in der folgenden Abbildung dargestellt ist.
Den Code findest du unter /demo/first-steps/.

![Auscchnitt Demo App](demo/assets/images/first-steps-demo.png "DemoApp")

#### /demo/first-steps/first-steps-demo.html

1. Erstelle ein [HTML-Grundgerüst](demo/first-steps/first-steps-demo.html).
Wir empfehlen einen strukturierten Ansatz der mindestens einen Style-, Chart- und Skript-Teil enthält.
2. Um die Charts im Browser nutzen zu können, erstellst du ein div mit der class / id "container" in der **Chart-Section**.
Für die Anzeige der Datenpunkte erstellst du ein div mit der id / class "detail-view".
3. Kreiere deine Charts in einer [Javascript-Datei im type "module"](demo/first-steps/chart-demo.js).
Binde deine js-Datei in der **Script-Section** in deinem HTML ein.
4. Je nachdem welche Projektoren du verwendest, bindest du für das Styling die entsprechenden Links in der **CSS-Section** ein.

#### /demo/first-steps/chart-demo.js

In diesem Beispiel werden Projektoren verwendet für die Erstellung einer Scatter Chart
mit einer Tabellen-/Detailansicht für die Datenpunkte. Dazu brauchst du Folgendes:

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

Wie bereits erwähnt, werden die ausgewählten Datenpunkte sofort in der Detailansicht angezeigt.

### JSDoc

Für die Spezifikation der Objekte, Funktionen, etc. steht eine auf JSDoc basierende Dokumentation zur Verfügung. 
Allgemeine Informationen über den Dokumentengenerator findest du auf der Website von [JSDoc](https://jsdoc.app/index.html).