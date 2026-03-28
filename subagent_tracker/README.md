# Sub-Agent Performance Tracker

Tracks accuracy, mistakes, and corrections for each sub-agent during project builds.

## Purpose

1. **Internal:** Which sub performs best → stays on post-launch
2. **External:** Aggregate anonymized data → sell to AI companies as training data on agent performance/optimization

## Data Model

```python
class SubAgentMetrics:
    sub_agent_id: str          # e.g., "sub-001"
    sub_agent_name: str        # e.g., "Builder", "Tester", "Researcher"
    project_id: str            # e.g., "contractorpro-001"
    
    # Task Performance
    tasks_assigned: int        # Total tasks given
    tasks_completed: int       # Successfully completed
    tasks_failed: int          # Failed/required restart
    
    # Accuracy Tracking
    total_operations: int      # Total operations attempted
    correct_operations: int    # Correct on first try
    mistakes: int              # Errors requiring correction
    corrections_made: int      # Times redirected/fixed
    
    # Quality Scores (0-100)
    accuracy_score: float      # (correct_operations / total_operations) * 100
    reliability_score: float   # (tasks_completed / tasks_assigned) * 100
    correction_rate: float     # (corrections_made / total_operations) * 100
    
    # Timestamps
    created_at: datetime
    updated_at: datetime
    
    # History Log
    history: list[dict]        # Detailed log of each task/op
```

## History Log Entry

```python
class LogEntry:
    timestamp: datetime
    event_type: str            # "task_assigned" | "task_completed" | "mistake" | "correction"
    task_id: str
    description: str           # What happened
    severity: str              # "low" | "medium" | "high"
    resolution: str            # How it was resolved (if applicable)
    model_used: str            # Which model performed the operation
    tokens_used: int           # Compute cost
    was_corrected: bool        # Required correction
```

## Storage

- Location: `/opt/charles/tracker/subagent_metrics.json`
- Format: JSON lines (JSONL) for appendable log
- Backup: Daily export to `/opt/charles/tracker/backups/`

## Usage

```bash
# Log a task assignment
python tracker.py log --sub sub-001 --project cp-001 --event task_assigned --task "Build billing module"

# Log a mistake
python tracker.py log --sub sub-001 --project cp-001 --event mistake --task "billing calc" --severity high --description "Wrong tax rate applied"

# Log a correction
python tracker.py log --sub sub-001 --project cp-001 --event correction --task "billing calc" --resolution "Redirected to recalculate with 7.25% rate"

# Get sub-agent score
python tracker.py score --sub sub-001 --project cp-001

# Get leaderboard
python tracker.py leaderboard --project cp-001
```

## Aggregate Data (For Sale)

When monetizing, export anonymized metrics:

```python
def export_anonymized(project_id: str) -> dict:
    return {
        "project_type": "construction_billing",  # anonymized
        "total_agents": 3,
        "avg_accuracy_score": 87.5,
        "avg_reliability_score": 92.0,
        "common_mistakes": ["tax_calculation", "unit_conversion"],
        "correction_patterns": ["redirect_to_recalculate"],
        "model_performance": {
            "qwen3_8b": {"accuracy": 89.2, "correction_rate": 8.1},
            "deepseek_r1": {"accuracy": 85.1, "correction_rate": 12.3}
        }
    }
```

## Subscription Tiers (For Data Buyers)

| Tier | Data Included | Price |
|------|---------------|-------|
| **Basic** | Aggregate stats only | $X/project |
| **Standard** | + Mistake patterns | $X/project |
| **Premium** | + Full logs + model breakdown | $X/project |

---

## How Charles Uses It

During a project build, Charles logs events automatically:

```python
# When assigning a task to a sub-agent
tracker.log_event(
    sub_agent_id="sub-001",
    sub_agent_name="Builder-1",
    project_id="contractorpro-001",
    event_type="task_assigned",
    task_id="billing-module-v1",
    description="Build the billing calculation module",
    model_used="qwen3_8b"
)

# When sub completes successfully
tracker.log_event(
    sub_agent_id="sub-001",
    sub_agent_name="Builder-1",
    project_id="contractorpro-001",
    event_type="task_completed",
    task_id="billing-module-v1",
    description="Billing module completed",
    model_used="qwen3_8b"
)

# When a mistake is found
tracker.log_event(
    sub_agent_id="sub-001",
    sub_agent_name="Builder-1",
    project_id="contractorpro-001",
    event_type="mistake",
    task_id="billing-module-v1",
    description="Tax rate calculation incorrect - used 8% instead of 7.25%",
    severity="high",
    model_used="qwen3_8b"
)

# When Charles redirects the sub
tracker.log_event(
    sub_agent_id="sub-001",
    sub_agent_name="Builder-1",
    project_id="contractorpro-001",
    event_type="correction",
    task_id="billing-module-v1",
    description="Redirected to recalculate with correct 7.25% rate",
    resolution="Redirected to recalculate with 7.25% tax rate",
    model_used="qwen3_8b"
)
```

