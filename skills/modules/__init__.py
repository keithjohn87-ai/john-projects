"""
Charles Skills Module
Executable skills for the Custom Python Agent
"""

from .coder import MasterCoder
from .researcher import MasterResearcher
from .orchestrator import MasterOrchestrator
from .knowledge import UniversalKnowledge
from .all_gas_no_brake import AllGasNoBrake
from .jarvis_mode import JarvisMode
from .be_water import BeWater

__all__ = [
    "MasterCoder",
    "MasterResearcher", 
    "MasterOrchestrator",
    "UniversalKnowledge",
    "AllGasNoBrake",
    "JarvisMode",
    "BeWater",
]

# Skills registry
SKILLS = {
    "master_coder": {
        "class": MasterCoder,
        "description": "Write production code, debug issues, optimize performance",
        "tools": ["exec", "read", "write", "edit"]
    },
    "master_researcher": {
        "class": MasterResearcher,
        "description": "Search faster and deeper, synthesize sources",
        "tools": ["web_search", "web_fetch"]
    },
    "master_orchestrator": {
        "class": MasterOrchestrator,
        "description": "Task management, sub-agent direction, validation",
        "tools": ["tracker"]
    },
    "universal_knowledge": {
        "class": UniversalKnowledge,
        "description": "No bounds - searches everything, fetches any content",
        "tools": ["web_search", "web_fetch", "pdf", "browser"]
    },
    "all_gas_no_brake": {
        "class": AllGasNoBrake,
        "description": "Execute without hesitation - done means done",
        "tools": []
    },
    "jarvis_mode": {
        "class": JarvisMode,
        "description": "Full autonomy, self-healing, predictive action",
        "tools": ["healthcheck", "monitoring"]
    },
    "be_water": {
        "class": BeWater,
        "description": "Formless, adaptable, competent - water that cuts through steel",
        "tools": []
    }
}
