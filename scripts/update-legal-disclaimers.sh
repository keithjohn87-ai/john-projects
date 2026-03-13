#!/bin/bash
# Batch update all document templates with legal disclaimers

LEGAL_HEADER='<div class="no-print" style="background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%); border: 2px solid #ffc107; border-radius: 8px; padding: 20px; margin-bottom: 20px; font-size: 14px;">
        <div style="display: flex; align-items: center; gap: 10px; font-weight: bold; color: #856404; margin-bottom: 10px; font-size: 16px;">
            <span style="font-size: 20px;">⚖️</span>
            <span>IMPORTANT LEGAL DISCLAIMER</span>
        </div>
        <div style="color: #856404;">
            <p><strong>This document is a template provided for educational and business organization purposes only.</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li><strong>Not Legal Advice:</strong> ContractorPro is not a law firm. This template does not constitute legal advice.</li>
                <li><strong>Attorney Review Required:</strong> Have a qualified attorney licensed in your state review all documents before use.</li>
                <li><strong>State-Specific Laws:</strong> Construction laws vary by state. This template may not comply with your state\'s specific requirements.</li>
                <li><strong>No Warranty:</strong> We make no representations about the legal sufficiency of this document for your specific situation.</li>
                <li><strong>Assumption of Risk:</strong> You assume all risk for documents you file, sign, or submit using this template.</li>
            </ul>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ffc107; font-weight: 600;">
                📍 Verify all state-specific requirements at your state\'s contractor licensing board before using this document.
            </div>
        </div>
    </div>'

LEGAL_FOOTER='<!-- Document Footer Legal Disclaimer -->
    <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #dee2e6; font-size: 11px; color: #6c757d; text-align: center;">
        <p><strong>LEGAL NOTICE:</strong> This document was generated using a ContractorPro template. ContractorPro is not a law firm and does not provide legal advice. 
        This template is provided "AS IS" without warranty of any kind. You assume all risk for documents created using this template. 
        Always consult with a qualified attorney licensed in your jurisdiction before signing or filing any legal document.</p>
        <p style="margin-top: 10px;">© 2026 ContractorPro. All rights reserved. | Document Template Version 1.0</p>
    </div>'

echo "Legal disclaimer updater - manual application required"
echo "======================================================="
echo ""
echo "Templates to update:"
ls -1 /root/.openclaw/workspace/templates/documents/*.html | grep -v AIA_TEMPLATES_README
