#!/usr/bin/env python3
"""
Sub-Agent Performance Tracker

Logs sub-agent accuracy, mistakes, and corrections.
Tracks performance scores for project builds.
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional

# Config
TRACKER_DIR = Path("/opt/charles/tracker")
METRICS_FILE = TRACKER_DIR / "subagent_metrics.jsonl"
BACKUP_DIR = TRACKER_DIR / "backups"

# Ensure directories exist
TRACKER_DIR.mkdir(parents=True, exist_ok=True)
BACKUP_DIR.mkdir(parents=True, exist_ok=True)


def load_metrics() -> list[dict]:
    """Load all metrics from JSONL file."""
    if not METRICS_FILE.exists():
        return []
    metrics = []
    with open(METRICS_FILE, 'r') as f:
        for line in f:
            if line.strip():
                metrics.append(json.loads(line))
    return metrics


def save_metric(metric: dict):
    """Append a metric entry to JSONL file."""
    with open(METRICS_FILE, 'a') as f:
        f.write(json.dumps(metric) + '\n')


def get_or_create_agent(project_id: str, sub_agent_id: str, sub_agent_name: str) -> dict:
    """Get existing agent metrics or create new."""
    metrics = load_metrics()
    
    for m in metrics:
        if m.get('project_id') == project_id and m.get('sub_agent_id') == sub_agent_id:
            return m
    
    # Create new
    new_agent = {
        'sub_agent_id': sub_agent_id,
        'sub_agent_name': sub_agent_name,
        'project_id': project_id,
        'tasks_assigned': 0,
        'tasks_completed': 0,
        'tasks_failed': 0,
        'total_operations': 0,
        'correct_operations': 0,
        'mistakes': 0,
        'corrections_made': 0,
        'created_at': datetime.now().isoformat(),
        'updated_at': datetime.now().isoformat(),
        'history': []
    }
    save_metric(new_agent)
    return new_agent


def calculate_scores(agent: dict) -> dict:
    """Calculate accuracy, reliability, and correction rate scores."""
    ops = agent.get('total_operations', 0)
    tasks = agent.get('tasks_assigned', 0)
    
    if ops == 0:
        agent['accuracy_score'] = 0.0
        agent['correction_rate'] = 0.0
    else:
        agent['accuracy_score'] = round((agent.get('correct_operations', 0) / ops) * 100, 2)
        agent['correction_rate'] = round((agent.get('corrections_made', 0) / ops) * 100, 2)
    
    if tasks == 0:
        agent['reliability_score'] = 0.0
    else:
        agent['reliability_score'] = round((agent.get('tasks_completed', 0) / tasks) * 100, 2)
    
    return agent


def get_model_breakdown(project_id: str) -> dict:
    """Get performance breakdown by model."""
    metrics = load_metrics()
    
    model_stats = {}
    
    for agent in metrics:
        if agent.get('project_id') != project_id:
            continue
        
        for entry in agent.get('history', []):
            model = entry.get('model_used', 'unknown')
            if model == 'unknown' or not model:
                continue
            
            if model not in model_stats:
                model_stats[model] = {
                    'total_operations': 0,
                    'correct_operations': 0,
                    'mistakes': 0,
                    'corrections': 0
                }
            
            model_stats[model]['total_operations'] += 1
            
            if entry.get('event_type') == 'task_completed':
                model_stats[model]['correct_operations'] += 1
            elif entry.get('event_type') == 'mistake':
                model_stats[model]['mistakes'] += 1
            elif entry.get('event_type') == 'correction':
                model_stats[model]['corrections'] += 1
    
    # Calculate scores for each model
    for model, stats in model_stats.items():
        total = stats['total_operations']
        if total > 0:
            stats['accuracy_score'] = round((stats['correct_operations'] / total) * 100, 2)
            stats['correction_rate'] = round((stats['corrections'] / total) * 100, 2)
            stats['mistake_rate'] = round((stats['mistakes'] / total) * 100, 2)
        else:
            stats['accuracy_score'] = 0.0
            stats['correction_rate'] = 0.0
            stats['mistake_rate'] = 0.0
    
    return model_stats


def get_model_leaderboard(project_id: str) -> list[dict]:
    """Get models ranked by accuracy score."""
    breakdown = get_model_breakdown(project_id)
    
    leaderboard = [
        {
            'rank': i + 1,
            'model': model,
            'accuracy_score': stats.get('accuracy_score', 0),
            'correction_rate': stats.get('correction_rate', 0),
            'mistake_rate': stats.get('mistake_rate', 0),
            'total_operations': stats.get('total_operations', 0),
            'correct_operations': stats.get('correct_operations', 0),
            'corrections': stats.get('corrections', 0)
        }
        for i, (model, stats) in enumerate(
            sorted(breakdown.items(), key=lambda x: x[1].get('accuracy_score', 0), reverse=True)
        )
    ]
    
    return leaderboard


def log_event(sub_agent_id: str, sub_agent_name: str, project_id: str,
              event_type: str, task_id: str = "", description: str = "",
              severity: str = "low", resolution: str = "", model_used: str = ""):
    """Log a sub-agent event and update metrics."""
    
    # Load existing metrics
    metrics = load_metrics()
    
    # Find or create agent
    agent = None
    for m in metrics:
        if m.get('project_id') == project_id and m.get('sub_agent_id') == sub_agent_id:
            agent = m
            break
    
    if not agent:
        agent = {
            'sub_agent_id': sub_agent_id,
            'sub_agent_name': sub_agent_name,
            'project_id': project_id,
            'tasks_assigned': 0,
            'tasks_completed': 0,
            'tasks_failed': 0,
            'total_operations': 0,
            'correct_operations': 0,
            'mistakes': 0,
            'corrections_made': 0,
            'created_at': datetime.now().isoformat(),
            'updated_at': datetime.now().isoformat(),
            'history': []
        }
    
    # Create log entry
    log_entry = {
        'timestamp': datetime.now().isoformat(),
        'event_type': event_type,
        'task_id': task_id,
        'description': description,
        'severity': severity,
        'resolution': resolution,
        'model_used': model_used,
        'was_corrected': event_type == 'correction'
    }
    
    # Update agent based on event type
    agent['history'].append(log_entry)
    agent['updated_at'] = datetime.now().isoformat()
    agent['total_operations'] += 1
    
    if event_type == 'task_assigned':
        agent['tasks_assigned'] += 1
    elif event_type == 'task_completed':
        agent['tasks_completed'] += 1
        agent['correct_operations'] += 1
    elif event_type == 'task_failed':
        agent['tasks_failed'] += 1
    elif event_type == 'mistake':
        agent['mistakes'] += 1
    elif event_type == 'correction':
        agent['corrections_made'] += 1
    elif event_type == 'correct_operation':
        agent['correct_operations'] += 1
    
    # Calculate scores
    agent = calculate_scores(agent)
    
    # Remove old entry and add updated
    updated_metrics = []
    for m in metrics:
        if not (m.get('project_id') == project_id and m.get('sub_agent_id') == sub_agent_id):
            updated_metrics.append(m)
    
    updated_metrics.append(agent)
    
    # Write all back
    with open(METRICS_FILE, 'w') as f:
        for m in updated_metrics:
            f.write(json.dumps(m) + '\n')
    
    print(f"✓ Logged: {event_type} for {sub_agent_name}")
    print(f"  Accuracy: {agent.get('accuracy_score', 0)}% | Reliability: {agent.get('reliability_score', 0)}% | Corrections: {agent.get('corrections_made', 0)}")


def get_score(sub_agent_id: str, project_id: str) -> dict:
    """Get score for a specific sub-agent."""
    metrics = load_metrics()
    
    for m in metrics:
        if m.get('project_id') == project_id and m.get('sub_agent_id') == sub_agent_id:
            return {
                'sub_agent_id': m['sub_agent_id'],
                'sub_agent_name': m['sub_agent_name'],
                'accuracy_score': m.get('accuracy_score', 0),
                'reliability_score': m.get('reliability_score', 0),
                'correction_rate': m.get('correction_rate', 0),
                'tasks_completed': m.get('tasks_completed', 0),
                'tasks_assigned': m.get('tasks_assigned', 0),
                'mistakes': m.get('mistakes', 0),
                'corrections_made': m.get('corrections_made', 0)
            }
    
    return {'error': 'Agent not found'}


def get_leaderboard(project_id: str) -> list[dict]:
    """Get leaderboard sorted by accuracy score."""
    metrics = load_metrics()
    
    agents = [m for m in metrics if m.get('project_id') == project_id]
    
    for agent in agents:
        agent = calculate_scores(agent)
    
    # Sort by accuracy score descending
    agents.sort(key=lambda x: x.get('accuracy_score', 0), reverse=True)
    
    return [
        {
            'rank': i + 1,
            'sub_agent_id': a['sub_agent_id'],
            'sub_agent_name': a['sub_agent_name'],
            'accuracy_score': a.get('accuracy_score', 0),
            'reliability_score': a.get('reliability_score', 0),
            'tasks_completed': a.get('tasks_completed', 0),
            'corrections_made': a.get('corrections_made', 0)
        }
        for i, a in enumerate(agents)
    ]


def export_anonymized(project_id: str) -> dict:
    """Export anonymized data for sale."""
    metrics = load_metrics()
    agents = [m for m in metrics if m.get('project_id') == project_id]
    
    if not agents:
        return {'error': 'No data for project'}
    
    total_ops = sum(a.get('total_operations', 0) for a in agents)
    total_corrections = sum(a.get('corrections_made', 0) for a in agents)
    total_mistakes = sum(a.get('mistakes', 0) for a in agents)
    
    # Collect common mistakes
    all_mistakes = []
    for a in agents:
        for entry in a.get('history', []):
            if entry.get('event_type') == 'mistake':
                all_mistakes.append(entry.get('description', ''))
    
    # Collect correction patterns
    all_corrections = []
    for a in agents:
        for entry in a.get('history', []):
            if entry.get('event_type') == 'correction':
                all_corrections.append(entry.get('resolution', ''))
    
    # Get model breakdown
    model_breakdown = get_model_breakdown(project_id)
    
    return {
        'project_type': 'construction_billing',  # anonymized
        'project_id': project_id,
        'total_agents': len(agents),
        'aggregate_stats': {
            'avg_accuracy_score': round(sum(a.get('accuracy_score', 0) for a in agents) / len(agents), 2),
            'avg_reliability_score': round(sum(a.get('reliability_score', 0) for a in agents) / len(agents), 2),
            'avg_correction_rate': round((total_corrections / total_ops * 100) if total_ops > 0 else 0, 2),
            'total_tasks_completed': sum(a.get('tasks_completed', 0) for a in agents)
        },
        'common_mistakes': list(set(all_mistakes))[:10],
        'correction_patterns': list(set(all_corrections))[:10],
        'agent_breakdown': [
            {
                'accuracy_score': a.get('accuracy_score', 0),
                'reliability_score': a.get('reliability_score', 0),
                'corrections_made': a.get('corrections_made', 0)
            }
            for a in agents
        ],
        'model_performance': {
            model: {
                'accuracy_score': stats.get('accuracy_score', 0),
                'correction_rate': stats.get('correction_rate', 0),
                'mistake_rate': stats.get('mistake_rate', 0),
                'total_operations': stats.get('total_operations', 0)
            }
            for model, stats in model_breakdown.items()
        },
        'best_model': max(model_breakdown.items(), key=lambda x: x[1].get('accuracy_score', 0))[0] if model_breakdown else None,
        'exported_at': datetime.now().isoformat()
    }


# CLI
if __name__ == '__main__':
    import argparse
    
    parser = argparse.ArgumentParser(description='Sub-Agent Performance Tracker')
    subparsers = parser.add_subparsers(dest='command')
    
    # Log command
    log_parser = subparsers.add_parser('log', help='Log an event')
    log_parser.add_argument('--sub', required=True, help='Sub-agent ID')
    log_parser.add_argument('--name', required=True, help='Sub-agent name')
    log_parser.add_argument('--project', required=True, help='Project ID')
    log_parser.add_argument('--event', required=True, help='Event type')
    log_parser.add_argument('--task', default='', help='Task ID')
    log_parser.add_argument('--desc', default='', help='Description')
    log_parser.add_argument('--severity', default='low', help='Severity')
    log_parser.add_argument('--resolution', default='', help='Resolution')
    log_parser.add_argument('--model', default='', help='Model used')
    
    # Score command
    score_parser = subparsers.add_parser('score', help='Get sub-agent score')
    score_parser.add_argument('--sub', required=True, help='Sub-agent ID')
    score_parser.add_argument('--project', required=True, help='Project ID')
    
    # Leaderboard command
    lb_parser = subparsers.add_parser('leaderboard', help='Get leaderboard')
    lb_parser.add_argument('--project', required=True, help='Project ID')
    
    # Export command
    exp_parser = subparsers.add_parser('export', help='Export anonymized data')
    exp_parser.add_argument('--project', required=True, help='Project ID')
    
    # Model leaderboard command
    model_parser = subparsers.add_parser('model-leaderboard', help='Get models ranked by performance')
    model_parser.add_argument('--project', required=True, help='Project ID')
    
    args = parser.parse_args()
    
    if args.command == 'log':
        log_event(
            sub_agent_id=args.sub,
            sub_agent_name=args.name,
            project_id=args.project,
            event_type=args.event,
            task_id=args.task,
            description=args.desc,
            severity=args.severity,
            resolution=args.resolution,
            model_used=args.model
        )
    elif args.command == 'score':
        score = get_score(args.sub, args.project)
        print(json.dumps(score, indent=2))
    elif args.command == 'leaderboard':
        leaderboard = get_leaderboard(args.project)
        print(json.dumps(leaderboard, indent=2))
    elif args.command == 'export':
        data = export_anonymized(args.project)
        print(json.dumps(data, indent=2))
    elif args.command == 'model-leaderboard':
        leaderboard = get_model_leaderboard(args.project)
        print(json.dumps(leaderboard, indent=2))
    else:
        parser.print_help()