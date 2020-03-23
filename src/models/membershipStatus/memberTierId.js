module.exports.getMemberTierId = (memberTier) => {
  switch (memberTier) {
    case 'demo':
      return 1;
    default:
      console.log('membership tier you request does not available');
  }
}