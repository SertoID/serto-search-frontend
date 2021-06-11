import { useHistory } from "react-router-dom";
import { routes } from "../../constants";
import { TabbedSearchBox } from "serto-ui";

export const Search: React.FunctionComponent = () => {
  const history = useHistory();

  return (
    <TabbedSearchBox
      onSearch={(searchVal) => history.push(routes.SEARCH + "?filter=" + searchVal)}
      placeholderText="Search an organization or DID"
    />
  );
};
