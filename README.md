# Catalogue Web – Laravel

Ce projet est un site web de catalogue développé avec **Laravel (PHP)** et un front utilisant **npm**.

C'est une plateforme e-commerce de cosmétiques sous Laravel, combinant un catalogue public pour les visiteurs et une interface d'administration sécurisée pour la gestion des stocks et des produits.

---

## Prérequis

Assurez-vous d’avoir installé sur votre machine :

- **PHP** (version compatible avec Laravel)
- **Composer**
- **MySQL**
- **Node.js 20** (via nvm recommandé)
- **npm**
- **nvm**

---

## Installation du projet

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd <nom-du-projet>
```
---

### 2. Installer les dépendances

```bash
composer install
```

---

### 3. Configuration de l’environnement

Copiez le fichier d’exemple :

```bash
cp .env.example .env
```

Puis modifiez le fichier .env avec vos informations de base de données MySQL :

```bash
DB_DATABASE=nom_de_la_base
DB_USERNAME=utilisateur_mysql
DB_PASSWORD=mot_de_passe_mysql
```


---

### 4. Générer la clé de l’application

```bash
php artisan key:generate
```

---

### 5. Utiliser Node.js 20

```bash
nvm use 20
```
---

### 6. Installer les dépendances JavaScript

```bash
npm install
```
---

### 7. Lancer les migrations et rajouter des données tests

```bash
php artisan migrate:fresh --seed
```

---

## Lancer le projet
    Pour faire fonctionner le projet, il faut lancer Laravel et le serveur front en même temps dans deux terminaux séparés.

### Terminal 1 – Serveur Laravel

```bash
php artisan serve
```

### Terminal 2 – Front-end

```bash
npm run dev
```

Le site est accessible à l’adresse :

[http://localhost:8000/app](http://localhost:8000/app)

---

## Connexion admin

Email : admin@glow.com

Mot de passe : password






