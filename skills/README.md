# CHARLES SKILLS LIBRARY

**Executable skills for the Custom Python Agent on GEX44**

---

## Structure

```
/root/.openclaw/workspace/skills/
├── modules/                    # Core Charles skills
│   ├── __init__.py            # Skills registry
│   ├── coder.py               # MasterCoder
│   ├── researcher.py          # MasterResearcher
│   ├── orchestrator.py        # MasterOrchestrator
│   ├── knowledge.py           # UniversalKnowledge
│   ├── all_gas_no_brake.py    # AllGasNoBrake
│   ├── jarvis_mode.py         # JarvisMode
│   ├── be_water.py            # BeWater
│   └── jarvis_skills/         # 27 Jarvis Mode skills
│       ├── telegram_master.py
│       ├── email_sendgrid.py
│       ├── stripe_full.py
│       ├── backup_orchestrator.py
│       ├── github_automation.py
│       ├── analytics_reporter.py
│       ├── task_dashboard.py
│       ├── focus_mode.py
│       ├── voice_elevenlabs.py
│       ├── sms_twilio.py
│       ├── slack_discord.py
│       ├── calendar_orchestrator.py
│       ├── imessage_bridge.py
│       ├── product_delivery.py
│       ├── customer_crm.py
│       ├── inventory_manager.py
│       ├── document_generator.py
│       ├── site_deployer.py
│       ├── ssl_cert_manager.py
│       ├── domain_manager.py
│       ├── web_scraper.py
│       ├── image_ai.py
│       ├── vision_analyzer.py
│       ├── intrusion_detector.py
│       ├── uptime_warrior.py
│       ├── log_analyzer.py
│       └── mac_mini.py
│
└── universal/                 # 30+ Universal AI Agent skills
    ├── code_review.py
    ├── debugging.py
    ├── data_analysis.py
    ├── deep_research.py
    ├── fact_checking.py
    ├── email_drafting.py
    ├── ci_cd.py
    └── ... (30 total)
```

---

## How to Use

### Import Skills

```python
from skills.modules import MasterCoder, AllGasNoBrake, BeWater
from skills.modules.jarvis_skills import TelegramMaster, TaskDashboard
from skills.universal import DeepResearch, DataAnalysis, SEOOptimization
```

### Instantiate

```python
coder = MasterCoder()
orchestrator = MasterOrchestrator()
telegram = TelegramMaster(bot_token="YOUR_TOKEN")
dashboard = TaskDashboard()
research = DeepResearch()
```

### Use Methods

```python
# Write code
coder.write_code("/path/to/file.py", "print('hello')")

# Create task
task = orchestrator.create_task("Build billing module", "sub-001")

# Send Telegram message
telegram.send_message(chat_id, "Hello from Charles!")

# Research topic
research.research("contractor software industry")

# Analyze data
analysis = DataAnalysis()
analysis.analyze_csv("/data/sales.csv")
```

---

## Skills Summary

| Skill Class | File | Key Methods |
|-------------|------|-------------|
| MasterCoder | modules/coder.py | write_code, execute_command, debug_error |
| MasterResearcher | modules/researcher.py | search, fetch, synthesize |
| MasterOrchestrator | modules/orchestrator.py | create_task, assign_task, validate_output |
| UniversalKnowledge | modules/knowledge.py | search_the_web, fetch_url, read_pdf |
| AllGasNoBrake | modules/all_gas_no_brake.py | should_execute, execute_now |
| JarvisMode | modules/jarvis_mode.py | health_check, self_heal |
| BeWater | modules/be_water.py | adapt_to, become, evaluate_self |
| TelegramMaster | jarvis_skills/telegram_master.py | send_message, broadcast |
| TaskDashboard | jarvis_skills/task_dashboard.py | get_status, add_task |
| DeepResearch | universal/deep_research.py | research, synthesize |
| DataAnalysis | universal/data_analysis.py | analyze_csv, find_trends |
| CodeReview | universal/code_review.py | review_file, review_codebase |
| Debugging | universal/debugging.py | analyze_error, get_suggestion |
| CICD | universal/ci_cd.py | create_github_actions, run_pipeline |

---

## Quick Reference

### Core (7 skills)
```python
from skills.modules import (
    MasterCoder,
    MasterResearcher, 
    MasterOrchestrator,
    UniversalKnowledge,
    AllGasNoBrake,
    JarvisMode,
    BeWater
)
```

### Communication (Phase 2)
```python
from skills.modules.jarvis_skills import (
    TelegramMaster,
    VoiceElevenLabs,
    SmsTwilio,
    SlackDiscord
)
```

### Operations
```python
from skills.modules.jarvis_skills import (
    TaskDashboard,
    CustomerCRM,
    ProductDelivery,
    InventoryManager
)
```

### Intelligence
```python
from skills.universal import (
    DeepResearch,
    FactChecking,
    WebScraper,
    DataAnalysis
)
```

---

## Adding New Skills

1. Create Python class in appropriate folder
2. Include `SKILL_NAME` and `SKILL_VERSION` at module level
3. Add to `__init__.py` exports
4. Document in this README

---

_Last Updated: March 28, 2026_
