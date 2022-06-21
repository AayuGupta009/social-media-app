const Joi = require('joi');
const {
    password_validation_regex
} = require('consts');

const pagination = Joi.object().keys({
    page: Joi.number().default(0),
    pageSize: Joi.number().default(10),
    status: Joi.string().valid('upcoming', 'previous').default('upcoming')
});

const signup = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string()
        .regex(password_validation_regex)
        .insensitive()
        .required(),
    isPrivacyAccepted: Joi.boolean().required().valid(true)
});

const phoneRegister = Joi.object().keys({
    _id: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    countryCode: Joi.string().required()
});

const getOTP = Joi.object().keys({
    phoneNumber: Joi.string().required(),
    countryCode: Joi.string().required()
});

const verifyOTP = Joi.object().keys({
    phoneNumber: Joi.string().required(),
    otp: Joi.number().required()
});

const touchId = Joi.object().keys({
    touchId: Joi.string().required()
});

const personalDemographics = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    aliasName: Joi.string().optional().allow(''),
    dob: Joi.date().required(),
    placeOfBirth: Joi.string().required(),
    homeAddress: Joi.object({
        country: Joi.string().required(),
        countryCode: Joi.string().required(),
        countryNumericCode: Joi.string().required(),
        address_1: Joi.string().required(),
        address_2: Joi.string().optional().allow(''),
        houseNameNumber: Joi.string().required(),
        town: Joi.string().optional().allow(''),
        postCode: Joi.string().optional().allow('')
    }),
    nationality: Joi.string().required()
});

const category = Joi.object().keys({
    category: Joi.string().required()
});

const businessDemographics = Joi.object().keys({
    legalName: Joi.string().required(),
    countryOfIncorporation: Joi.string().required(),
    registrationNumber: Joi.string().required(),
    dateOfIncorporation: Joi.date().required(),
    businessType: Joi.string().required(),
    tradeName: Joi.string().optional().allow(''),
    natureOfBusiness: Joi.string().required(),
    sourceOfFund: Joi.string().required(),
    sourceOfWealth: Joi.string().optional().allow(''),
    supportingDocumentation: Joi.string().optional().allow('')
});

const role = Joi.object().keys({
    role: Joi.string().required()
});

const roleInfo = Joi.object().keys({
    role: Joi.string().required().valid('director', 'shareHolder', 'partner', 'other'),
    shares: Joi.number().when('role', {
        is: 'shareHolder',
        then: Joi.number().required()
    }),
    roleTitle: Joi.string().when('role', {
        is: 'other',
        then: Joi.string().required()
    })
});

const purposeOfBusinessRelationship = Joi.object().keys({
    purposeOfBusinessRelationship: Joi.array().items(Joi.string())
});

const customerTypeSpecification = Joi.object().keys({
    selectedCustomerTypes: Joi.array().items(Joi.number()),
    isOtherSelected: Joi.boolean().required(),
    othersValue: Joi.string().when('isOtherSelected', {
        is: true,
        then: Joi.string().required()
    })
});

const expectedChannelSpecification = Joi.object().keys({
    expectedChannels: Joi.array().items(Joi.number()).optional(),
    isOtherSelected: Joi.boolean().required(),
    othersValue: Joi.string().when('isOtherSelected', {
        is: true,
        then: Joi.string().required()
    })
});

const expectedAmountSpecification = Joi.object().keys({
    // selectedCustomerCategory: Joi.number().required().valid(1, 2),
    expectedAmtMoneyMovementPerMonth: Joi.string().required(),
    expectedTransactionVolPerMonth: Joi.string().required(),
    maximumSingleAmt: Joi.string().required()
});

const otherCompanyMembersSpecification = Joi.object().keys({
    otherCompanyMembers: Joi.array().items(Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        aliasesNames: Joi.array().items(Joi.string()).required(),
        email: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        countryCode: Joi.string().required(),
        role: Joi.string().required(),
        percOfVotingRightsOrShares: Joi.number().required()
    })).required()
});

const acceptingGeneralServiceAgreementSchema = Joi.object().keys({
    consentChecked: Joi.boolean().required()
});

const updateRegisteredBusinessAddress = Joi.object().keys({
    registeredAddress: Joi.object({
        address_1: Joi.string().required(),
        town: Joi.string().required(),
        postCode: Joi.string().required(),
        countryCode: Joi.string().required(),
        countryNumericCode: Joi.string().required(),
        countryOfIncorporation: Joi.string().required()
    }).required(),
    businessAddress: Joi.object({
        address_1: Joi.string().required(),
        town: Joi.string().required(),
        postCode: Joi.string().required(),
        countryCode: Joi.string().required(),
        countryNumericCode: Joi.string().required(),
        countryOfIncorporation: Joi.string().required()
    }).optional(),
    isPhysicalAddress: Joi.boolean().optional()
});

const addHistoricalCompanyStakeholdership = Joi.object().keys({
    questions: Joi.array().items(Joi.object({
        questionId: Joi.string().required(),
        selectedAnswer: Joi.number().required(),
        description: Joi.string().when('selectedAnswer', {
            is: 1,
            then: Joi.string().required()
        })
    })).required()
});

const business = Joi.object().keys({
    businessType: Joi.number().required()
});

const login = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    isMobile: Joi.boolean().required(),
    deviceToken: Joi.string().when('isMobile', {
        is: true,
        then: Joi.string().required()
    })
});

const forgotPassword = Joi.object().keys({
    email: Joi.string().required()
});

const resetPassword = Joi.object().keys({
    password: Joi.string().required()
});

const updateCompanyDocuments = Joi.object().keys({
    companyDocuments: Joi.array().optional(),
    provide: Joi.boolean().required()
});

const getCompanyData = Joi.object().keys({
    name: Joi.string().required(),
    incorporation_country_code: Joi.string().required(),
    company_id: Joi.string().allow('')
});

module.exports = {
    pagination,
    signup,
    phoneRegister,
    getOTP,
    verifyOTP,
    touchId,
    personalDemographics,
    businessDemographics,
    category,
    role,
    roleInfo,
    purposeOfBusinessRelationship,
    customerTypeSpecification,
    expectedChannelSpecification,
    expectedAmountSpecification,
    otherCompanyMembersSpecification,
    acceptingGeneralServiceAgreementSchema,
    updateRegisteredBusinessAddress,
    addHistoricalCompanyStakeholdership,
    business,
    login,
    forgotPassword,
    resetPassword,
    updateCompanyDocuments,
    getCompanyData
};
