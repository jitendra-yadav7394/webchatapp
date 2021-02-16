var phoneNum = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;

module.exports = {
  friendlyName: 'Phone',

  description: 'Verify Phone Number.',

  inputs: {
    phone_number: {
      type: 'string',
      description: 'Verify the phone number',
      required: true
    }
  },

  exits: {

    success: {
      description: 'Phone number verified',
    },

  },

  fn: async function (inputs, exits) {

    var validPhoneNumber = false;
    // If valid phone number
    if (inputs.phone_number.match(phoneNum)) {
      // set validPhoneNumber value as true
      validPhoneNumber = true;
    }
    return exits.success(validPhoneNumber);
  }
};