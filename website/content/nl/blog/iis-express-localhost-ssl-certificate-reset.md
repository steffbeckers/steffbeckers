---
title: IIS Express 10 localhost SSL-certificaat resetten
description: Handleiding over hoe je je localhost SSL-certificaat voor IIS Express 10 opnieuw instelt.
head:
  meta:
    - name: keywords
      content: Handleiding, hoe, resetten, IIS, Express, HTTPS, SSL, Certificaat, .NET, API, Visual Studio, VS, Steff, Beckers, Blog
date: "2021-03-26T20:48:00Z"
tags: ["dev", "tutorial", "dotnet", "visual-studio", "iis-express", "ssl"]
---

## Broncode

Snel testproject in .NET Web API om het probleem te reproduceren, op te lossen en te controleren of alles weer werkt:

https://github.com/steffbeckers/iis-express-ssl-reset-test

## Probleem

Tijdens het uitvoeren van een testproject in .NET Web API via IIS Express is de site op https://localhost:... niet bereikbaar of verschijnt een foutmelding zoals "ongeldig SSL-certificaat".

![Visual Studio draait een Web API met IIS Express screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/visual-studio-running-web-api-with-iis-express.png)

![Deze site is niet bereikbaar screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/this-site-cant-be-reached-localhost-refused-to-connect.png)

Maar als we de API via Kestrel starten, werkt de site wél correct.

![Visual Studio draait een Web API met Kestrel screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/visual-studio-running-web-api-with-kestrel.png)

![Test Web API swagger UI screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/web-api-swagger.png)

Of misschien werkt het voor jou zelfs dan nog niet.

## Oplossing

### Stap 1: Verwijder alle localhost-certificaten

Open Windows Certificaatbeheer door te zoeken naar "certificaat" en kies "Gebruikerscertificaten beheren".

![Windows zoekopdracht certificaat screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/windows-search-certificate.png)

Verwijder alle localhost-certificaten in de map "Persoonlijk/Certificaten".

![Certificaatbeheer gebruiker persoonlijk screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/certificate-manager-user-personal.png)

Verwijder ook alle localhost-certificaten in "Vertrouwde basiscertificeringsinstanties/Certificaten".

![Certificaatbeheer gebruiker vertrouwde root screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/certificate-manager-user-trusted-root.png)

Doe nu hetzelfde voor de certificaten van de lokale computer:

![Windows zoekopdracht computer certificaat screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/windows-search-computer-certificate.png)

![Certificaatbeheer computer persoonlijk screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/certificate-manager-computer-personal.png)

![Certificaatbeheer computer vertrouwde root screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/certificate-manager-computer-trusted-root.png)

### Stap 2: Gebruik de IIS Express admin CLI

Open een nieuw PowerShell- of cmd-venster als Administrator (met verhoogde rechten).

Navigeer naar de IIS Express-installatiemap:

```powershell
cd "C:\Program Files (x86)\IIS Express"
```

Voer nu het volgende commando uit om het SSL-certificaat opnieuw in te stellen.
**Pas het poortnummer aan** aan je eigen project:

```powershell
./IisExpressAdminCmd.exe setupsslUrl -url:https://localhost:44321/ -UseSelfSigned
```

Je zou nu de volgende uitvoer moeten zien:

![Windows Terminal reset IIS Express SSL screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/windows-terminal-reset-iis-express-ssl.png)

### Stap 3: Herstart Visual Studio

Zorg dat je Visual Studio opnieuw opstart, dit sluit ook IIS Express af.

### Stap 4: Start je applicatie opnieuw via IIS Express

Selecteer IIS Express in je debug-configuratie en start de applicatie.

Je zou nu een pop-up moeten krijgen om het nieuw aangemaakte, zelfondertekende SSL-certificaat voor je localhost-app te vertrouwen. Kies "Ja" om het te vertrouwen.

![Visual studio running a Web API with IIS Express SSL pop-up screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/visual-studio-running-web-api-with-iis-express-ssl-popup.png)

Daarna volgt een beveiligingswaarschuwing. Kies "Ja" om het certificaat te installeren.

![Visual studio running a Web API with IIS Express SSL pop-up warning screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/visual-studio-running-web-api-with-iis-express-ssl-popup-warning.png)

Na installatie zou de applicatie correct moeten starten en is het SSL-probleem verholpen.

Je ziet nu de boodschap "Application started ..." in het Uitvoer-venster van Visual Studio:

![Visual studio running a Web API with IIS Express with output screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/visual-studio-running-web-api-with-iis-express-with-output.png)

Navigeer nu naar de webpagina om te testen of het SSL-certificaat werkt:

https://localhost:44321/swagger

![Test Web API swagger UI screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/web-api-swagger.png)

## Aanvulling 31/03/2021

Bekijk ook deze GitHub Gist:

https://gist.github.com/camieleggermont/5b2971a96e80a658863106b21c479988

Dit PowerShell-script genereert een nieuw certificaat, verwijdert oude SSL-koppelingen van IIS Express en voegt het nieuw gegenereerde certificaat toe. Het certificaat wordt ook toegevoegd aan de Trusted Root Certification Authorities.

```powershell
$cert = New-SelfSignedCertificate -DnsName "localhost", "localhost" -CertStoreLocation "cert:\LocalMachine\My" -NotAfter (Get-Date).AddYears(5)
$thumb = $cert.GetCertHashString()

For ($i=44300; $i -le 44399; $i++) {
    netsh http delete sslcert ipport=0.0.0.0:$i
}

For ($i=44300; $i -le 44399; $i++) {
    netsh http add sslcert ipport=0.0.0.0:$i certhash=$thumb appid=`{214124cd-d05b-4309-9af9-9caa44b2b74a`}
}

$StoreScope = 'LocalMachine'
$StoreName = 'root'

$Store = New-Object  -TypeName System.Security.Cryptography.X509Certificates.X509Store  -ArgumentList $StoreName, $StoreScope
$Store.Open([System.Security.Cryptography.X509Certificates.OpenFlags]::ReadWrite)
$Store.Add($cert)

$Store.Close()
```

Dit kan helpen om SSL-certificaten in de IIS Express-poortreeks 44300–44399 volledig te resetten. Vergeet niet om PowerShell als Administrator te openen.
