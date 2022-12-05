import { useAppSelector } from "../../redux/hooks";
import { AllTagsItem } from "./AllTagsItem/AllTagsItem";
import classes from "./AllTags.module.scss";
import { useEffect } from 'react';

export const AllTags: React.FC = () => {
  const allTags = useAppSelector((state) => state.data.allTags);

  useEffect(() => {
    localStorage.setItem('allTags', JSON.stringify(allTags))
  }, [allTags])

  return (
    <div className={classes.container}>
      {allTags.length > 0 ? (
        <>
          <h2>All tags</h2>
          <div className={classes.allTags}>
            {allTags.map((item, index) => (
              <AllTagsItem item={item} key={item + index} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};
