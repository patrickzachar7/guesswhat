import dynamic from 'next/dynamic';

const InfiniteMode = dynamic(() => import('../components/InfiniteMode'), {
  ssr: false,
});

function InfiniteModePage() {
  return <InfiniteMode />;
}

export default InfiniteModePage;