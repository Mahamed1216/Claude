// Fixed Code node: Generate MD5 hash of email
// Fix: Handles undefined/missing Email field gracefully, with fallback casing

const crypto = require('crypto');

// Try both 'Email' (capitalized) and 'email' (lowercase) field names
const emailRaw = $input.item.json['Email'] ?? $input.item.json['email'];

if (!emailRaw || typeof emailRaw !== 'string') {
  // Return item unchanged with null email_md5 when email is missing
  return {
    json: {
      ...($input.item.json),
      email_md5: null,
    }
  };
}

const email = emailRaw.toLowerCase().trim();
const md5 = crypto.createHash('md5').update(email).digest('hex');

return {
  json: {
    ...($input.item.json),
    email_md5: md5,
  }
};
