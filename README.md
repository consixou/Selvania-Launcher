# Filo Launcher

Fork public de [Selvania-Launcher](https://github.com/Luuxis/Selvania-Launcher) (Luuxis License v1.0 — voir `LICENSE.md`).

Launcher Minecraft pour **filo.helloserv.net**.

## Build 2.3.0

- Minecraft **vanilla 1.21.10** (aucun mod, aucun loader)
- Authentification **Microsoft uniquement** (joueurs premium)
- Connexion automatique à `filo.helloserv.net:25565`

## Téléchargement

Les installeurs sont publiés dans les [Releases](https://github.com/consixou/Selvania-Launcher/releases) par GitHub Actions.

| Plateforme | Fichier |
| --- | --- |
| Windows x64 | `Filo-win-x64.exe` |
| macOS | `Filo-mac-universal.dmg` |
| Linux x64 | `Filo-linux-x86_64.AppImage` |

## Config distante

Le launcher lit :

- [`docs/config.json`](docs/config.json) — `online: true` = Microsoft only
- [`docs/instances.json`](docs/instances.json) — version vanilla 1.21.10 + IP du serveur
- [`docs/articles.json`](docs/articles.json) — news du launcher
