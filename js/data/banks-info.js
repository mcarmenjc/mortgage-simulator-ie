function banksInfo(){
    let banks = {
        'AIB': {
            fixed: {
                1: {
                    '0-100': {
                        interest: 3.15,
                        APRC: 3.22
                    }
                },
                2: {
                    '0-100': {
                        interest: 3.15,
                        APRC: 3.22
                    }
                },
                3: {
                    '0-100': {
                        interest: 2.85,
                        APRC: 3.13
                    }
                },
                4: {
                    '0-100': {
                        interest: 2.85,
                        APRC: 3.1
                    }
                },
                5: {
                    '0-100': {
                        interest: 2.85,
                        APRC: 3.08
                    }
                }
            },
            variable: {
                '80-100': {
                    interest: 3.15,
                    APRC: 3.22
                },
                '50-80': {
                    interest: 2.95,
                    APRC: 3.01
                },
                '0-50': {
                    interest: 2.75,
                    APRC: 2.81
                }
            }
        },
        'KBC': {
            fixed: {
                1: {
                    '80-100': {
                        interest: 2.5,
                        APRC: 3.28
                    },
                    '60-80': {
                        interest: 2.5,
                        APRC: 3.08
                    },
                    '0-60': {
                        interest: 2.5,
                        APRC: 3
                    }
                },
                2: {
                    '80-100': {
                        interest: 2.6,
                        APRC: 3.22
                    },
                    '60-80': {
                        interest: 2.55,
                        APRC: 3
                    },
                    '0-60': {
                        interest: 2.5,
                        APRC: 2.95
                    }
                },
                3: {
                    '80-100': {
                        interest: 2.65,
                        APRC: 3.17
                    },
                    '60-80': {
                        interest: 2.6,
                        APRC: 2.97
                    },
                    '0-60': {
                        interest: 2.55,
                        APRC: 2.92
                    }
                },
                5: {
                    '80-100': {
                        interest: 2.8,
                        APRC: 3.13
                    },
                    '60-80': {
                        interest: 2.65,
                        APRC: 2.92
                    },
                    '0-60': {
                        interest: 2.6,
                        APRC: 2.87
                    }
                }
            },
            variable: {
                '80-100': {
                    interest: 3.3,
                    APRC: 3.37
                },
                '50-80': {
                    interest: 3.05,
                    APRC: 3.11
                },
                '0-50': {
                    interest: 3,
                    APRC: 3.06
                }
            }
        }
    };

    return banks;
}