# Guide de personnalisation — Raviva Nettoyage de Tapis Montréal

Ce site a été structuré pour que vous puissiez modifier **tous vos textes, tarifs, services, villes desservies et coordonnées** sans toucher au code des composants React.

## 1. Coordonnées, marque et couleurs
Ouvrez `src/config/site.config.ts` :
- `companyName` : Nom officiel (`Raviva Nettoyage de Tapis Montréal`)
- `founderName` & `founderExperienceYears` : `Marc Lemonnier` / `35`
- `phoneDisplay` & `phoneHref` : `514-820-0368` / `tel:+15148200368`
- `email` : `marc@marclemonnier.com`
- `neq` : Inscrivez votre Numéro d'entreprise du Québec (NEQ) officiel
- `colors` : Palette centralisée (respectant un contraste WCAG AA >= 4.5:1)

## 2. Vos propres textes personnalisés (FR et EN)
Ouvrez `src/config/custom-content.config.ts` :
Vous pouvez y remplacer directement :
- Le surtitre, le titre principal (`heroTitle`) et le sous-titre de l'accueil
- Le mot du fondateur (`founderStory`)
- Vos vrais témoignages clients et indicateurs vérifiables (`proofStats`, `testimonials`) — les emplacements marqués `[À REMPLACER PAR VOS AVIS RÉELS]` sont prêts à recevoir vos avis Google vérifiés.
- Des questions/réponses additionnelles pour la FAQ.

## 3. Services et tarifs indicatifs
Ouvrez `src/config/services.config.ts` :
- Activez ou désactivez n'importe quel service avec `enabled: true` ou `false`.
- Modifiez les tarifs indicatifs (ou indiquez « Sur soumission »).
- Les textes détaillés de chaque service se trouvent dans `src/config/i18n/fr.ts` et `src/config/i18n/en.ts`.

## 4. Villes et codes postaux desservis
Ouvrez `src/config/locations.config.ts` :
- Ajoutez ou retirez des municipalités par région (`montreal`, `laval`, `rive-sud`, `rive-nord`).
- Ajustez `validPostalPrefixes` (ex. `H1`, `H2`, `H7`, `J4`...) pour la validation automatique en direct dans le formulaire et sur la section Secteurs desservis.

## 5. Supabase & GoHighLevel
- Exécutez `supabase/schema.sql` dans votre projet Supabase.
- Configurez vos clés dans vos variables d'environnement (`.env.example` documente chaque clé).
- Les témoins analytiques (GA4 / GTM) sont bloqués par défaut tant que l'utilisateur n'a pas donné son consentement explicite conformément à la **Loi 25 (Québec)**.
