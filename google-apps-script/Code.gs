/**
 * Google Apps Script for Growdit Registration Form
 * 
 * Setup Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any default code and paste this entire file
 * 4. Click "Deploy" > "New deployment"
 * 5. Select "Web app" as deployment type
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the Web App URL and paste it in your .env.local file
 */

// Main function to handle POST requests from the form
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // If this is the first time, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Full Name',
        'Firm Name',
        'Email',
        'WhatsApp',
        'Website/LinkedIn',
        'Consent',
        'Timestamp',
        'IP Address'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285F4');
      headerRange.setFontColor('#FFFFFF');
    }
    
    // Validate required fields
    if (!data.fullName || !data.firmName || !data.email || !data.whatsapp || !data.websiteOrLinkedIn) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: 'Missing required fields'
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check for duplicates
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    // Skip header row and check for duplicates
    for (let i = 1; i < values.length; i++) {
      const existingEmail = values[i][2] ? values[i][2].toString().toLowerCase().trim() : '';
      const existingName = values[i][0] ? values[i][0].toString().toLowerCase().trim() : '';
      const newEmail = data.email.toLowerCase().trim();
      const newName = data.fullName.toLowerCase().trim();
      
      if (existingEmail === newEmail) {
        return ContentService.createTextOutput(
          JSON.stringify({
            success: false,
            duplicate: true,
            message: 'This email is already registered. Please use a different email.'
          })
        ).setMimeType(ContentService.MimeType.JSON);
      }
      
      if (existingName === newName) {
        return ContentService.createTextOutput(
          JSON.stringify({
            success: false,
            duplicate: true,
            message: 'This name is already registered. Please use a different name.'
          })
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Get client IP address (if available)
    const ipAddress = e.parameter.userIp || 'Unknown';
    
    // Format timestamp
    const timestamp = new Date();
    const formattedTimestamp = Utilities.formatDate(
      timestamp,
      Session.getScriptTimeZone(),
      'yyyy-MM-dd HH:mm:ss'
    );
    
    // Append the new row
    sheet.appendRow([
      data.fullName,
      data.firmName,
      data.email,
      data.whatsapp,
      data.websiteOrLinkedIn,
      data.consent ? 'Yes' : 'No',
      formattedTimestamp,
      ipAddress
    ]);
    
    // Optional: Send confirmation email
    // Uncomment the following lines to enable email notifications
    /*
    MailApp.sendEmail({
      to: data.email,
      subject: 'Registration Confirmed - Free Content Week',
      htmlBody: `
        <h2>Thanks for registering!</h2>
        <p>Hi ${data.fullName},</p>
        <p>We've received your registration for the Free Content Week.</p>
        <p><strong>Your Details:</strong></p>
        <ul>
          <li>Name: ${data.fullName}</li>
          <li>Firm: ${data.firmName}</li>
          <li>Email: ${data.email}</li>
          <li>WhatsApp: ${data.whatsapp}</li>
        </ul>
        <p>We'll be in touch soon with next steps!</p>
        <p>Best regards,<br>The Growdit Team</p>
      `
    });
    */
    
    // Optional: Send notification to admin
    // Replace 'admin@yourdomain.com' with your email
    /*
    MailApp.sendEmail({
      to: 'admin@yourdomain.com',
      subject: 'New Registration - Free Content Week',
      body: `
        New registration received:
        
        Name: ${data.fullName}
        Firm: ${data.firmName}
        Email: ${data.email}
        WhatsApp: ${data.whatsapp}
        Website/LinkedIn: ${data.websiteOrLinkedIn}
        Timestamp: ${formattedTimestamp}
      `
    });
    */
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: 'Registration successful! Check your email for confirmation.'
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: 'An error occurred. Please try again later.',
        error: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'OK',
      message: 'Growdit Registration API is running',
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

// Test function - you can run this from the Apps Script editor to test
function testSubmission() {
  const testData = {
    fullName: 'Test User',
    firmName: 'Test Company',
    email: 'test@example.com',
    whatsapp: '+1234567890',
    websiteOrLinkedIn: 'https://linkedin.com/in/testuser',
    consent: true,
    timestamp: new Date().toISOString()
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    },
    parameter: {
      userIp: '127.0.0.1'
    }
  };
  
  const result = doPost(e);
  Logger.log(result.getContent());
}
