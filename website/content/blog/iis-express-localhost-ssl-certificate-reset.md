---
title: IIS Express 10 localhost SSL certificate reset
description: Tutorial on how to reset your localhost SSL certificate for IIS Express 10.
head:
  meta:
    - name: keywords
      content: Tutorial, how to, reset, IIS, Express, HTTPS, SSL, Certificate, .NET, API, Visual Studio, VS, Steff, Beckers, Blog
date: "2021-03-26T20:48:00Z"
tags: ["dev", "tutorial", "dotnet", "visual-studio", "iis-express", "ssl"]
---

## Source code

Quick test .NET Web API project to test the problem, fix the issue and check if it's working again.

https://github.com/steffbeckers/iis-express-ssl-reset-test

## Problem

While running a test .NET Web API using IIS Express, the https://localhost:... site can't be reached or some other error like "invalid SSL certificate".

![Visual studio running a Web API with IIS Express screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/visual-studio-running-web-api-with-iis-express.png)

![This site can't be reached screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/this-site-cant-be-reached-localhost-refused-to-connect.png)

But if we run the API with Kestrel, the site just works fine.

![Visual studio running a Web API with Kestrel screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/visual-studio-running-web-api-with-kestrel.png)

![Test Web API swagger UI screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/web-api-swagger.png)

Or maybe this isn't even working for you.

## Solution

### Step 1: Cleanup all localhost certificates

Open the Windows Certificate Manager by searching for "certificate". Choose "Manage user certificates".

![Windows search certificate screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/windows-search-certificate.png)

Select all localhost certificates in the "Personal/Certificates" folder and delete them.

![Certificate manager user personal screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/certificate-manager-user-personal.png)

Select all localhost certificates in the "Trusted Root Certification Authorities/Certificates" folder and delete them.

![Certificate manager user trusted root screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/certificate-manager-user-trusted-root.png)

Now do the same thing but for your local computer certificates.

![Windows search computer certificate screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/windows-search-computer-certificate.png)

![Certificate manager computer personal screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/certificate-manager-computer-personal.png)

![Certificate manager computer trusted root screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/certificate-manager-computer-trusted-root.png)

### Step 2: Use the IIS Express admin CLI

Open a new powershell or cmd prompt as Administrator (elevated permissions).

Change directory to your IIS Express installation folder.

```powershell
cd "C:\Program Files (x86)\IIS Express"
```

Now execute the following command to re-run the setup for the SSL certificates.

Make sure to **update the port number** to match yours

```powershell
./IisExpressAdminCmd.exe setupsslUrl -url:https://localhost:44321/ -UseSelfSigned
```

Should give the following output:

![Windows Terminal reset IIS Express SSL screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/windows-terminal-reset-iis-express-ssl.png)

### Step 3: Restart Visual Studio

Make sure to restart Visual Studio, this will also stop IIS Express.

### Step 4: Re-run your application with IIS Express

Select IIS Express in your debug/run configuration and start the application.

Now you should get a pop-up to trust the new self-signed SSL certificate for your localhost app, we generated/setup in step 2. Choose "Yes" to trust the certificate.

![Visual studio running a Web API with IIS Express SSL pop-up screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/visual-studio-running-web-api-with-iis-express-ssl-popup.png)

This pop-up should follow. This is a security warning you get before installing new certificates on your local machine. Choose "Yes" to install the certificate.

![Visual studio running a Web API with IIS Express SSL pop-up warning screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/visual-studio-running-web-api-with-iis-express-ssl-popup-warning.png)

After installing the certificate the app should start correctly and the SSL problem should be fixed.

Now we get the "Application started. ..." ouput, in the Output window within Visual Studio.

![Visual studio running a Web API with IIS Express with output screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/visual-studio-running-web-api-with-iis-express-with-output.png)

Navigate/browse to the web page to test if the SSL certificate is fixed.

https://localhost:44321/swagger

![Test Web API swagger UI screenshot](/blog/iis-express-localhost-ssl-certificate-reset/images/web-api-swagger.png)

## Edit 31/03/2021

Also check out this GitHub Gist:

https://gist.github.com/camieleggermont/5b2971a96e80a658863106b21c479988

This powershell script generates a new certificate, removes the old certificate assignments from the IISExpress ssl ports and adds the newly generated one. The certificate is also copied over to the Trusted Root Certificate Authorities.

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

This can help to reset all SSL certificates within the IIS Express port range 44300-44399. Make sure to open a powershell prompt as Administrator (elevated permissions).
