// Product Delivery Configuration
// This handles email delivery of purchased products

const DELIVERY_CONFIG = {
    // Email service configuration (using EmailJS or similar)
    emailService: 'emailjs', // or 'sendgrid', 'mailgun', 'aws-ses'
    
    // Product file mappings - define what each tier includes
    products: {
        'essential': {
            name: 'Essential Forms Package',
            description: '4 core document templates plus the 50-state lien law reference guide',
            price: 79,
            files: [
                'templates/documents/preliminary-notice.html',
                'templates/documents/mechanics-lien.html',
                'templates/documents/release-of-lien.html',
                'templates/documents/construction-contract.html',
                'products/guides/Lien_Laws_50_State_Guide.md'
            ],
            readme: 'products/essential/README.md'
        },
        'professional': {
            name: 'Professional Package',
            description: 'Essential forms plus 4 professional CSV trackers',
            price: 149,
            files: [
                // All Essential files
                'templates/documents/preliminary-notice.html',
                'templates/documents/mechanics-lien.html',
                'templates/documents/release-of-lien.html',
                'templates/documents/construction-contract.html',
                'products/guides/Lien_Laws_50_State_Guide.md',
                // Professional additions
                'products/templates/Job_Costing_Spreadsheet.csv',
                'products/templates/Change_Order_Log.csv',
                'products/templates/AR_Tracker.csv',
                'products/templates/Subcontractor_Tracker.csv'
            ],
            readme: 'products/professional/README.md'
        },
        'business': {
            name: 'Business System Package',
            description: 'Professional package plus project trackers and SBA funding guide',
            price: 199,
            files: [
                // All Professional files
                'templates/documents/preliminary-notice.html',
                'templates/documents/mechanics-lien.html',
                'templates/documents/release-of-lien.html',
                'templates/documents/construction-contract.html',
                'products/guides/Lien_Laws_50_State_Guide.md',
                'products/templates/Job_Costing_Spreadsheet.csv',
                'products/templates/Change_Order_Log.csv',
                'products/templates/AR_Tracker.csv',
                'products/templates/Subcontractor_Tracker.csv',
                // Business System additions
                'products/templates/Project_Tracker.csv',
                'products/templates/AP_Tracker.csv',
                'products/templates/COI_Tracker.csv',
                'products/templates/Subcontractor_Tracker_Pro.csv',
                'downloads/sba-guides/SBA_Guide.pdf'
            ],
            readme: 'products/business/README.md'
        },
        'complete': {
            name: 'Complete Bundle',
            description: 'Everything including bonus business plan and marketing playbook',
            price: 249,
            files: [
                // Everything from Business
                'templates/documents/preliminary-notice.html',
                'templates/documents/mechanics-lien.html',
                'templates/documents/release-of-lien.html',
                'templates/documents/construction-contract.html',
                'products/guides/Lien_Laws_50_State_Guide.md',
                'products/templates/Job_Costing_Spreadsheet.csv',
                'products/templates/Change_Order_Log.csv',
                'products/templates/AR_Tracker.csv',
                'products/templates/Subcontractor_Tracker.csv',
                'products/templates/Project_Tracker.csv',
                'products/templates/AP_Tracker.csv',
                'products/templates/COI_Tracker.csv',
                'products/templates/Subcontractor_Tracker_Pro.csv',
                'downloads/sba-guides/SBA_Guide.pdf',
                // Bonus materials
                'products/guides/Business_Plan_Template.md',
                'products/guides/Contractor_Marketing_Playbook.md',
                'products/templates/Financial_Projections_Template.csv'
            ],
            readme: 'products/complete/README.md'
        },
        'sba': {
            name: 'SBA Funding Guide Package',
            description: 'Complete SBA loan application resources',
            price: 97,
            files: [
                'downloads/sba-guides/SBA_Guide.pdf',
                'downloads/sba-guides/SBA_Guide.docx',
                'products/sba/Loan_Application_Checklist.md',
                'products/templates/Financial_Projections_Template.csv',
                'products/guides/Business_Plan_Template.md'
            ],
            readme: 'products/sba/README.md'
        }
    },
    
    // Download link expiration (hours)
    linkExpiration: 72,
    
    // Maximum download attempts
    maxDownloads: 5,
    
    // File validation settings
    fileValidation: {
        enabled: true,
        logMissing: true,
        allowPartialDelivery: false
    }
};

