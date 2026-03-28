"""
Jarvis Mode Skills - All Phase Skills
"""

# Phase 1: Foundation
from .telegram_master import TelegramMaster
from .email_sendgrid import EmailSendgrid
from .stripe_full import StripeFull
from .backup_orchestrator import BackupOrchestrator
from .github_automation import GithubAutomation
from .analytics_reporter import AnalyticsReporter

# Phase 1.5: UI & Mobile
from .task_dashboard import TaskDashboard
from .iphone_shortcuts import IphoneShortcuts
from .push_notifications import PushNotifications
from .focus_mode import FocusMode

# Phase 2: Communication
from .voice_elevenlabs import VoiceElevenLabs
from .sms_twilio import SmsTwilio
from .slack_discord import SlackDiscord
from .calendar_orchestrator import CalendarOrchestrator
from .imessage_bridge import IMessageBridge

# Phase 3: Business Ops
from .product_delivery import ProductDelivery
from .customer_crm import CustomerCRM
from .inventory_manager import InventoryManager
from .document_generator import DocumentGenerator

# Phase 4: DevOps
from .site_deployer import SiteDeployer
from .ssl_cert_manager import SSLCertManager
from .domain_manager import DomainManager

# Phase 5: Intelligence
from .web_scraper import WebScraper
from .image_ai import ImageAI
from .vision_analyzer import VisionAnalyzer

# Phase 6: Security
from .intrusion_detector import IntrusionDetector
from .uptime_warrior import UptimeWarrior
from .log_analyzer import LogAnalyzer

# Phase 7: Infrastructure
from .mac_mini import MacMini

__all__ = [
    # Phase 1
    "TelegramMaster", "EmailSendgrid", "StripeFull", 
    "BackupOrchestrator", "GithubAutomation", "AnalyticsReporter",
    # Phase 1.5
    "TaskDashboard", "IphoneShortcuts", "PushNotifications", "FocusMode",
    # Phase 2
    "VoiceElevenLabs", "SmsTwilio", "SlackDiscord", 
    "CalendarOrchestrator", "IMessageBridge",
    # Phase 3
    "ProductDelivery", "CustomerCRM", "InventoryManager", "DocumentGenerator",
    # Phase 4
    "SiteDeployer", "SSLCertManager", "DomainManager",
    # Phase 5
    "WebScraper", "ImageAI", "VisionAnalyzer",
    # Phase 6
    "IntrusionDetector", "UptimeWarrior", "LogAnalyzer",
    # Phase 7
    "MacMini",
]
