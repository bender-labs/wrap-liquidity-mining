import icon from './xtz.svg';

export default function TezosIcon() {
  return (
    <img
      style={{ width: 50, height: 50, marginRight: 5, verticalAlign: 'middle' }}
      src={icon}
      alt={''}
      onError={(e: any) => {
        e.target.onerror = null;
        e.target.src = `${process.env.PUBLIC_URL}/icons/default.png`;
      }}
    />
  );
}