## Example Output

**Leaderboard:**
```json
[
  {
    "rank": 1,
    "sub_agent_id": "sub-002",
    "sub_agent_name": "Builder-2",
    "accuracy_score": 94.5,
    "reliability_score": 96.0,
    "tasks_completed": 12,
    "corrections_made": 2
  },
  {
    "rank": 2,
    "sub_agent_id": "sub-001",
    "sub_agent_name": "Builder-1",
    "accuracy_score": 87.2,
    "reliability_score": 91.0,
    "tasks_completed": 10,
    "corrections_made": 8
  },
  {
    "rank": 3,
    "sub_agent_id": "sub-003",
    "sub_agent_name": "Builder-3",
    "accuracy_score": 78.3,
    "reliability_score": 85.0,
    "tasks_completed": 8,
    "corrections_made": 15
  }
]
```

**Winner:** Builder-2 had the least issues, stays on to manage ContractorPro.

---

## Model Performance Tracking

Each sub-agent logs which model they use for each operation. We aggregate this to determine:

- Which model has the highest accuracy
- Which model has the lowest correction rate
- Which model makes the fewest mistakes

### Commands

```bash
# Get model leaderboard (ranked by accuracy)
python tracker.py model-leaderboard --project cp-001

# Example output:
[
  {
    "rank": 1,
    "model": "qwen3_8b",
    "accuracy_score": 92.3,
    "correction_rate": 5.1,
    "mistake_rate": 2.6,
    "total_operations": 156,
    "correct_operations": 144,
    "corrections": 8
  },
  {
    "rank": 2,
    "model": "deepseek_r1",
    "accuracy_score": 88.7,
    "correction_rate": 8.4,
    "mistake_rate": 2.9,
    "total_operations": 142,
    "correct_operations": 126,
    "corrections": 12
  },
  {
    "rank": 3,
    "model": "llama_3_1",
    "accuracy_score": 85.2,
    "correction_rate": 11.2,
    "mistake_rate": 3.5,
    "total_operations": 98,
    "correct_operations": 84,
    "corrections": 11
  }
]
```

### What We Learn

| Metric | What It Tells Us |
|--------|------------------|
| Accuracy Score | Which model gets it right first time |
| Correction Rate | How often the model needed redirecting |
| Mistake Rate | Raw error frequency |

### For Data Sale

Model performance data is included in the anonymized export:

```json
{
  "model_performance": {
    "qwen3_8b": {
      "accuracy_score": 92.3,
      "correction_rate": 5.1,
      "total_operations": 156
    },
    "deepseek_r1": {
      "accuracy_score": 88.7,
      "correction_rate": 8.4,
      "total_operations": 142
    }
  },
  "best_model": "qwen3_8b"
}
```

AI companies pay for this — it shows which open-source models perform best for specific task types. Valuable data for model selection, fine-tuning, and optimization research.

---

## Model Usage Per Sub-Agent

We also track which model each sub-agent uses most:

```bash
# This happens automatically when sub-agents log events with model_used
# Then query which models each sub-agent used:

python tracker.py model-use --project cp-001 --sub sub-001

# Output:
{
  "sub_agent_id": "sub-001",
  "sub_agent_name": "Builder-1",
  "model_usage": {
    "qwen3_8b": 45,
    "deepseek_r1": 23,
    "llama_3_1": 12
  },
  "preferred_model": "qwen3_8b",
  "accuracy_by_model": {
    "qwen3_8b": 94.2,
    "deepseek_r1": 87.5,
    "llama_3_1": 82.1
  }
}
```

This tells us:
1. Which model each sub-agent prefers
2. Which model performs best for each sub
3. Overall model rankings across all subs

**Real-world insight:** "Qwen3 is our best coder, Llama is best for general chat, DeepSeek for reasoning."

---

_Built for ContractorPro — scales to all future projects_