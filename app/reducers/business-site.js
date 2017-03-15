import {modeled} from 'react-redux-form';

import {templatesIds} from 'lib/business-site-utils';
import * as colors from 'lib/colors';

export const initialColors = {
    mainColor: colors.templatePrimaryColor
};

export const initialFooterInfo = {
    bottom: '© 2017 Nome Azienda - PIVA: 0123456789',
    companyName: 'Nome Azienda',
    line1: 'Via Giosuè Carducci, 10',
    line2: '20100 Milano (MI)',
    line3: 'Email: info@maildisupporto.it',
    line4: 'Tel: 012-3456789'
};

export const initialHeaderInfo = {
    emailAddress: 'info@emaildisupporto.it',
    facebookPage: 'pagina facebook',
    phoneNumber: '+39 012 3456789',
    twitterAccount: '@twitter_account'
};

export const initialIntroInfo = {
    introTitle: 'CASSETTINE BIOLOGICHE',
    introText: `Scegliamo i prodotti migliori e te li consegnamo a
                casa nella formula più adatta alle tue esigenze!`
};

export const initialStepsInfo = {
    stepsTitle: 'COME FUNZIONA',
    titleStep1: 'SCEGLI UNA TRA LE TRE SOTTOSCRIZIONI',
    titleStep2: 'RISPARMI E NON DOVRAI PENSARE A NULLA',
    titleStep3: 'POTRAI DISISCRIVERTI QUANDO VUOI',
    textStep1: `Abbiamo pensato a tutti, ma se desideri
                personalizzare il tuo ordine, chiama al 012-3456789`,
    textStep2: `Ogni mese ti arriverà una cassettina con
                frutta e verdura biologica di stagione`,
    textStep3: `Se non sei soddisfatto del servizio, puoi decidere di
                non ricevere più le nostre cassettine`
};

export const initialSubscriptionsInfo = {
    subscriptionsTitle: 'SCEGLI LA TUA SOTTOSCRIZIONE',

    subscriptionType1: 'CASSETTINA PICCOLA',
    subscriptionFeature1a: 'Adatta per un consumo mensile di una persona',
    subscriptionFeature1b: 'Assortimento: verdura mista (frutta a richiesta)',
    subscriptionPrice1: '35',
    subscriptionFrequency1: 'al mese',
    subscriptionImage1: null,

    subscriptionType2: 'CASSETTINA MEDIA',
    subscriptionFeature2a: 'Adatta per un consumo mensile di 2/3 persone',
    subscriptionFeature2b: 'Assortimento: verdura mista (frutta a richiesta)',
    subscriptionPrice2: '45',
    subscriptionFrequency2: 'al mese',
    subscriptionImage2: null,

    subscriptionType3: 'CASSETTINA GRANDE',
    subscriptionFeature3a: 'Adatta per un consumo mensile di 4/5 persone',
    subscriptionFeature3b: 'Assortimento: verdura mista (frutta a richiesta)',
    subscriptionPrice3: '55',
    subscriptionFrequency3: 'al mese',
    subscriptionImage3: null
};

export const initialOtherInfo = {
    textBox: `Sappiamo che amerai i nostri prodotti, se però necessiti di una
                formula personalizzata o se vuoi comunicarci qualcosa non esitare a scriverci!`,
    textBox1: `Scopri altro riguardo ai nostri prodotti, sul nostro sito
                troverai tutte le informazioni che cercavi`,
    buttonBox1: 'PER SAPERNE DI PIÙ',
    textBox2: `Hai delle domande riguardo al tuo ordine o desideri
                sospendere le tue consegne?`,
    buttonBox2: 'SCRIVICI UN EMAIL'
};

const defaultState = {
    editMode: null,
    productPlans: {
        subscriptions: initialSubscriptionsInfo
    },
    siteConfig: {
        colors: initialColors,
        footer: initialFooterInfo,
        header: initialHeaderInfo,
        intro: initialIntroInfo,
        steps: initialStepsInfo,
        info: initialOtherInfo,
        logo: null,
        teaserImages: [{
            id: null
        }],
        templateId: templatesIds.TEMPLATE_1,
        userPool: null
    }
};

const businessSite = (state = defaultState, action) => {
    switch (action.type) {
        case 'CREATE_USER_POOL_START_SUCCESS':
            return {
                ...state,
                siteConfig: {
                    ...state.siteConfig,
                    userPool: action.userPoolConfig
                }
            };
        case 'SET_EDIT_MODE':
            return {
                ...state,
                editMode: action.editMode
            };
        case 'SET_TEMPLATE':
            return {
                ...state,
                siteConfig: {
                    ...state.siteConfig,
                    templateId: action.templateId
                }
            };
        case 'SET_LOGO_IMAGE':
            return {
                ...state,
                siteConfig: {
                    ...state.siteConfig,
                    logo: action.logoImage
                }
            };
        default:
            return state;
    }
};

export default modeled(businessSite, 'businessSite');
