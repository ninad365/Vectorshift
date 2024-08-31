from fastapi import FastAPI, Request
import logging
from fastapi.middleware.cors import CORSMiddleware

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
    nodes = data.get('nodes', 0)
    edges = data.get('edges', 0)

    # Log the number of nodes and edges
    logging.info(f'Number of nodes: {nodes}')
    logging.info(f'Number of edges: {edges}')

    return {'status': 'parsed', 'nodes': nodes, 'edges': edges}
