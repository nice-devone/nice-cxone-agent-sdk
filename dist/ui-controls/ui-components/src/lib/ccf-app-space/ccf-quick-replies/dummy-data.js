export const dummyAllQReplies = [
    {
        id: 1,
        title: 'Will get back to you soon!',
        content: 'Having lunch, will get back to you.',
        isfavorite: false,
        type: 'plainText',
        hasVariables: false,
    },
    {
        id: 2,
        title: 'Request Id - xxxxxx',
        content: 'Is it related to request id - xxxxxx?',
        isfavorite: true,
        type: 'plainText',
        hasVariables: false,
    },
    {
        id: 3,
        title: 'It\'s a holiday!',
        content: 'See you on Monday.',
        isfavorite: true,
        type: 'plainText',
        hasVariables: false,
    },
    {
        id: 4,
        title: 'Not in the mood to work!',
        content: 'It\'s party time!',
        isfavorite: false,
        type: 'plainText',
        hasVariables: false,
    },
    {
        id: 5,
        title: 'May I know your good name please!',
        content: 'May I know your good name please.',
        isfavorite: false,
        type: 'plainText',
        hasVariables: false,
    },
    {
        id: 6,
        title: 'How may I help you!',
        content: 'This is Tom, How may I help you?',
        isfavorite: true,
        type: 'plainText',
        hasVariables: false,
    },
    {
        id: 7,
        title: 'It was nice talking to you!',
        content: 'It was nice talking to you.',
        isfavorite: true,
        type: 'plainText',
        hasVariables: false,
    },
    {
        id: 8,
        title: 'Would you like to rate us?!',
        content: 'Please rate us.',
        isfavorite: false,
        type: 'plainText',
        hasVariables: false,
    }
];
export const dummyAllOutbondMsgTemplates = [
    {
        messageContent: {
            payload: {
                elements: [
                    {
                        variables: null,
                        template: 'Oi, {{1}}. Nós conseguimos resolver o problema que você estava enfrentando?',
                        text: '',
                        type: 'TEXT_TEMPLATE',
                        id: '1',
                    }
                ],
                postback: '{"whatsAppTemplateName":"sample_issue_resolution","namespace":"84211285_71b5_42df_ac1b_ae64481793a4","language":"pt_BR"}',
            },
            type: 'PLUGIN',
        },
        category: 'ISSUE_RESOLUTION',
        template: 'sample_issue_resolution (pt_BR)',
    },
    {
        messageContent: {
            payload: {
                elements: [
                    {
                        variables: null,
                        template: 'Hi {{1}}, were we able to solve the issue that you were facing?',
                        text: '',
                        type: 'TEXT_TEMPLATE',
                        id: '2',
                    }
                ],
                postback: '{"whatsAppTemplateName":"sample_issue_resolution","namespace":"84211285_71b5_42df_ac1b_ae64481793a4","language":"en_US"}',
            },
            type: 'PLUGIN',
        },
        category: 'ISSUE_RESOLUTION',
        template: 'sample_issue_resolution (en_US)',
    },
    {
        messageContent: {
            payload: {
                elements: [
                    {
                        variables: null,
                        template: 'Halo {{1}}, apakah kami bisa mengatasi masalah yang sedang Anda hadapi?',
                        text: '',
                        type: 'TEXT_TEMPLATE',
                        id: '3',
                    }
                ],
                postback: '{"whatsAppTemplateName":"sample_issue_resolution","namespace":"84211285_71b5_42df_ac1b_ae64481793a4","language":"id"}',
            },
            type: 'PLUGIN',
        },
        category: 'ISSUE_RESOLUTION',
        template: 'sample_issue_resolution (id)',
    },
    {
        messageContent: {
            payload: {
                elements: [
                    {
                        variables: null,
                        template: 'Hola, {{1}}. ¿Pudiste solucionar el problema que tenías?',
                        text: '',
                        type: 'TEXT_TEMPLATE',
                        id: '4',
                    }
                ],
                postback: '{"whatsAppTemplateName":"sample_issue_resolution","namespace":"84211285_71b5_42df_ac1b_ae64481793a4","language":"es"}',
            },
            type: 'PLUGIN',
        },
        category: 'ISSUE_RESOLUTION',
        template: 'sample_issue_resolution (es)',
    },
    {
        messageContent: {
            payload: {
                elements: [
                    {
                        variables: null,
                        template: 'Your package has been shipped. It will be delivered in {{1}} business days.',
                        text: '',
                        type: 'TEXT_TEMPLATE',
                        id: '5',
                    }
                ],
                postback: '{"whatsAppTemplateName":"sample_shipping_confirmation","namespace":"84211285_71b5_42df_ac1b_ae64481793a4","language":"en_US"}',
            },
            type: 'PLUGIN',
        },
        category: 'SHIPPING_UPDATE',
        template: 'sample_shipping_confirmation (en_US)',
    },
    {
        messageContent: {
            payload: {
                elements: [
                    {
                        variables: null,
                        template: 'Paket Anda sudah dikirim. Paket akan sampai dalam {{1}} hari kerja.',
                        text: '',
                        type: 'TEXT_TEMPLATE',
                        id: '6',
                    }
                ],
                postback: '{"whatsAppTemplateName":"sample_shipping_confirmation","namespace":"84211285_71b5_42df_ac1b_ae64481793a4","language":"id"}',
            },
            type: 'PLUGIN',
        },
        category: 'SHIPPING_UPDATE',
        template: 'sample_shipping_confirmation (id)',
    },
    {
        messageContent: {
            payload: {
                elements: [
                    {
                        variables: null,
                        template: 'ó tu paquete. La entrega se realizará en {{1}} dí.',
                        text: '',
                        type: 'TEXT_TEMPLATE',
                        id: '7',
                    }
                ],
                postback: '{"whatsAppTemplateName":"sample_shipping_confirmation","namespace":"84211285_71b5_42df_ac1b_ae64481793a4","language":"es"}',
            },
            type: 'PLUGIN',
        },
        category: 'SHIPPING_UPDATE',
        template: 'sample_shipping_confirmation (es)',
    },
    {
        messageContent: {
            payload: {
                elements: [
                    {
                        variables: null,
                        template: 'Seu pacote foi enviado. Ele será entregue em {{1}} dias úteis.',
                        text: '',
                        type: 'TEXT_TEMPLATE',
                        id: '8',
                    }
                ],
                postback: '{"whatsAppTemplateName":"sample_shipping_confirmation","namespace":"84211285_71b5_42df_ac1b_ae64481793a4","language":"pt_BR"}',
            },
            type: 'PLUGIN',
        },
        category: 'SHIPPING_UPDATE',
        template: 'sample_shipping_confirmation (pt_BR)',
    }
];
//# sourceMappingURL=dummy-data.js.map