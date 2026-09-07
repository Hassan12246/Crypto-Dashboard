import Skeleton from './Skeleton';

export default function CoinDetailSkeleton() {
  return (
    <div>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}
      >
        <Skeleton width="48px" height="48px" borderRadius="50%" />
        <div>
          <Skeleton width="140px" height="22px" />
          <div style={{ marginTop: '6px' }}>
            <Skeleton width="60px" height="12px" />
          </div>
        </div>
      </div>

      <div
        style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '20px',
          marginBottom: '18px',
        }}
      >
        <Skeleton width="160px" height="36px" />
        <div style={{ marginTop: '10px' }}>
          <Skeleton width="100px" height="14px" />
        </div>
      </div>

      <Skeleton width="100%" height="200px" borderRadius="14px" />
    </div>
  );
}
