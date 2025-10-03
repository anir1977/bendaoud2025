
import EditProductClient from './EditProductClient'

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' }
  ];
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  return <EditProductClient productId={params.id} />
}
