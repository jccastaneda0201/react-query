import { useFetchTask } from './reactQueryCustomHooks';
import SingleItem from './SingleItem';

const Items = () => {
  const { isPending, data, isError } = useFetchTask();

  if (isPending) {
    return <p style={{ marginTop: '2rem' }}>Loading...</p>;
  }

  if (isError) {
    return <p style={{ marginTop: '2rem' }}>{error.response.data}</p>;
  }

  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
