# Room Modules

Ce dossier contient les modules **spécifiques** à chaque room qui ne sont PAS réutilisables ailleurs.

## Structure

```
room-modules/
├── atelier/       # Modules spécifiques à l'Atelier
├── forge/         # Modules spécifiques à la Forge
├── laboratoire/   # Modules spécifiques au Laboratoire
└── ...           # Etc pour chaque room
```

## Différence avec widgets/

- **widgets/** : Composants réutilisables (MindLog, ActionList, etc.)
- **room-modules/** : Composants ultra-spécifiques à une room

## Exemple

Si l'Atelier a besoin d'un composant "WorkbenchConfigurator" qui n'a de sens QUE dans l'Atelier, il va ici.
Si c'est un composant générique comme une TodoList, il va dans widgets/.