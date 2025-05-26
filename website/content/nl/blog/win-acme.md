---
title: IIS SSL-certificaten met Let's Encrypt
description: win-acme is een ACMEv2-client voor Windows die eenvoudig te gebruiken is voor beginners, maar krachtig genoeg om mee te groeien in bijna elk scenario.
head:
  meta:
    - name: keywords
      content: win-acme, Windows, Server, Webserver, Lets, Encrypt, Lets Encrypt, Let's Encrypt, HTTPS, Gratis, SSL, Certificaat, Steff, Beckers, Blog
date: "2021-01-25T20:38:00Z"
tags: ["ops", "lets-encrypt", "ssl", "windows", "tools"]
---

## Installatie

https://www.win-acme.com/

https://github.com/win-acme/win-acme/releases/

Gebruik bij voorkeur het bestand `*.x64.trimmed.zip`.

## Gebruik

Open een PowerShell-venster als administrator in de win-acme map en voer het volgende uit:

```powershell
.\wacs.exe

```

![win-acme Usage screenshot](/blog/win-acme/images/win-acme-usage.png)
