# FHNW IP6 - Interaktive Business Charts für das Kolibri Web UI Tookit

Bachelor Thesis von Valentina Giampa & Roger Kreienbühl

## Ausgangslage

Für Geschäftsapplikationen sind Datenvisualisierungstools ein wichtiger Bestandteil. 
Bisherige Chart-Libraries bieten zwar verschiedene Chart-Typen, es fehlt jedoch ein Toolkit für interaktive Charts mit klassichem [MVC-Aufbau](https://ieeexplore.ieee.org/abstract/document/950428), damit die Daten und Logik vom "Aussehen" der Applikation getrennt sind.
Besonders im Geschäftsumfeld, wo viele Endgeräte im Einsatz sind, ist die Trennung der View wichtig, damit diese mit wenig Aufwand angepasst werden kann.

## Ziel der Arbeit

Erweiterung des bestehenden [Kolibri Web UI Toolkits](https://github.com/WebEngineering-FHNW/Kolibri) mit [Projektoren](https://dierk.github.io/Home/projectorPattern/ProjectorPattern.html) für die Datenvisualisierung, welche die Möglichkeit bieten Analysetools schnell und einfach zu bauen, individuell zu erweitern und beliebig auszutauschen.

## Ergebnisse

Interaktionskonzept

Implementation von Projektoren als wiederverwendbare Chart-Elemente:
- Chart Projektoren
- Toolbar Projektor
- Achsen Projektoren
- Tooltip Projektoren
- Table View Projektor
- Detail View Projektor

[Demo](demo/howto.html)

## Datasets für Charts:

- [Wochenstatistik Elektrizitätsbilanz - Erzeugung und Abgabe elektrischer Energie in der Schweiz](https://opendata.swiss/de/dataset/wochenstatistik-elektrizitatsbilanz-erzeugung-und-abgabe-elektrischer-energie-in-der-schweiz)
- [Elektrizitätserzeugung](https://opendata.swiss/de/dataset/elektrizitatserzeugung)
- [Elektrizitätsproduktionsanlagen](https://opendata.swiss/de/dataset/elektrizitatsproduktionsanlagen)