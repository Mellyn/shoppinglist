# Mini-Einkaufsliste

### Umgebung/Frameworks/Tools/Bibliotheken:

- [Angular](https://angular.io) in Version 14.2.x
- [Angular Material CDK](https://material.angular.io/cdk/drag-drop/overview) (für Drag/Drop)
- [Tailwind](https://tailwindcss.com) (css)
- [FontAwesome](https://github.com/FortAwesome/angular-fontawesome) (Icons)
- [Jest](https://jestjs.io) (UnitTests)

## Umgebung

- Start lokaler Development-Server: `npm run start` (`http://localhost:4200/`)
- Projekt-Build: `npm run build` (Ordner: dist/)
- Start Tests: `npm run test`.

### IDE

- Empfohlende Plugins (falls IDE VSCode):
  - Angular Language Service (angular.ng-template)
  - Angular TypeScript Snippets (johnpapa.angular2)
  - Tailwind CSS IntelliSense (esbenp.prettier-vscode)
  - Prettier Formatter (bradlc.vscode-tailwindcss)
  - Jest (Orta.vscode-jest)

## Funktionen

- Neuer Eintrag (Neuer Eintrag, Speichern)
- Editieren (Click in den Eintrag, Bearbeiten, Speichern)
- Löschen (Delete-Button)
- Sortieren per Drag&Drop
