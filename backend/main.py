from fastapi import FastAPI, Request
import logging
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, deque

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])

    # Log the full nodes and edges data
    logging.info(f'Nodes: {nodes}')
    logging.info(f'Edges: {edges}')

    if is_dag(nodes, edges):
        status = 'Pipeline forms a valid DAG.'
    else:
        status = 'Pipeline does not form a DAG (contains cycles).'

    return {'status': status, 'nodes': nodes, 'edges': edges}

def is_dag(nodes, edges):
    graph = defaultdict(list)
    in_degree = {node['id']: 0 for node in nodes}

    # Build the graph and calculate in-degrees of nodes
    for edge in edges:
        source = edge['source']
        target = edge['target']
        graph[source].append(target)
        in_degree[target] += 1

    # Queue for nodes with no incoming edges
    queue = deque([node for node in in_degree if in_degree[node] == 0])

    visited_count = 0

    while queue:
        current_node = queue.popleft()
        visited_count += 1

        for neighbor in graph[current_node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If visited all nodes, it's a DAG
    return visited_count == len(nodes)