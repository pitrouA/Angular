# AngularTestAndroid
Un test pour voir si on peux faire de l'Android en Angular ( avec cordova et PhoneGap )

Je crois avoir a peu près réussi à faire un helloWorld en suivant ce tutoriel :

https://www.application-mobile-pour-les-nuls.fr/apache-cordova/angularjs-phonegap-creer-une-application-mobile-native

Il faut installer tout un tas de trucs mais si Android Studio est déjà installé c'est plus rapide 
( l'emulateur est le même que celui d'android studio, le sdk android aussi )

Commandes utiles :

- aide cordova : cordova
- ajout plateforme : cordova platform add android
- suppr plateforme : cordova platform remove android
- build : cordova build android
- run : cordova run android

Fichiers / dossiers importants :

- config.xml : régler la configuration des plateformes et du gros bazar
- src : Le CODE METIER de l'appli se trouve ici. On peux l'ouvrir avec n'importe quel navigateur. L' icône de l'apk se trouve dans
        src/img
- platforms : contient les plateformes sur lesquelles peuvent s'exécuter l'appli.
- www : le code EXECUTABLE de l'appli se trouve ici.

