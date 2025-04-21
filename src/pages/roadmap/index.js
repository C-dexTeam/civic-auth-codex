import { useCallback, useMemo } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Handle,
    Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DefaultNode from '@/components/flowchart/DefaultNode';
import AsteroidNode from '@/components/flowchart/nodes/Asteroid';
import PlanetNode from '@/components/flowchart/nodes/Planet';
import SatelliteNode from '@/components/flowchart/nodes/Satellite';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, type: 'planet' },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' }, type: 'asteroid' },
    { id: '3', position: { x: 100, y: 200 }, data: { label: '3' }, type: 'satellite' },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
];

const RoadmapFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const nodeTypes = useMemo(() => ({
        defaultNode: DefaultNode,
        asteroid: AsteroidNode,
        planet: PlanetNode,
        satellite: SatelliteNode,
    }), []);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div style={{ width: '100%', height: 'calc(100vh - 96px)' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                {/* <Controls /> */}
                {/* <MiniMap /> */}
                {/* <Background variant="cross" gap={12} size={1} /> */}
                <Handle type="target" position={Position.Left} />
                <Handle type="source" position={Position.Right} />

            </ReactFlow>


        </div>
    );
}

RoadmapFlow.acl = {
    action: 'read',
    permission: 'roadmap'
}
export default RoadmapFlow