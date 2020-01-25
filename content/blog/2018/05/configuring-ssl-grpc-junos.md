---
title: "Configuring SSL for gRPC on Junos"
date: 2018-05-23T10:00:00+00:00
image: images/blog/placeholder.jpg
author: David Gee
description: "Configuring SSL for gRPC on Junos"
signoff: Dave
categories:
- SSL
tags:
- SSL
---

![wish_junos](/images/blog/wish_junos.jpg#center)

This is a short article on creating a self-signed root certificate which can be used to self-sign certificates for the purposes of treating our telemetry and instrumentation exploration with the security love it deserves. I also cover configuration of mutual SSL for gRPC on Junos. An article of dual purposes!

One of the things I see far too often is clear-text transport being used in demonstrations, labs and even production. This isn’t acceptable. We live in a world where security has to be woven in from the ground up. How do you really know your system works if you leave out all of the security controls?

I hear your teeth grinding. Why do you want to do this? First of all, even though we can bypass security on gRPC with Junos by going for insecure connectivity with clear-text, we shouldn’t. The world we live in is all about the data and the smallest amount of it can give the ‘bad guys’ a lead.

Now we’re done with the why, we need to deal with the how. There are three approaches to PKI that are common:

Run around with your hair on fire rambling nonsense
Create your own Certificate Authority (CA) system
Use an existing CA
Number 1 is kind of exciting and 3 comes with built in help (usually someone or a team of people in your enterprise), so we’ll focus on number 2 in the most simplest of ways. No automatic signing will happen here. This post exercises the manual steps required to make this happen. Fear not. It will be fun!

#### Creating a Root Self-Signed Certificate

This will give you the power to create self-signed certificates for use in your network. You can also get your root CA cert signed by an outside trusted provider so they’re recognized by other systems. PKI is all about trust and the chain of it. However, for lab purposes, what we’re about to do is just fine.

The outcome of our forthcoming exercise will be to create a self-signed ROOT certificate (CA.crt) which will then allow us to create self-signed certs for both Junos devices and for our client applications.

Please note, you are required to have the openssl toolchain installed. The latest from a security perspective.

Let’s begin.

__Create the Self-Signed Root Certificate and Key-Pair__

*As a side-note, you can use the `-days X` switch with both `openssl req` and `openssl x509` commands to control the validity in terms of days.*

First, we generate a new signing key. If you intend to run this in production, protect this key as if your life depended on it.

This will generate a 2048 bit RSA key:

```bash
openssl genrsa -out ca.key 2048
```

The next step is to actually create the self-signed root certificate. Be sure to enter the correct details as you are questioned for inputs.

```bash
openssl req -new -x509 -key ca.key -out ca.crt
```

The output will be two files: `ca.key` and `ca.crt`.

__Certificate Signing Request and Certificates__

Next, we will create one device certificate and one application certificate. It’s not uncommon for me to use a privately owned domain for demonstration purposes. Do not use IP addresses here. Even if you only use this domain internally and don’t actually own it, avoid IP addresses else face a more complex generation sequence.

```plaintext
Device ID: vmx02.corepipe.co.uk
App ID: jtiapp01.corepipe.co.uk
```

Let’s generate the keys and certificate signing requests (CSRs).

```bash
openssl genrsa -out vmx02.corepipe.co.uk.key 2048
openssl req -new -key vmx02.corepipe.co.uk.key -out vmx02.corepipe.co.uk.csr
openssl genrsa -out jtiapp01.corepipe.co.uk.key 2048
openssl req -new -key jtiapp01.corepipe.co.uk.key -out jtiapp01.corepipe.co.uk.csr
```


Now we have two additional keys and two CSRs but we still do not have certificates.

#### Sign the CSRs

Let’s sign those CSRs using our previously created `ca.key` and `ca.crt`.

```bash
openssl x509 -req -in vmx02.corepipe.co.uk.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out vmx02.corepipe.co.uk.crt
openssl x509 -req -in jtiapp01.corepipe.co.uk.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out jtiapp01.corepipe.co.uk.crt
```

If you’re curious about what the certificate looks like (at least the metadata), you can run this command and check it.

```bash
openssl x509 -in vmx02.corepipe.co.uk.crt -noout -text
```

For Junos, we’ll also create a PEM certificate that contains both the certificate and private key. This is easily done by using the command line. This allows us to load the certificate and the signing key in one hit.

```bash
cat vmx02.corepipe.co.uk.key vmx02.corepipe.co.uk.crt > vmx02.corepipe.co.uk.pem
```

So far so good. We’ve now got our CA certificate and signing key, a host certificate, key and PEM. We’ve also got the application certificate and key. Next step, let’s configure Junos.

```bash
├── ca.crt
├── ca.key
├── ca.srl
├── jtiapp01.corepipe.co.uk.csr
├── jtiapp01.corepipe.co.uk.key
├── vmx02.corepipe.co.uk.crt
├── vmx02.corepipe.co.uk.csr
├── vmx02.corepipe.co.uk.key
└── vmx02.corepipe.co.uk.pem
```

#### Configuring Junos

I always start with the CA first. Exactly like we build out the CA structure, I replicate the configuration order on to Junos.

Here are the steps required.

1. Copy across the ca.crt file, the vmx cert and the vmx key across to /var/tmp. Repeat the below for each file.

```bash
scp <source> <user>@vmx02.corepipe.co.uk:/var/tmp
```

2. Configure the PKI service with basic attributes. I use JTI as a basic identifier primarily because the purpose of this for my personal use is the telemetry interface.

```bash
set security pki ca-profile JTI ca-identity JTI
commit
```

We also need to run an operational command to load up the CA cert.

```bash
request security pki ca-certificate load ca-profile JTI filename /var/tmp/ca.crt
```

This loads the certificate file.

3. Configure the certificate certification-authority.

```bash
set security certificates certification-authority JTI ca-name JTI
```

4. Load in the device specific PEM certificate.

```bash
set security certificates local vmx02.corepipe.co.uk load-key-file /var/tmp/vmx02.corepipe.co.uk.pem
```

5. Configure gRPC and SSL

```bash
set system services extension-service request-response grpc ssl port 32767
set system services extension-service request-response grpc ssl local-certificate vmx02.corepipe.co.uk
set system services extension-service request-response grpc ssl mutual-authentication certificate-authority JTI
set system services extension-service request-response grpc ssl mutual-authentication client-certificate-request require-certificate
commit
```

Once you’ve committed those changes and no errors have been returned, you can move to the test phase.

#### Test

*Note, I did this on an 18.1 vMX. Check for compatibility with gNMI over gRPC*

They always say the taste of the pudding is in the eating, so let’s give this a whirl and make sure our configuration works!

I’m going to use one of my testlet applications which is written in Go. This particular testlet does a “get” over gRPC using gNMI.

You can follow along here. Open a directory of your choosing and clone the test client. There are three binaries prebuilt. One for Linux, one for OSX and one for Junos itself. I’m running on OSX, so will use the OSX binary.

For ease, also create a directory where you will place the ca.crt, client.crt and client.key. In our case, the client.* are the vmx02.corepipe.co.uk files respectively. I copied them and changed their name. See below to confirm naming.

```bash
# Copy these files in to this directory 
# ca.crt, vmx02.corepipe.co.uk.crt, vmx02.corepipe.co.uk.key

git clone https://github.com/arsonistgopher/junos-gnmi-testclient.git
mkdir PKI

# Change the name of fhe files respectively
mv jtiapp01.corepipe.co.uk.crt client.crt
mv jtiapp01.corepipe.co.uk.key client.key
mv ca.crt client.crt client.key PKI

# Next let&apos;s fire the app up with user JET and our directory with certificates.
./junos-gnmi-testclient-osx-0.1 -certdir PKI -host vmx02.corepipe.co.uk -port 32767 -resource /system -user jet
```

If everything went well, this is what you should expect to see.

```bash
2018/05/23 17:27:31 -----------------------------------
2018/05/23 17:27:31 Junos gNMI Configuration Test Tool
2018/05/23 17:27:31 -----------------------------------
2018/05/23 17:27:31 Run the app with -h for options

Enter Password:
----- VERSION -----
0.4.0
----- ENCODINGS SUPPORTED -----
ASCII
JSON_IETF
----- GET DATA -----
{"root-authentication": {"encrypted-password": "$6$B7o0BPac$bt7vWsuxLa9BF9z2g3k6SS07KlWbT09nFCfHUeeGt18fXLOfJIGd9Cu1LQbNbFJ1RhEsDYhKPKQDc7Pjyn/RX0"}, "syslog": {"user": [{"name": "*", "contents": [{"name": "any", "emergency": [null]}]}], "file": [{"name": "messages", "contents": [{"name": "any", "notice": [null]}, {"name": "authorization", "info": [null]}]}, {"name": "interactive-commands", "contents": [{"name": "interactive-commands", "any": [null]}]}]}, "login": {"user": [{"authentication": {"encrypted-password": "$6$aPG7qJg6$WpN9gk2FUtdKd.U3RA..gQDB7kZsgaQQgZBDDxQmcter/hfu0bvhiLDtWMrAJlloiz9eqKtmSCIbTGr1Lsn.T1"}, "name": "jet", "uid": 2000, "class": "super-user"}]}, "services": {"ssh": {"root-login": "allow"}, "extension-service": {"request-response": {"grpc": {"ssl": {"port": 32767, "mutual-authentication": {"certificate-authority": "JTI", "client-certificate-request": "require-certificate"}, "local-certificate": ["vmx02.corepipe.co.uk"]}}}, "notification": {"port": 1883, "allow-clients": {"address": ["0.0.0.0/0"]}}}}, "processes": {"dhcp-service": {"traceoptions": {"file": {"filename": "dhcp_logfile", "size": "10m"}, "level": "all", "flag": [{"name": "all"}]}}}}
```

#### Close

So there you have it. We’ve created a self-signed CA cert, issued certificates to both a vMX and an application and tested it.

Sure, there are much more complex ways of doing certificate management like a full blown PKI system. Junos is reasonably feature rich for this kind of thing and it’s only a short Google away.

Hope this was useful. Any errata or comments, please leave comments.