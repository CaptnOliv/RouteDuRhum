# Route du Rhum – inscriptions (Marina di Licata)

Petit site d'inscription : nom du bateau, nombre de personnes, ce que chacun amène. Tout le monde voit la liste.

- `index.html` : le site (une seule page, à héberger sur GitHub Pages).
- `apps-script.gs` : le « serveur », un script Google qui enregistre les inscriptions dans une Google Sheet.
- `fond.jpg` / `tymal.png` : image de fond et mascotte.

## Mise en ligne (≈ 10 min)

### 1. La Google Sheet (stockage des inscriptions)
1. Créer une Google Sheet vide (ex. « Route du Rhum Licata »).
2. Menu **Extensions → Apps Script**, effacer le contenu, coller celui de `apps-script.gs`, enregistrer.
3. **Déployer → Nouveau déploiement** → type **Application Web**
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
4. Autoriser l'accès quand Google le demande, puis copier l'**URL de l'application Web** (finit par `/exec`).

### 2. Le site
1. Dans `index.html`, coller l'URL dans `const API_URL = "...";`.
2. Sur GitHub : **Settings → Pages → Deploy from a branch**, choisir la branche et `/ (root)`.
3. Le site est disponible à `https://captnoliv.github.io/RouteDuRhum/` : c'est ce lien à mettre dans le message WhatsApp.

Pour corriger ou supprimer une inscription, il suffit de modifier la Google Sheet.

Sans `API_URL`, le site fonctionne en mode test : les inscriptions restent dans le navigateur.

## Après l'événement
Supprimer la Google Sheet et désactiver GitHub Pages (ou supprimer le dépôt).
