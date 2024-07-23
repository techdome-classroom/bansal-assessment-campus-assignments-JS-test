// ### Test Case 1: Simple Template Rendering
// **Description**: Test with a simple template and context data.
const sendEmail = require("./program1.js")

const cleanString = str => str.replace(/\s/g, '');

const assert = require('assert');
const templateCode = `
<html>
  <body>
    <h1>Hello, {{first_name}} {{last_name}}!</h1>
    <p>Thank you for registering with {{company}}.</p>
  </body>
</html>
`;

const contextData = {
  first_name: 'John',
  last_name: 'Doe',
  company: 'Techdome'
};

const expectedOutput = `
<html>
  <body>
    <h1>Hello, John Doe!</h1>
    <p>Thank you for registering with Techdome.</p>
  </body>
</html>
`;

const result = sendEmail(null, 'john.doe@example.com', contextData, templateCode, []);
assert.strictEqual(cleanString(result.renderedHtml), cleanString(expectedOutput), 'Test Case 1 Failed');
console.log('Test Case 1 Passed');


// ### Test Case 2: Missing Context Variable
// **Description**: Test how the function handles a missing context variable:


const templateCode2 = `
<html>
  <body>
    <h1>Hello, {{first_name}} {{last_name}}!</h1>
    <p>Thank you for registering with {{company}}.</p>
  </body>
</html>
`;

const contextData2 = {
  first_name: 'John',
  company: 'Techdome'
};

const expectedOutput2 = `
<html>
  <body>
    <h1>Hello, John {{last_name}}!</h1>
    <p>Thank you for registering with Techdome.</p>
  </body>
</html>
`;

const result2 = sendEmail(null, 'john.doe@example.com', contextData2, templateCode2, []);
assert.strictEqual(cleanString(result2.renderedHtml), cleanString(expectedOutput2), 'Test Case 2 Failed');
console.log('Test Case 2 Passed');


// ### Test Case 3: Complex Template with Conditionals
// **Description**: Test with an advanced template that includes conditionals.


const templateCode3 = `
<html>
  <body>
    {% if first_name %}
      <h1>Hello, {{first_name}}!</h1>
    {% else %}
      <h1>Hello, Guest!</h1>
    {% endif %}
    <p>Thank you for registering.</p>
  </body>
</html>
`;

const contextData3 = {
  first_name: 'Jane'
};

const expectedOutput3 = `
<html>
  <body>
      <h1>Hello, Jane!</h1>
    <p>Thank you for registering.</p>
  </body>
</html>
`;

const result3 = sendEmail(null, 'jane.doe@example.com', contextData3, templateCode3, []);
assert.strictEqual(cleanString(result3.renderedHtml), cleanString(expectedOutput3), 'Test Case 3 Failed');
console.log('Test Case 3 Passed');


// ### Test Case 4: Email Validation
// **Description**: Test with an invalid email address.


try {
  sendEmail(null, 'invalid-email', {}, '', []);
  assert.fail('Test Case 4 Failed: No error thrown for invalid email');
} catch (err) {
  assert.strictEqual(err.message, 'Invalid email address', 'Test Case 4 Failed');
  console.log('Test Case 4 Passed');
}


// ### Test Case 5: Attachment Validation
// **Description**: Test with an invalid attachment path.


const templateCode4 = '<html><body>Test</body></html>';
const contextData4 = {};

try {
  sendEmail(null, 'john.doe@example.com', contextData4, templateCode4, ['/invalid/path.jpg']);
  assert.fail('Test Case 5 Failed: No error thrown for invalid attachment path');
} catch (err) {
  assert.strictEqual(err.message, 'Attachment file not found: /invalid/path.jpg', 'Test Case 5 Failed');
  console.log('Test Case 5 Passed');
}


// ### Test Case 6: Advanced Templating with Loop
// **Description**: Test with a template that includes a loop to list items.


const templateCode5 = `
<html>
  <body>
    <h1>Shopping List:</h1>
    <ul>
      {% for item in items %}
        <li>{{item}}</li>
      {% endfor %}
    </ul>
  </body>
</html>
`;

const contextData5 = {
  items: ['Milk', 'Bread', 'Eggs']
};

const expectedOutput5 = `
<html>
  <body>
    <h1>Shopping List:</h1>
    <ul>
        <li>Milk</li>
        <li>Bread</li>
        <li>Eggs</li>
    </ul>
  </body>
</html>
`;

const result5 = sendEmail(null, 'john.doe@example.com', contextData5, templateCode5, []);
assert.strictEqual(cleanString(result5.renderedHtml), cleanString(expectedOutput5), 'Test Case 6 Failed');
console.log('Test Case 6 Passed');