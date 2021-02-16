module.exports = {
  sendOtp: function () {},

  generateOtp: function () {
    // Genrate 4 digit OTP
    const otp = 
      (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)

    // Return it
    return otp;
  },
};