// Utility function to check if file exists (for validation)
async function checkFileExists(filePath) {
    try {
        const response = await fetch(filePath, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.warn(`File check failed for ${filePath}:`, error);
        return false;
    }
}

// Validate all files for a product tier
async function validateProductFiles(tier) {
    const product = DELIVERY_CONFIG.products[tier];
    if (!product) {
        return {
            valid: false,
            error: `Unknown product tier: ${tier}`,
            missingFiles: [],
            existingFiles: []
        };
    }
    
    const results = {
        valid: true,
        tier: tier,
        productName: product.name,
        totalFiles: product.files.length,
        existingFiles: [],
        missingFiles: [],
        errors: []
    };
    
    for (const file of product.files) {
        const exists = await checkFileExists(file);
        if (exists) {
            results.existingFiles.push(file);
        } else {
            results.missingFiles.push(file);
            results.errors.push(`Missing file: ${file}`);
        }
    }
    
    // Also check readme
    if (product.readme) {
        const readmeExists = await checkFileExists(product.readme);
        if (readmeExists) {
            results.existingFiles.push(product.readme);
        } else {
            results.missingFiles.push(product.readme);
            results.errors.push(`Missing readme: ${product.readme}`);
        }
    }
    
    results.valid = results.missingFiles.length === 0 || DELIVERY_CONFIG.fileValidation.allowPartialDelivery;
    
    if (DELIVERY_CONFIG.fileValidation.logMissing && results.missingFiles.length > 0) {
        console.error(`[Delivery Config] Missing files for ${tier}:`, results.missingFiles);
    }
    
    return results;
}

// Validate all products
async function validateAllProducts() {
    const results = {};
    let allValid = true;
    
    for (const tier of Object.keys(DELIVERY_CONFIG.products)) {
        results[tier] = await validateProductFiles(tier);
        if (!results[tier].valid) {
            allValid = false;
        }
    }
    
    return {
        allValid,
        products: results
    };
}

// Simulate delivery (for testing before email service is configured)
function simulateDelivery(email, tier) {
    const product = DELIVERY_CONFIG.products[tier];
    if (!product) {
        console.error('Unknown product tier:', tier);
        return {
            success: false,
            error: `Unknown product tier: ${tier}`
        };
    }
    
    console.log('=== PRODUCT DELIVERY SIMULATION ===');
    console.log('To:', email);
    console.log('Product:', product.name);
    console.log('Description:', product.description);
    console.log('Files included:', product.files.length);
    console.log('Files:');
    product.files.forEach(file => console.log('  -', file));
    console.log('README:', product.readme);
    console.log('Link expires in:', DELIVERY_CONFIG.linkExpiration, 'hours');
    console.log('Max downloads:', DELIVERY_CONFIG.maxDownloads);
    console.log('====================================');
    
    return {
        success: true,
        email,
        tier,
        product: product.name,
        fileCount: product.files.length,
        files: product.files
    };
}

// Send delivery email (placeholder for actual implementation)
async function sendDeliveryEmail(email, tier, paymentId) {
    // Validate inputs
    if (!email || !tier || !paymentId) {
        throw new Error('Missing required parameters: email, tier, and paymentId are required');
    }
    
    const product = DELIVERY_CONFIG.products[tier];
    if (!product) {
        throw new Error('Unknown product tier: ' + tier);
    }
    
    // Validate files before sending
    if (DELIVERY_CONFIG.fileValidation.enabled) {
        const validation = await validateProductFiles(tier);
        if (!validation.valid && !DELIVERY_CONFIG.fileValidation.allowPartialDelivery) {
            throw new Error(`Product validation failed. Missing files: ${validation.missingFiles.join(', ')}`);
        }
    }
    
    // Generate unique download token
    const downloadToken = generateDownloadToken(email, tier, paymentId);
    const downloadUrl = `${window.location.origin}/download.html?token=${downloadToken}`;
    
    // For now, simulate the delivery
    if (DELIVERY_CONFIG.emailService === 'emailjs') {
        // EmailJS integration would go here
        // Example:
        // await emailjs.send('service_id', 'template_id', {
        //     to_email: email,
        //     product_name: product.name,
        //     product_description: product.description,
        //     download_link: downloadUrl,
        //     expires_in: DELIVERY_CONFIG.linkExpiration,
        //     file_count: product.files.length
        // });
        
        console.log('Email would be sent via EmailJS');
        const simulation = simulateDelivery(email, tier);
        return { 
            success: true, 
            downloadUrl, 
            token: downloadToken,
            simulation
        };
    }
    
    // Fallback: log for manual delivery
    console.log('Email service not configured. Manual delivery required.');
    const simulation = simulateDelivery(email, tier);
    return { 
        success: false, 
        manual: true, 
        downloadUrl,
        simulation
    };
}

// Generate secure download token
function generateDownloadToken(email, tier, paymentId) {
    // Simple token generation - in production use crypto
    const timestamp = Date.now();
    const data = `${email}:${tier}:${paymentId}:${timestamp}`;
    
    // Basic encoding (replace with proper JWT or crypto in production)
    try {
        return btoa(data).replace(/=/g, '');
    } catch (e) {
        console.error('Token generation failed:', e);
        throw new Error('Failed to generate download token');
    }
}

// Verify download token
function verifyDownloadToken(token) {
    if (!token) {
        return { valid: false, error: 'No token provided' };
    }
    
    try {
        // Add padding back for base64 decoding
        const padding = '='.repeat((4 - token.length % 4) % 4);
        const paddedToken = token + padding;
        const decoded = atob(paddedToken);
        const parts = decoded.split(':');
        
        if (parts.length !== 4) {
            return { valid: false, error: 'Invalid token format' };
        }
        
        const [email, tier, paymentId, timestamp] = parts;
        
        // Validate tier exists
        if (!DELIVERY_CONFIG.products[tier]) {
            return { valid: false, error: 'Invalid product tier in token' };
        }
        
        // Check expiration
        const tokenTime = parseInt(timestamp);
        if (isNaN(tokenTime)) {
            return { valid: false, error: 'Invalid timestamp' };
        }
        
        const age = Date.now() - tokenTime;
        const maxAge = DELIVERY_CONFIG.linkExpiration * 60 * 60 * 1000;
        
        if (age > maxAge) {
            return { 
                valid: false, 
                error: 'Link expired',
                expired: true,
                expiredAt: new Date(tokenTime + maxAge).toISOString()
            };
        }
        
        return { 
            valid: true, 
            email, 
            tier, 
            paymentId,
            issuedAt: new Date(tokenTime).toISOString(),
            expiresAt: new Date(tokenTime + maxAge).toISOString()
        };
    } catch (e) {
        console.error('Token verification failed:', e);
        return { valid: false, error: 'Invalid token' };
    }
}

// Get product files for download
function getProductFiles(tier) {
    const product = DELIVERY_CONFIG.products[tier];
    if (!product) {
        console.error(`Product tier not found: ${tier}`);
        return [];
    }
    return product.files || [];
}

// Get full product details
function getProductDetails(tier) {
    const product = DELIVERY_CONFIG.products[tier];
    if (!product) {
        return null;
    }
    return {
        tier,
        ...product,
        fileCount: product.files.length,
        linkExpiration: DELIVERY_CONFIG.linkExpiration,
        maxDownloads: DELIVERY_CONFIG.maxDownloads
    };
}

// List all available products
function listProducts() {
    return Object.keys(DELIVERY_CONFIG.products).map(tier => ({
        tier,
        ...DELIVERY_CONFIG.products[tier],
        fileCount: DELIVERY_CONFIG.products[tier].files.length
    }));
}

// Create zip package (would need JSZip library in production)
async function createZipPackage(tier) {
    const product = DELIVERY_CONFIG.products[tier];
    if (!product) {
        throw new Error(`Unknown product tier: ${tier}`);
    }
    
    console.log('Creating zip package for:', product.name);
    console.log('Files to include:', product.files);
    
    // In production, use JSZip to create actual zip
    // const zip = new JSZip();
    // for (const file of product.files) {
    //     const content = await fetch(file).then(r => r.blob());
    //     zip.file(file.split('/').pop(), content);
    // }
    // return zip.generateAsync({type: 'blob'});
    
    return {
        name: `${tier}_package.zip`,
        files: product.files,
        readme: product.readme,
        productName: product.name
    };
}

// Export for use
window.ProductDelivery = {
    config: DELIVERY_CONFIG,
    sendDeliveryEmail,
    simulateDelivery,
    generateDownloadToken,
    verifyDownloadToken,
    getProductFiles,
    getProductDetails,
    listProducts,
    createZipPackage,
    validateProductFiles,
    validateAllProducts,
    checkFileExists
};

// Log initialization
console.log('[ProductDelivery] Initialized with tiers:', Object.keys(DELIVERY_CONFIG.products).join(', '));
