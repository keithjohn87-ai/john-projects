# CHARLES SKILLS QUICK REFERENCE

## How Charles Finds & Uses Skills

### Method 1: Direct Import

```python
from skills.loader import get_skill, for_task, available_skills

# Get specific skill
telegram = get_skill("telegram_master", "jarvis")

# Execute task automatically
result = for_task("telegram", {"chat_id": "123", "message": "Hello!"})

# List all skills
print(available_skills())
```

### Method 2: Direct Import Class

```python
from skills.modules import MasterCoder
from skills.modules.jarvis_skills import TelegramMaster
from skills.universal import DeepResearch

# Use directly
coder = MasterCoder()
coder.write_code("/path/to/file.py", "print('hello')")

telegram = TelegramMaster(bot_token="TOKEN")
telegram.send_message("chat_id", "message")
```

---

## Task → Skill Mapping

| When Charles Needs To... | Use This Skill | Import |
|--------------------------|----------------|--------|
| **Write code** | MasterCoder | `skills.modules.MasterCoder` |
| **Debug error** | MasterCoder | `skills.modules.MasterCoder` |
| **Research topic** | DeepResearch | `skills.universal.DeepResearch` |
| **Search web** | UniversalKnowledge | `skills.modules.UniversalKnowledge` |
| **Send Telegram** | TelegramMaster | `skills.modules.jarvis_skills.TelegramMaster` |
| **Send Email** | EmailSendgrid | `skills.modules.jarvis_skills.EmailSendgrid` |
| **Send SMS** | SmsTwilio | `skills.modules.jarvis_skills.SmsTwilio` |
| **Post to Slack/Discord** | SlackDiscord | `skills.modules.jarvis_skills.SlackDiscord` |
| **Manage tasks** | MasterOrchestrator | `skills.modules.MasterOrchestrator` |
| **View dashboard** | TaskDashboard | `skills.modules.jarvis_skills.TaskDashboard` |
| **Analyze data** | DataAnalysis | `skills.universal.DataAnalysis` |
| **Create visualization** | DataVisualization | `skills.universal.DataVisualization` |
| **Verify facts** | FactChecking | `skills.universal.FactChecking` |
| **Write tests** | Testing | `skills.universal.Testing` |
| **Review code** | CodeReview | `skills.universal.CodeReview` |
| **Run CI/CD** | CICD | `skills.universal.CICD` |
| **Deploy site** | SiteDeployer | `skills.modules.jarvis_skills.SiteDeployer` |
| **Scrape web** | WebScraper | `skills.modules.jarvis_skills.WebScraper` |
| **Check security** | IntrusionDetector | `skills.modules.jarvis_skills.IntrusionDetector` |
| **Monitor uptime** | UptimeWarrior | `skills.modules.jarvis_skills.UptimeWarrior` |
| **Generate images** | ImageAI | `skills.modules.jarvis_skills.ImageAI` |
| **Analyze images** | VisionAnalyzer | `skills.modules.jarvis_skills.VisionAnalyzer` |
| **TTS voice** | VoiceElevenLabs | `skills.modules.jarvis_skills.VoiceElevenLabs` |
| **Manage CRM** | CustomerCRM | `skills.modules.jarvis_skills.CustomerCRM` |
| **Generate docs** | DocumentGenerator | `skills.modules.jarvis_skills.DocumentGenerator` |
| **Optimize SEO** | SEOOptimization | `skills.universal.SEOOptimization` |
| **Financial model** | FinancialModeling | `skills.universal.FinancialModeling` |
| **Analyze churn** | ChurnAnalysis | `skills.universal.ChurnAnalysis` |

---

## Bruce Lee / All Gas No Brake Integration

```python
from skills.modules import AllGasNoBrake

gas = AllGasNoBrake()

# Before any action, check if should execute
should = gas.should_execute({"clear": True, "flags": []})
if should["execute"]:
    # GO! Execute without hesitation
    result = gas.execute_now(my_function, args)
```

---

## Be Water - Adapt on the Fly

```python
from skills.modules import BeWater

water = BeWater()

# Adapt to the situation
water.adapt_to("need_code", "coder")
water.adapt_to("need_research", "researcher")
water.adapt_to("need_deploy", "deploy")

# Self-evaluate before presenting
check = water.evaluate_self(my_output, {"factual": True, "logic": True})
if not check["passed"]:
    # Fix first, then present
    pass
```

---

## Jarvis Mode Autonomy

```python
from skills.modules import JarvisMode

jarvis = JarvisMode()

# Check autonomy level
autonomy = jarvis.get_autonomy_level()  # 0-100%

# Self-heal if needed
heal = jarvis.self_heal("telegram")  # Get healing strategies

# Predictive action
predictions = jarvis.predictive_action({"api_errors_increasing": True})
```

---

## Examples in Action

### Example 1: Write Code & Send Telegram
```python
from skills.modules import MasterCoder
from skills.modules.jarvis_skills import TelegramMaster

coder = MasterCoder()
coder.write_code("/opt/app/main.py", "def main(): pass")

telegram = TelegramMaster(bot_token="XXX")
telegram.send_message("john_chat_id", "Code written and saved!")
```

### Example 2: Research & Fact Check
```python
from skills.universal import DeepResearch, FactChecking

research = DeepResearch()
result = research.research("steel beam specifications")

checker = FactChecking()
verification = checker.verify("H-beam max span is 60 feet")
```

### Example 3: Full Pipeline
```python
from skills.modules import MasterOrchestrator, AllGasNoBrake
from skills.universal import DataAnalysis

orch = MasterOrchestrator()
gas = AllGasNoBrake()
analysis = DataAnalysis()

# Create task
task = orch.create_task("Analyze contractor sales", "sub-001")

# Execute with All Gas No Brake
if gas.should_execute({"clear": True, "flags": []}):
    result = analysis.analyze_csv("/data/sales.csv")
    
    # Log result
    orch.complete_task(task.id, result)
```

---

_Load skills dynamically with: `from skills.loader import get_skill, for_task`_
