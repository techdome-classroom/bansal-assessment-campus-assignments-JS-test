const fs = require('fs');

/**
 * Validate the provided email address
 *
 * @param {string} email - Email address of the recipient
 * @returns {boolean} - True if email is valid, otherwise false
 */
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Replace template variables with context data
 *
 * @param {string} templateCode - HTML template code
 * @param {object} contextData - Dictionary containing variables to be used in the template
 * @returns {string} - Rendered HTML
 */
function renderTemplate(templateCode, contextData) {
    // Replace variables
    let rendered = templateCode.replace(/{{(.*?)}}/g, (_, key) => {
      const trimmedKey = key.trim();
      return contextData[trimmedKey] !== undefined ? contextData[trimmedKey] : `{{${trimmedKey}}}`;
    });
  
    // Handle conditionals with else
    rendered = rendered.replace(/{%\s*if\s+(.*?)\s*%}(.*?){%\s*else\s*%}(.*?){%\s*endif\s*%}/gs, (_, condition, trueContent, falseContent) => {
      const trimmedConditionKey = condition.trim();
      return contextData[trimmedConditionKey] ? trueContent.trim() : falseContent.trim();
    });
  
    // Handle conditionals without else
    rendered = rendered.replace(/{%\s*if\s+(.*?)\s*%}(.*?){%\s*endif\s*%}/gs, (_, condition, content) => {
      const trimmedConditionKey = condition.trim();
      return contextData[trimmedConditionKey] ? content.trim() : '';
    });
  
    // Handle loops
    rendered = rendered.replace(/{%\s*for\s+(.*?)\s+in\s+(.*?)\s*%}(.*?){%\s*endfor\s*%}/gs, (_, itemName, arrayName, content) => {
      const items = contextData[arrayName.trim()];
      if (!Array.isArray(items)) return '';
  
      return items.map(item => 
        content.replace(new RegExp(`{{\\s*${itemName.trim()}\\s*}}`, 'g'), item).trim()
      ).join('');
    });
  
    return rendered;
  }

/**
 * Calls send email service (simulated)
 *
 * @param {object} db - Session variable (not used in the current scope, but consider it exists)
 * @param {string} recipientEmail - Email address of the recipient
 * @param {object} contextData - Dictionary containing variables to be used in the template
 * @param {string} templateCode - HTML template code
 * @param {Array<string>} filePaths - Local paths of attachments
 * @returns {object} - A dictionary containing the simulated message details
 */
function sendEmail(db, recipientEmail, contextData, templateCode, filePaths) {
  if (!validateEmail(recipientEmail)) {
    throw new Error('Invalid email address');
  }

  // Validate attachments
  filePaths.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Attachment file not found: ${filePath}`);
    }
  });

  // Render template
  let renderedHtml = renderTemplate(templateCode, contextData);

  return {
    recipientEmail,
    renderedHtml,
    attachments: filePaths
  };
}

module.exports = sendEmail