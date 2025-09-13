import { type I18nOptions } from 'vue-i18n';

export const MessagesGlobal: I18nOptions['messages'] = {
    fr: {
        appName: 'Calculette CDR',
        global: {
            contests: 'Règlements',
            rules: 'Règlement',
            close: 'Fermer',
            cancel: 'Annuler',
            validate: 'Valider',
        },
        form: {
            actions: 'Actions',
            bonus: 'Bonus',
            total: 'Total',
            sima: 'PAMI',
            reset: 'Réinitialiser',
            estimation: 'Estimation de score',
        },
        update: {
            msg: 'Une nouvelle version est disponible.',
            btn: 'Mettre à jour',
        },
        favorites: {
            title: 'Favoris',
            empty: 'Aucun favoris',
            new: 'Nouveau favoris',
            name: 'Nom du favoris',
            msg: 'Favoris sauvegardé.',
        },
        share: {
            title: 'Lien de partage',
            copy: 'Copier',
        },
    },
    en: {
        appName: 'Eurobot calculator',
        global: {
            contests: 'Contests',
            rules: 'Rules',
            close: 'Close',
            cancel: 'Cancel',
            validate: 'OK',
            sima: 'SIMA',
        },
        form: {
            actions: 'Actions',
            bonus: 'Bonus',
            total: 'Total',
            sima: 'SIMA',
            reset: 'Reset',
            estimation: 'Score estimation',
        },
        update: {
            msg: 'A new version is available.',
            btn: 'Update',
        },
        favorites: {
            title: 'Favorites',
            empty: 'No favorites',
            new: 'New Favorite',
            name: 'Name of the favorite',
            msg: 'Favorite saved.',
        },
        share: {
            title: 'Share link',
            copy: 'Copy',
        },
    },
};
