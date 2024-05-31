# Certificates

## Generate new self signed certificate

```
openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout steffbeckers.localhost.key -out steffbeckers.localhost.crt -config steffbeckers.localhost.conf
```

## Create .pfx from .crt

```
openssl pkcs12 -export -out steffbeckers.localhost.pfx -inkey steffbeckers.localhost.key -in steffbeckers.localhost.crt
```
