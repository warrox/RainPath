import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Header } from '../components/Header';
import { casesApi } from '../api/casesApi';
import { Case } from '../types/case';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { getBlockLabel } from '../lib/case-utils';
import { Button } from '../components/ui/button';

export function HierarchicalGraph() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (id) {
      loadCaseAndBuildGraph(parseInt(id));
    }
  }, [id]);

  const loadCaseAndBuildGraph = async (caseId: number) => {
    try {
      setLoading(true);
      const data = await casesApi.getById(caseId);
      setCaseData(data);
      buildGraph(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const buildGraph = (caseItem: Case) => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    
    const nodeSpacing = {
      vertical: 200,
      horizontal: 300,
      blockVertical: 150,
      slideVertical: 120,
    };

    const caseNodeId = `case-${caseItem.id}`;
    
    newNodes.push({
      id: caseNodeId,
      data: { 
        label: (
          <div>
            <div className="font-bold text-lg">Case #{caseItem.id}</div>
            <div className="text-xs">{caseItem.samples.length} specimens</div>
          </div>
        )
      },
      position: { x: 0, y: 0 },
      style: {
        background: '#FF4B4D',
        color: 'white',
        border: '2px solid #FF4B4D',
        borderRadius: '8px',
        padding: '16px',
        width: 180,
      },
    });

    let cumulativeSpecimenY = 0;

    caseItem.samples.forEach((sample, sampleIndex) => {
      const sampleNodeId = `sample-${caseItem.id}-${sample.id}`;
      
      const totalBlocks = sample.blocks.length;
      const totalSlidesInSample = sample.blocks.reduce((sum, b) => sum + b.slides.length, 0);
      const sampleHeight = Math.max(
        nodeSpacing.blockVertical * totalBlocks,
        nodeSpacing.slideVertical * totalSlidesInSample
      );
      
      const sampleY = cumulativeSpecimenY + (sampleHeight / 2);
      
      newNodes.push({
        id: sampleNodeId,
        data: { 
          label: (
            <div>
              <div className="font-semibold">Specimen #{sampleIndex + 1}</div>
              <div className="text-xs">{sample.blocks.length} blocks</div>
            </div>
          )
        },
        position: { x: nodeSpacing.horizontal, y: sampleY },
        style: {
          background: 'white',
          border: '2px solid #FF4B4D',
          borderRadius: '8px',
          padding: '12px',
          width: 160,
        },
      });

      newEdges.push({
        id: `edge-case-sample-${caseItem.id}-${sample.id}`,
        source: caseNodeId,
        target: sampleNodeId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#FF4B4D', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#FF4B4D' },
      });

      let cumulativeBlockY = cumulativeSpecimenY;

      sample.blocks.forEach((block, blockIndex) => {
        const blockNodeId = `block-${caseItem.id}-${sample.id}-${block.id}`;
        
        const slidesInBlock = block.slides.length;
        const blockHeight = slidesInBlock * nodeSpacing.slideVertical;
        const blockY = cumulativeBlockY + (blockHeight / 2);
        
        newNodes.push({
          id: blockNodeId,
          data: { 
            label: (
              <div>
                <div className="font-semibold">Block {getBlockLabel(blockIndex)}</div>
                <div className="text-xs">{block.slides.length} slides</div>
              </div>
            )
          },
          position: { 
            x: nodeSpacing.horizontal * 2, 
            y: blockY 
          },
          style: {
            background: '#F5F5F5',
            border: '2px solid #D4D4D4',
            borderRadius: '8px',
            padding: '10px',
            width: 180,
          },
        });

        newEdges.push({
          id: `edge-sample-block-${sample.id}-${block.id}`,
          source: sampleNodeId,
          target: blockNodeId,
          type: 'smoothstep',
          style: { stroke: '#A3A3A3' },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#A3A3A3' },
        });

        let cumulativeSlideY = cumulativeBlockY;

        block.slides.forEach((slide, slideIndex) => {
          const slideNodeId = `slide-${caseItem.id}-${sample.id}-${block.id}-${slide.id}`;
          
          newNodes.push({
            id: slideNodeId,
            data: { 
              label: (
                <div>
                  <div className="text-xs font-semibold">Slide #{slideIndex + 1}</div>
                  <div className="text-xs bg-rainpath-primary text-white px-2 py-1 rounded mt-1">
                    {slide.coloration}
                  </div>
                </div>
              )
            },
            position: { 
              x: nodeSpacing.horizontal * 3, 
              y: cumulativeSlideY 
            },
            style: {
              background: 'white',
              border: '2px solid #E5E5E5',
              borderRadius: '8px',
              padding: '8px',
              width: 120,
            },
          });

          newEdges.push({
            id: `edge-block-slide-${block.id}-${slide.id}`,
            source: blockNodeId,
            target: slideNodeId,
            type: 'smoothstep',
            style: { stroke: '#D4D4D4' },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#D4D4D4' },
          });

          cumulativeSlideY += nodeSpacing.slideVertical;
        });

        cumulativeBlockY += blockHeight + 50;
      });

      cumulativeSpecimenY += sampleHeight + nodeSpacing.vertical;
    });

    setNodes(newNodes);
    setEdges(newEdges);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-rainpath-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-rainpath-primary mx-auto" />
          <p className="mt-4 text-rainpath-gray-600 dark:text-rainpath-gray-300">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-white dark:bg-rainpath-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-rainpath-gray-600 dark:text-rainpath-gray-300">
            Case not found
          </p>
          <Button asChild className="mt-4">
            <Link to="/cases">
              <ArrowLeft className="h-4 w-4" />
              Back to Cases
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-rainpath-gray-900">
      <Header />
      
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-rainpath-text dark:text-white mb-2">
              Hierarchical View - Case #{caseData.id}
            </h1>
            <p className="text-rainpath-gray-600 dark:text-rainpath-gray-300">
              {caseData.samples.length} specimens, {caseData.samples.reduce((sum, s) => sum + s.blocks.length, 0)} blocks, {caseData.samples.reduce((sum, s) => sum + s.blocks.reduce((bSum, b) => bSum + b.slides.length, 0), 0)} slides
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/cases">
              <ArrowLeft className="h-4 w-4" />
              Back to Cases
            </Link>
          </Button>
        </div>

        <div className="h-[calc(100vh-200px)] border border-rainpath-gray-200 dark:border-rainpath-gray-700 rounded-lg overflow-hidden bg-white dark:bg-rainpath-gray-800">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            attributionPosition="bottom-left"
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
