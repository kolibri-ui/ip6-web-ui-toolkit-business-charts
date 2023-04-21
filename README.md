# Chart à la carte
### Interaktive Business Charts für das Kolibri Web UI Toolkit

Bachelor Thesis von Valentina Giampa & Roger Kreienbühl

## Ausgangslage

Im geschäftlichen Umfeld sind Datenvisualisierungstools ein wichtiger Bestandteil.
Auf dem Markt verfügbare Frameworks und Libraries bieten zwar verschiedene Chart-Typen, diese besitzen jedoch grosse Abhängigkeiten.
Besonders dort, wo viele Endgeräte im Einsatz sind, ist die Trennung der View wichtig, damit diese mit wenig Aufwand angepasst werden kann.

## Ziel der Arbeit

Erweiterung des bestehenden [Kolibri Web UI Toolkits](https://github.com/WebEngineering-FHNW/Kolibri) mit [Projektoren](https://dierk.github.io/Home/projectorPattern/ProjectorPattern.html)
für die interaktive Datenvisualisierung, welche die Möglichkeit bieten Charts schnell und einfach zu bauen,
individuell zu erweitern und schnell auszutauschen.

## Ergebnisse

Im Rahmen dieses Projekts wurden verschiedene, mit Unit Tests geprüfte Projektoren implementiert,
um individuelle Charts einfach und schnell erstellen und anpassen zu können.
Der Code wurde mit JSDoc dokumentiert.
Desweiteren wurden [Demobeispiele](demo), 
eine [First-Steps-Anleitung](demo/first-steps/first-steps.html) 
und eine [technische Übersicht](TECHNICAL_OVERVIEW.md) erstellt.
Die Probanden erhielten den Zugang zum Code auf einem [Test-Repository](https://github.com/lavaig/business-charts-usability-testing/).
Die Probanden hatten unter anderem die Aufgabe, Charts ähnlich wie im unten gezeigten Screenshot zu erstellen.
![Auscchnitt Demo App](demo/assets/images/multiSeries.png "DemoApp")
![Auscchnitt Demo App](demo/assets/images/multiSeriesData.png "DemoApp")

Abbildung 1: Visualisierung von drei Datenserien mit unterschiedlichen Chart-Typen

### Implementierte Projektoren als wiederverwendbare Chart-Komponenten
Es wurden generelle Chartbausteine implementiert, die als wiederverwendbare Komponenten dienen:
- Toolbar Projektor
- Achsen Projektoren
- Tooltip Projektoren
- Table View Projektor
- Detail View Projektor

Bei den Chart Projektoren wird differenziert, ob es sich um eine Datenreihe (SimpleChartProjector) oder mehrere Datenserien (AdvancedChartProjector) handelt.
Weiter wird in den dazugehörigen Controllern unterschieden, ob es sich um Scatter-, Line-, Areachart oder eine Kombination dieser handelt.

### Ergebnisse des Usability Testings
Die Ergebnisse der Usability Tests bestätigen das einfache Verwenden des Toolkits aufgrund der übersichtlichen Strukturierung des Codes und der First Steps Anleitung.
Obwohl Letztere im Design ausbaufähig ist und eine Navigation fehlte, wurde sie am häufigsten genutzt.
Die Probanden schätzten das schrittweise Heranführen im Zusammenhang mit den Demobeispielen, die am zweithäufigsten konsultiert wurden.

Die Mehrheit der Testpersonen würde das Toolkit im geschäftlichen Umfeld in Betracht ziehen, wenn
- ein einfacher Datenimport möglich wäre
- weitere, "Advanced"-Projektoren zur Verfügung stünden
- es kompatibel und einfach einsetzbar mit anderen Frameworks wäre

