from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    try:
        data = json.loads(pipeline)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format")
    
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    is_dag = check_if_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes, 
        'num_edges': num_edges, 
        'is_dag': is_dag
    }

def check_if_dag(nodes, edges):
    from collections import defaultdict, deque

    valid_node_ids = {node['id'] for node in nodes}
    
    adj_list = defaultdict(list)
    in_degree = {node['id']: 0 for node in nodes}
    
    for edge in edges:
        source = edge['source']
        target = edge['target']
        
        if source not in valid_node_ids or target not in valid_node_ids:
            continue
            
        adj_list[source].append(target)
        in_degree[target] += 1

    zero_in_degree_queue = deque([node_id for node_id, degree in in_degree.items() if degree == 0])
    
    processed_count = 0
    
    while zero_in_degree_queue:
        current_node = zero_in_degree_queue.popleft()
        processed_count += 1
        
        for neighbor in adj_list[current_node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                zero_in_degree_queue.append(neighbor)
                
    return processed_count == len(in_degree)